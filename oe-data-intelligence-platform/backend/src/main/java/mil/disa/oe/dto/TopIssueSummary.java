package mil.disa.oe.dto;
import java.time.LocalDateTime;
public record TopIssueSummary(
    String issueId, String title, String category, String severity,
    String status, String source, Integer affectedDevices, Integer affectedUsers,
    LocalDateTime openedAt, LocalDateTime lastUpdatedAt, LocalDateTime resolvedAt,
    Long mttrMinutes, String assignedTeam, String rootCause,
    Boolean isRecurring, Integer occurrenceCount
) {}
