package mil.disa.oe.dto;
import java.math.BigDecimal;
public record VersionDistribution(
    String name, String version, Integer count,
    BigDecimal percentage, Boolean isSupported
) {}
