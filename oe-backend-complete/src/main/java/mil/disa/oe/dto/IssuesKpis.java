package mil.disa.oe.dto;
import java.math.BigDecimal;
import java.util.List;
public record IssuesKpis(
    Integer openP1Issues, Integer openP2Issues,
    Integer openP3Issues, Integer openP4Issues,
    Integer totalOpenIssues, Integer resolvedToday,
    BigDecimal avgMttrHours, BigDecimal slaBreachRate,
    List<IssuesByCategory> byCategory,
    List<TrendingIssue> trending,
    List<TopIssueSummary> criticalOpen
) {}
