package mil.disa.oe.repository;

import mil.disa.oe.config.TableNames;
import mil.disa.oe.dto.DataSourceStatus;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

/** Pipeline ingestion status — NETCOOL · DXNETOPS · ElastiFlow · Netscout App · Netscout Throughput · DataNX */
@Repository
public class DataSourceStatusRepository {

    private final NamedParameterJdbcTemplate jdbc;
    private final TableNames tables;

    public DataSourceStatusRepository(NamedParameterJdbcTemplate jdbc, TableNames tables) {
        this.jdbc   = jdbc;
        this.tables = tables;
    }

    // ── Hive JDBC compatibility ───────────────────────────────────────────

    /** BigDecimal: Hive returns DOUBLE as java.lang.Double, not BigDecimal. */
    private static BigDecimal bd(ResultSet rs, String col) throws SQLException {
        double v = rs.getDouble(col);
        return rs.wasNull() ? null : BigDecimal.valueOf(v);
    }

    /**
     * Timestamp: Hive JDBC 3.1.x stores TIMESTAMP columns as strings internally.
     * Calling rs.getTimestamp() throws "Illegal conversion" because Hive cannot
     * convert its internal string representation to java.sql.Timestamp directly.
     *
     * Fix: read as String, then parse to LocalDateTime.
     * Handles both "yyyy-MM-dd HH:mm:ss" and "yyyy-MM-ddTHH:mm:ss" formats.
     * Returns null for null/empty values.
     *
     * Databricks JDBC returns proper Timestamp objects, so this helper
     * works correctly on both drivers.
     */
    private static LocalDateTime ts(ResultSet rs, String col) throws SQLException {
        String s = rs.getString(col);
        if (s == null || s.isBlank()) return null;
        try {
            // Spark/Hive returns "yyyy-MM-dd HH:mm:ss[.nnnnnnnnn]"
            // LocalDateTime.parse requires ISO format with 'T'
            return LocalDateTime.parse(s.replace(" ", "T")
                                        .replaceAll("\\.\\d+$", "")); // strip nanos
        } catch (Exception e) {
            return null;
        }
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
            FROM %s
            WHERE snapshot_date = current_date()
            ORDER BY source_name
            """.formatted(tables.dataSourceIngestionStatus());

        return jdbc.query(sql, Collections.emptyMap(), (rs, i) ->
            new DataSourceStatus(
                rs.getString("source_name"),
                rs.getString("source_type"),
                rs.getString("status"),
                ts(rs, "last_ingestion_at"),
                ts(rs, "next_scheduled_at"),
                rs.getLong("records_last_batch"),
                rs.getLong("total_records_today"),
                bd(rs, "data_quality_score"),
                rs.getLong("latency_ms"),
                rs.getString("bronze_table"),
                rs.getString("silver_table"),
                rs.getString("error_message")));
    }
}