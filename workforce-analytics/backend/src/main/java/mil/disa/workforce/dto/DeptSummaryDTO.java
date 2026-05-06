package mil.disa.workforce.dto;

import java.math.BigDecimal;

public record DeptSummaryDTO(
    String     department,
    String     deptName,
    String     division,
    Integer    headcount,
    BigDecimal avgSalary,
    BigDecimal totalPayroll,
    BigDecimal maxSalary,
    BigDecimal minSalary,
    BigDecimal medianSalary,
    Double     avgSalaryPctOfMax
) {}
