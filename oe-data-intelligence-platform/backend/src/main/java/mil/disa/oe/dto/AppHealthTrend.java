package mil.disa.oe.dto;
import java.math.BigDecimal;
public record AppHealthTrend(
    String applicationName, String timestamp,
    BigDecimal experienceScore, BigDecimal responseTimeMs, Integer errorCount
) {}
