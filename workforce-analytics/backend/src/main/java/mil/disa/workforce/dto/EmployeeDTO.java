package mil.disa.workforce.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record EmployeeDTO(
    String        employeeId,
    @NotBlank(message = "First name required")
    String        firstName,
    @NotBlank(message = "Last name required")
    String        lastName,
    String        fullName,
    @NotBlank(message = "Department required")
    String        department,
    @NotBlank(message = "Job title required")
    String        jobTitle,
    @NotNull @DecimalMin("0.00")
    BigDecimal    salary,
    String        salaryBand,
    @NotNull(message = "Hire date required")
    LocalDate     hireDate,
    @NotBlank(message = "Location required")
    String        location,
    String        status,
    LocalDateTime processedAt
) {
    public String resolvedFullName() {
        return fullName != null ? fullName : firstName + " " + lastName;
    }
}
