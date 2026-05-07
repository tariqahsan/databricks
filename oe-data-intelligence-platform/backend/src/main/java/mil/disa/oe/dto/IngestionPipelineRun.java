package mil.disa.oe.dto;
import java.time.LocalDateTime;
public record IngestionPipelineRun(
    Long runId, String pipelineName, String status,
    LocalDateTime startedAt, LocalDateTime completedAt,
    Long recordsProcessed, Long recordsFailed, String triggeredBy
) {}
