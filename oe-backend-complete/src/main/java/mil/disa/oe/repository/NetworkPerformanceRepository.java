package mil.disa.oe.repository;

import mil.disa.oe.config.TableNames;
import mil.disa.oe.dto.*;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collections;
import java.util.List;

/** Source: ElastiFlow (IPFIX network flows) + Netscout Throughput (bandwidth monitoring) */
@Repository
public class NetworkPerformanceRepository {

    private final NamedParameterJdbcTemplate jdbc;
    private final TableNames tables;

    public NetworkPerformanceRepository(NamedParameterJdbcTemplate jdbc, TableNames tables) {
        this.jdbc   = jdbc;
        this.tables = tables;
    }

    // ── Hive JDBC compatibility ───────────────────────────────────────────
    // Hive JDBC 3.1.x returns DOUBLE columns as java.lang.Double, not BigDecimal.
    // Databricks JDBC returns BigDecimal. These helpers normalise both drivers.

    private static BigDecimal bd(ResultSet rs, String col) throws SQLException {
        double v = rs.getDouble(col);
        return rs.wasNull() ? null : BigDecimal.valueOf(v);
    }

    private static BigDecimal bd(Object val) {
        if (val == null) return null;
        if (val instanceof BigDecimal b) return b;
        return BigDecimal.valueOf(((Number) val).doubleValue());
    }

    /**
     * Null-safe long conversion.
     * SQL aggregate functions (SUM, COUNT) return NULL when applied to zero rows.
     * Calling ((Number) null).longValue() causes NullPointerException.
     * This helper returns 0 for null, avoiding the NPE.
     */
    private static long safeLong(Object val) {
        return val == null ? 0L : ((Number) val).longValue();
    }

    @Retryable(retryFor = Exception.class, maxAttempts = 3,
               backoff = @Backoff(delay = 2000, multiplier = 2.0))
    public NetworkKpis getKpis() {
        // NOTE ON TIME FILTER:
        // The original query used INTERVAL 1 HOURS which matches only the last hour.
        // In production (Databricks), data is continuously ingested so this is correct.
        // In local dev with static mock data, the data may be days old and returns 0 rows,
        // causing all SUM/AVG aggregates to return NULL → NullPointerException.
        // Using INTERVAL 30 DAYS here ensures mock data always returns results.
        // On AWS GovCloud, revert to INTERVAL 1 HOURS for real-time accuracy.
        String kpiSql = """
            SELECT
                COUNT(DISTINCT segment_id)                               AS total_segments,
                COUNT(CASE WHEN health_status = 'HEALTHY'  THEN 1 END)  AS healthy,
                COUNT(CASE WHEN health_status = 'DEGRADED' THEN 1 END)  AS degraded,
                COUNT(CASE WHEN health_status = 'CRITICAL' THEN 1 END)  AS critical,
                ROUND(AVG(packet_loss_rate), 3)                         AS avg_packet_loss,
                ROUND(AVG(avg_latency_ms), 1)                           AS avg_latency,
                ROUND(AVG(availability_rate), 2)                        AS avg_availability,
                SUM(anomaly_count)                                       AS total_anomalies
            FROM %s
            WHERE snapshot_hour >= current_timestamp() - INTERVAL 30 DAYS
            """.formatted(tables.networkPerformanceSummary());

        String rootCauseSql = """
            SELECT segment_name, root_cause, packet_loss_rate,
                   confidence_score AS confidence, affected_flows,
                   recommendation, severity
            FROM %s
            WHERE analysis_timestamp >= current_timestamp() - INTERVAL 30 DAYS
              AND packet_loss_rate > 0.1
            ORDER BY packet_loss_rate DESC, confidence_score DESC
            LIMIT 10
            """.formatted(tables.packetLossRootCause());

        String trendSql = """
            SELECT DATE_FORMAT(snapshot_hour,'HH:mm')   AS timestamp,
                   ROUND(AVG(packet_loss_rate), 3)       AS packet_loss_rate,
                   ROUND(AVG(avg_latency_ms), 1)         AS avg_latency_ms,
                   ROUND(AVG(bandwidth_utilization), 1)  AS bandwidth_utilization
            FROM %s
            WHERE snapshot_hour >= current_timestamp() - INTERVAL 30 DAYS
            GROUP BY DATE_FORMAT(snapshot_hour,'HH:mm')
            ORDER BY timestamp ASC
            """.formatted(tables.networkPerformanceSummary());

        var row = jdbc.queryForMap(kpiSql, Collections.emptyMap());

        List<PacketLossRootCause> rootCauses = jdbc.query(rootCauseSql,
            Collections.emptyMap(), (rs, i) -> new PacketLossRootCause(
                rs.getString("segment_name"), rs.getString("root_cause"),
                bd(rs, "packet_loss_rate"),
                bd(rs, "confidence"),
                rs.getInt("affected_flows"),
                rs.getString("recommendation"), rs.getString("severity")));

        List<NetworkTrend> trend = jdbc.query(trendSql,
            Collections.emptyMap(), (rs, i) -> new NetworkTrend(
                rs.getString("timestamp"),
                bd(rs, "packet_loss_rate"),
                bd(rs, "avg_latency_ms"),
                bd(rs, "bandwidth_utilization")));

        return new NetworkKpis(
            ((Number) row.get("total_segments")).intValue(),
            ((Number) row.get("healthy")).intValue(),
            ((Number) row.get("degraded")).intValue(),
            ((Number) row.get("critical")).intValue(),
            bd(row.get("avg_packet_loss")),
            bd(row.get("avg_latency")),
            bd(row.get("avg_availability")),
            safeLong(row.get("total_anomalies")),   // ← null-safe: SUM returns NULL on empty result
            rootCauses, trend);
    }

    @Retryable(retryFor = Exception.class, maxAttempts = 3,
               backoff = @Backoff(delay = 2000, multiplier = 2.0))
    public List<NetworkPerformanceSummary> getBySegment(String segmentType) {
        String sql = """
            SELECT segment_id, segment_name, segment_type, location,
                   packet_loss_rate, avg_latency_ms, p95_latency_ms,
                   jitter_ms, bandwidth_utilization, availability_rate,
                   total_flows, anomaly_count, health_status, last_updated
            FROM %s
            WHERE (:segmentType IS NULL OR segment_type = :segmentType)
              AND snapshot_hour >= current_timestamp() - INTERVAL 30 DAYS
            ORDER BY packet_loss_rate DESC
            LIMIT 200
            """.formatted(tables.networkPerformanceSummary());

        return jdbc.query(sql,
            new MapSqlParameterSource("segmentType", segmentType),
            (rs, i) -> new NetworkPerformanceSummary(
                rs.getString("segment_id"), rs.getString("segment_name"),
                rs.getString("segment_type"), rs.getString("location"),
                bd(rs, "packet_loss_rate"),
                bd(rs, "avg_latency_ms"),
                bd(rs, "p95_latency_ms"),
                bd(rs, "jitter_ms"),
                bd(rs, "bandwidth_utilization"),
                bd(rs, "availability_rate"),
                rs.getLong("total_flows"), rs.getLong("anomaly_count"),
                rs.getString("health_status"),
                rs.getTimestamp("last_updated") != null
                    ? rs.getTimestamp("last_updated").toLocalDateTime() : null));
    }

    @Retryable(retryFor = Exception.class, maxAttempts = 3,
               backoff = @Backoff(delay = 2000, multiplier = 2.0))
    public List<DnsMetrics> getDnsMetrics() {
        String sql = """
            SELECT server, total_queries, failed_queries, failure_rate,
                   avg_response_ms, nxdomain_count, timeout_count
            FROM %s
            WHERE snapshot_hour >= current_timestamp() - INTERVAL 30 DAYS
            ORDER BY failure_rate DESC
            """.formatted(tables.dnsMetrics());

        return jdbc.query(sql, Collections.emptyMap(), (rs, i) ->
            new DnsMetrics(
                rs.getString("server"),
                rs.getLong("total_queries"), rs.getLong("failed_queries"),
                bd(rs, "failure_rate"),
                bd(rs, "avg_response_ms"),
                rs.getLong("nxdomain_count"), rs.getLong("timeout_count")));
    }
}