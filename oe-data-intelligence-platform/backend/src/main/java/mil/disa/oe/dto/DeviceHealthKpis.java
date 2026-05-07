package mil.disa.oe.dto;
import java.math.BigDecimal;
import java.util.List;
public record DeviceHealthKpis(
    Integer totalDevices, Integer compliantDevices,
    Integer nonCompliantDevices, Integer unknownDevices,
    BigDecimal complianceRate, BigDecimal avgHealthScore,
    Integer devicesNotCheckedIn, Integer encryptedDevices,
    List<ComplianceByType> complianceByType,
    List<OsDistribution> osDistribution
) {}
