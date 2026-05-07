package mil.disa.oe.dto;
import java.math.BigDecimal;
public record NetworkTrend(
    String timestamp, BigDecimal packetLossRate,
    BigDecimal avgLatencyMs, BigDecimal bandwidthUtilization
) {}
