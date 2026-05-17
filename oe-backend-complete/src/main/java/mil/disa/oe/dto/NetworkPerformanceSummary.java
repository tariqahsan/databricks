package mil.disa.oe.dto;
import java.math.BigDecimal;
import java.time.LocalDateTime;
public record NetworkPerformanceSummary(
    String segmentId, String segmentName, String segmentType, String location,
    BigDecimal packetLossRate, BigDecimal avgLatencyMs, BigDecimal p95LatencyMs,
    BigDecimal jitterMs, BigDecimal bandwidthUtilization, BigDecimal availabilityRate,
    Long totalFlows, Long anomalyCount, String healthStatus, LocalDateTime lastUpdated
) {}
