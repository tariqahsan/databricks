package mil.disa.oe.dto;
import java.math.BigDecimal;
import java.time.LocalDateTime;
public record DeviceHealthSummary(
    String deviceId, String deviceName, String deviceType,
    String osName, String osVersion, String complianceState,
    BigDecimal healthScore, String enrollmentStatus,
    LocalDateTime lastCheckIn, String assignedUser, String location,
    Boolean encryptionEnabled, Boolean firewallEnabled,
    Boolean antivirusEnabled, String managementAgent
) {}
