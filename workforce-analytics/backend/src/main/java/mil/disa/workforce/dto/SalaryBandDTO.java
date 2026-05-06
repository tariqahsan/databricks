package mil.disa.workforce.dto;

import java.math.BigDecimal;

public record SalaryBandDTO(
    String     salaryBand,
    Integer    employeeCount,
    BigDecimal avgSalary,
    BigDecimal totalPayroll
) {}
