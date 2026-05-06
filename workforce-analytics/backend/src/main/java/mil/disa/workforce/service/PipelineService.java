package mil.disa.workforce.service;

import mil.disa.workforce.dto.PipelineRunDTO;
import mil.disa.workforce.event.EmployeeUpdatedEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;
import org.springframework.web.client.RestClient;

import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.Map;

@Service
public class PipelineService {

    private static final Logger log =
        LoggerFactory.getLogger(PipelineService.class);

    private final RestClient databricksRestClient;

    @Value("${databricks.jobs.etl-pipeline-id}")
    private Long pipelineJobId;

    public PipelineService(RestClient databricksRestClient) {
        this.databricksRestClient = databricksRestClient;
    }

    /**
     * Trigger full Bronze → Silver → Gold pipeline.
     */
    public PipelineRunDTO triggerPipeline(String reason) {
        log.info("Triggering pipeline: reason={}", reason);

        // Use Map<String, Object> — NOT Map<?, ?> — so we can insert values
        Map<String, Object> body = Map.of(
            "job_id",          pipelineJobId,
            "notebook_params", Map.of("trigger_reason", reason)
        );

        @SuppressWarnings("unchecked")
        Map<String, Object> response = databricksRestClient.post()
            .uri("/api/2.1/jobs/run-now")
            .body(body)
            .retrieve()
            .body(Map.class);

        Long runId = ((Number) response.get("run_id")).longValue();
        log.info("Pipeline triggered: runId={}", runId);

        return new PipelineRunDTO(runId, "RUNNING", null, null,
            "Pipeline triggered: " + reason);
    }

    /**
     * Poll Databricks job status — Angular polls this for live progress.
     */
    public PipelineRunDTO getStatus(Long runId) {
        @SuppressWarnings("unchecked")
        Map<String, Object> response = databricksRestClient.get()
            .uri("/api/2.1/jobs/runs/get?run_id={id}", runId)
            .retrieve()
            .body(Map.class);

        // Use Map<String, Object> — avoids wildcard capture errors
        @SuppressWarnings("unchecked")
        Map<String, Object> state =
            (Map<String, Object>) response.get("state");

        String lifecycle   = (String) state.get("life_cycle_state");
        String resultState = (String) state.getOrDefault("result_state", "");
        String startTime   = String.valueOf(response.get("start_time"));
        String endTime     = String.valueOf(
            response.getOrDefault("end_time", ""));
        String stateMsg    = (String) state.getOrDefault("state_message", "");

        String status = switch (lifecycle) {
            case "PENDING"            -> "PENDING";
            case "RUNNING", "BLOCKED" -> "RUNNING";
            case "TERMINATED"         ->
                "SUCCESS".equals(resultState) ? "SUCCEEDED" : "FAILED";
            case "SKIPPED"            -> "SKIPPED";
            default                   -> "UNKNOWN";
        };

        return new PipelineRunDTO(runId, status, startTime, endTime, stateMsg);
    }

    /**
     * Blocking poll — waits for completion up to timeout duration.
     */
    public PipelineRunDTO waitForCompletion(Long runId, Duration timeout) {
        Instant deadline = Instant.now().plus(timeout);

        while (Instant.now().isBefore(deadline)) {
            PipelineRunDTO current = getStatus(runId);
            if (List.of("SUCCEEDED", "FAILED", "SKIPPED")
                    .contains(current.status())) {
                return current;
            }
            try {
                Thread.sleep(5_000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                return new PipelineRunDTO(runId, "UNKNOWN",
                    null, null, "Polling interrupted");
            }
        }

        return new PipelineRunDTO(runId, "TIMEOUT", null, null,
            "Did not complete within " + timeout);
    }

    /**
     * Fires AFTER the JDBC transaction commits — safe pipeline trigger.
     * @Async ensures it doesn't block the HTTP response thread.
     */
    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void onEmployeeUpdated(EmployeeUpdatedEvent event) {
        log.info("Post-commit event [{}] for employee {} → refreshing Gold layer",
            event.action(), event.employeeId());
        try {
            triggerPipeline("post-commit-"
                + event.action().toLowerCase()
                + "-" + event.employeeId());
        } catch (Exception ex) {
            // Pipeline failure must NOT fail the original request
            log.error("Pipeline trigger failed post-commit: {}",
                ex.getMessage());
        }
    }
}
