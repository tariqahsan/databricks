package mil.disa.oe.dto;
import java.math.BigDecimal;
public record DegradedApp(
    String applicationName, String severity,
    BigDecimal experienceScore, BigDecimal degradationPct,
    String primaryCause, Integer affectedUsers
) {}
