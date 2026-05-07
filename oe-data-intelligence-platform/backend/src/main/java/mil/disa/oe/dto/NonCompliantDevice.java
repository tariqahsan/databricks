package mil.disa.oe.dto;
import java.time.LocalDateTime;
public record NonCompliantDevice(
    String deviceId, String deviceName, String assignedUser,
    String nonComplianceReason, LocalDateTime lastCheckIn, String severity
) {}
