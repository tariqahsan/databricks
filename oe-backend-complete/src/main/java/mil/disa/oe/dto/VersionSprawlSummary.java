package mil.disa.oe.dto;
import java.math.BigDecimal;
public record VersionSprawlSummary(
    String softwareName, String softwareType, String version,
    Integer deviceCount, BigDecimal percentageOfFleet,
    Boolean isLatest, Boolean isSupported, Boolean hasVulnerabilities,
    Integer daysOld, String updateUrgency
) {}
