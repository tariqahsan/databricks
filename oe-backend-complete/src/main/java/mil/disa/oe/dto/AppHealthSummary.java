package mil.disa.oe.dto;
import java.math.BigDecimal;
import java.time.LocalDateTime;
public record AppHealthSummary(
    String applicationName, String appCategory,
    BigDecimal experienceScore, BigDecimal avgResponseTimeMs,
    BigDecimal p95ResponseTimeMs, BigDecimal p99ResponseTimeMs,
    BigDecimal crashRate, BigDecimal errorRate,
    Integer activeUserCount, Integer totalSessionCount,
    String healthStatus, String trend, LocalDateTime lastUpdated
) {}
