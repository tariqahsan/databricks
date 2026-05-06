package mil.disa.workforce.dto;

import java.util.List;

public record BatchUploadResult(
    int          totalSubmitted,
    int          inserted,
    int          updated,
    int          rejected,
    String       batchReference,
    List<String> errors
) {}
