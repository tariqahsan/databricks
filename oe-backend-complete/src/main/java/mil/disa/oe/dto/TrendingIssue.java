package mil.disa.oe.dto;
public record TrendingIssue(
    String pattern, Integer occurrences,
    String affectedComponent, String trend
) {}
