package mil.disa.oe.dto;
import java.math.BigDecimal;
public record DnsMetrics(
    String server, Long totalQueries, Long failedQueries,
    BigDecimal failureRate, BigDecimal avgResponseMs,
    Long nxdomainCount, Long timeoutCount
) {}
