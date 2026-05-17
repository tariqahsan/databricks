package mil.disa.oe.dto;
import java.math.BigDecimal;
import java.util.List;
public record AppHealthKpis(
    Integer totalApplications, Integer healthyApps,
    Integer degradedApps, Integer criticalApps,
    BigDecimal avgExperienceScore, BigDecimal avgResponseTimeMs,
    Integer totalActiveUsers, List<DegradedApp> topDegradedApps
) {}
