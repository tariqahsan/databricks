package mil.disa.oe.dto;
import java.math.BigDecimal;
import java.util.List;
public record NetworkKpis(
    Integer totalSegments, Integer healthySegments,
    Integer degradedSegments, Integer criticalSegments,
    BigDecimal avgPacketLoss, BigDecimal avgLatencyMs,
    BigDecimal avgAvailability, Long totalAnomalies,
    List<PacketLossRootCause> topRootCauses,
    List<NetworkTrend> latencyTrend
) {}
