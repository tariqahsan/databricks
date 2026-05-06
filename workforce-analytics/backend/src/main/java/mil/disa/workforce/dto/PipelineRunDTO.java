package mil.disa.workforce.dto;

public record PipelineRunDTO(
    Long   runId,
    String status,
    String startTime,
    String endTime,
    String message
) {}
