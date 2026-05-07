package mil.disa.oe.dto;
import java.math.BigDecimal;
public record IssuesByCategory(
    String category, Integer openCount,
    Integer resolvedCount, BigDecimal avgMttrHours
) {}
