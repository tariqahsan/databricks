package mil.disa.oe.dto;
import java.util.List;
public record PlatformSummary(
    AppHealthKpis appHealth,
    DeviceHealthKpis deviceHealth,
    NetworkKpis networkPerformance,
    IssuesKpis topIssues,
    VersionSprawlKpis versionSprawl,
    List<DataSourceStatus> dataSourceStatuses,
    String asOfTimestamp
) {}
