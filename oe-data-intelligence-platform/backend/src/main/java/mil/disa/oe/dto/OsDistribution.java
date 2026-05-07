package mil.disa.oe.dto;
public record OsDistribution(
    String osName, String osVersion, Integer deviceCount,
    Boolean isSupported, Boolean isLatest
) {}
