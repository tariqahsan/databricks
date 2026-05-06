package mil.disa.workforce.dto;

public record PipelineTriggerRequest(
    String  reason,
    boolean forceRefresh
) {}
