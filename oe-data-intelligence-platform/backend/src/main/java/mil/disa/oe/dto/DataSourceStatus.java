package mil.disa.oe.dto;
import java.math.BigDecimal;
import java.time.LocalDateTime;
public record DataSourceStatus(
    String sourceName, String sourceType, String status,
    LocalDateTime lastIngestionAt, LocalDateTime nextScheduledAt,
    Long recordsLastBatch, Long totalRecordsToday,
    BigDecimal dataQualityScore, Long latencyMs,
    String bronzeTable, String silverTable, String errorMessage
) {}
