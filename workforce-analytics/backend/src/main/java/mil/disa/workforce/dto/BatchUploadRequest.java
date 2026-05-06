package mil.disa.workforce.dto;

import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record BatchUploadRequest(
    @NotEmpty List<EmployeeDTO> employees,
    String uploadedBy,
    String batchReference
) {}
