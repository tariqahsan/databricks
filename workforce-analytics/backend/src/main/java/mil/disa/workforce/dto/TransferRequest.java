package mil.disa.workforce.dto;

import jakarta.validation.constraints.NotBlank;

public record TransferRequest(
    @NotBlank String employeeId,
    @NotBlank String fromDepartment,
    @NotBlank String toDepartment,
    String reason
) {}
