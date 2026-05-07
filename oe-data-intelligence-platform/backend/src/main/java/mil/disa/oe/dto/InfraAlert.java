package mil.disa.oe.dto;
import java.time.LocalDateTime;
public record InfraAlert(
    String alertId, String deviceName, String alertMessage,
    String severity, String component, LocalDateTime triggeredAt,
    Boolean acknowledged
) {}
