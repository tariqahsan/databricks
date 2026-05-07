package mil.disa.oe.dto;
import java.math.BigDecimal;
public record PacketLossRootCause(
    String segmentName, String rootCause,
    BigDecimal packetLossRate, BigDecimal confidence,
    Integer affectedFlows, String recommendation, String severity
) {}
