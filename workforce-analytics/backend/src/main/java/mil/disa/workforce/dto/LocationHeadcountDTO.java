package mil.disa.workforce.dto;

import java.math.BigDecimal;

public record LocationHeadcountDTO(
    String     location,
    Integer    headcount,
    BigDecimal avgSalary,
    Integer    deptCount
) {}
