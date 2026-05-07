package mil.disa.oe.service;

import mil.disa.oe.dto.DataSourceStatus;
import mil.disa.oe.dto.IngestionPipelineRun;
import mil.disa.oe.repository.DataSourceStatusRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClient;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class DataSourceStatusService {

    private static final Logger log =
        LoggerFactory.getLogger(DataSourceStatusService.class);

    private final DataSourceStatusRepository repo;
    private final RestClient databricksRestClient;

    @Value("${databricks.jobs.ingestion-pipeline-id}")
    private Long pipelineJobId;

    public DataSourceStatusService(DataSourceStatusRepository repo,
                                    RestClient databricksRestClient) {
        this.repo = repo;
        this.databricksRestClient = databricksRestClient;
    }

    @Cacheable("ingestionStatus")
    @Transactional(readOnly = true)
    public List<DataSourceStatus> getAllStatuses() {
        return repo.getAllStatuses();
    }

    public IngestionPipelineRun triggerIngestion(String source, String reason) {
        log.info("Triggering ingestion: source={} reason={}", source, reason);

        @SuppressWarnings("unchecked")
        Map<String, Object> response = databricksRestClient.post()
            .uri("/api/2.1/jobs/run-now")
            .body(Map.of(
                "job_id", pipelineJobId,
                "notebook_params", Map.of(
                    "source",        source != null ? source : "ALL",
                    "reason",        reason != null ? reason : "manual",
                    "triggered_at",  LocalDateTime.now().toString()
                )
            ))
            .retrieve()
            .body(Map.class);

        Long runId = ((Number) response.get("run_id")).longValue();
        log.info("Ingestion triggered: runId={}", runId);

        return new IngestionPipelineRun(
            runId, "OE-Data-Ingestion", "RUNNING",
            LocalDateTime.now(), null, 0L, 0L,
            reason != null ? reason : "manual-trigger"
        );
    }
}
