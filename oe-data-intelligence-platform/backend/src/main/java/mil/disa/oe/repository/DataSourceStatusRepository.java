package mil.disa.oe.repository;

import mil.disa.oe.dto.DataSourceStatus;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;

@Repository
public class DataSourceStatusRepository {

    private final NamedParameterJdbcTemplate jdbc;

    public DataSourceStatusRepository(NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @Retryable(retryFor = Exception.class, maxAttempts = 3,
               backoff = @Backoff(delay = 2000, multiplier = 2.0))
    public List<DataSourceStatus> getAllStatuses() {
        String sql = """
            SELECT source_name, source_type, status,
                   last_ingestion_at, next_scheduled_at,
                   records_last_batch, total_records_today,
                   data_quality_score, latency_ms,
                   bronze_table, silver_table, error_message
            FROM gold.data_source_ingestion_status
            WHERE snapshot_date = current_date()
            ORDER BY source_name
            """;

        return jdbc.query(sql, Collections.emptyMap(), (rs, i) ->
            new DataSourceStatus(
                rs.getString("source_name"),
                rs.getString("source_type"),
                rs.getString("status"),
                rs.getTimestamp("last_ingestion_at") != null
                    ? rs.getTimestamp("last_ingestion_at").toLocalDateTime() : null,
                rs.getTimestamp("next_scheduled_at") != null
                    ? rs.getTimestamp("next_scheduled_at").toLocalDateTime() : null,
                rs.getLong("records_last_batch"),
                rs.getLong("total_records_today"),
                rs.getBigDecimal("data_quality_score"),
                rs.getLong("latency_ms"),
                rs.getString("bronze_table"),
                rs.getString("silver_table"),
                rs.getString("error_message")
            )
        );
    }
}
