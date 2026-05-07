package mil.disa.oe.repository;

import mil.disa.oe.dto.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;

/**
 * Queries the GOLD layer for App Health metrics.
 * Source system: Aternity (End User Experience Monitoring)
 * Tables: gold.app_health_summary, gold.app_health_trend
 */
@Repository
public class AppHealthRepository {

    private static final Logger log =
        LoggerFactory.getLogger(AppHealthRepository.class);

    private final NamedParameterJdbcTemplate jdbc;

    public AppHealthRepository(NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @Retryable(retryFor = Exception.class, maxAttempts = 3,
               backoff = @Backoff(delay = 2000, multiplier = 2.0))
    public AppHealthKpis getKpis() {
        log.debug("Querying gold.app_health_summary for KPIs");

        // KPI aggregates
        String kpiSql = """
            SELECT
                COUNT(DISTINCT application_name)                AS total_apps,
                COUNT(CASE WHEN health_status = 'HEALTHY'   THEN 1 END) AS healthy,
                COUNT(CASE WHEN health_status = 'DEGRADED'  THEN 1 END) AS degraded,
                COUNT(CASE WHEN health_status = 'CRITICAL'  THEN 1 END) AS critical,
                ROUND(AVG(experience_score), 1)                 AS avg_score,
                ROUND(AVG(avg_response_time_ms), 0)             AS avg_response_ms,
                SUM(active_user_count)                          AS total_users
            FROM gold.app_health_summary
            WHERE snapshot_date = current_date()
            """;

        // Top degraded applications
        String degradedSql = """
            SELECT
                application_name,
                health_status                AS severity,
                experience_score,
                degradation_pct,
                primary_cause,
                affected_user_count          AS affected_users
            FROM gold.app_health_summary
            WHERE health_status IN ('DEGRADED', 'CRITICAL')
              AND snapshot_date  = current_date()
            ORDER BY experience_score ASC
            LIMIT 5
            """;

        var row = jdbc.queryForMap(kpiSql, Collections.emptyMap());
        List<DegradedApp> degraded = jdbc.query(degradedSql,
            Collections.emptyMap(), (rs, i) -> new DegradedApp(
                rs.getString("application_name"),
                rs.getString("severity"),
                rs.getBigDecimal("experience_score"),
                rs.getBigDecimal("degradation_pct"),
                rs.getString("primary_cause"),
                rs.getInt("affected_users")
            ));

        return new AppHealthKpis(
            ((Number) row.get("total_apps")).intValue(),
            ((Number) row.get("healthy")).intValue(),
            ((Number) row.get("degraded")).intValue(),
            ((Number) row.get("critical")).intValue(),
            (java.math.BigDecimal) row.get("avg_score"),
            (java.math.BigDecimal) row.get("avg_response_ms"),
            ((Number) row.get("total_users")).intValue(),
            degraded
        );
    }

    @Retryable(retryFor = Exception.class, maxAttempts = 3,
               backoff = @Backoff(delay = 2000, multiplier = 2.0))
    public List<AppHealthSummary> getAll() {
        String sql = """
            SELECT
                application_name, app_category, experience_score,
                avg_response_time_ms, p95_response_time_ms, p99_response_time_ms,
                crash_rate, error_rate, active_user_count, total_session_count,
                health_status, trend, last_updated
            FROM gold.app_health_summary
            WHERE snapshot_date = current_date()
            ORDER BY experience_score ASC
            LIMIT 100
            """;

        return jdbc.query(sql, Collections.emptyMap(), (rs, i) ->
            new AppHealthSummary(
                rs.getString("application_name"),
                rs.getString("app_category"),
                rs.getBigDecimal("experience_score"),
                rs.getBigDecimal("avg_response_time_ms"),
                rs.getBigDecimal("p95_response_time_ms"),
                rs.getBigDecimal("p99_response_time_ms"),
                rs.getBigDecimal("crash_rate"),
                rs.getBigDecimal("error_rate"),
                rs.getInt("active_user_count"),
                rs.getInt("total_session_count"),
                rs.getString("health_status"),
                rs.getString("trend"),
                rs.getTimestamp("last_updated") != null
                    ? rs.getTimestamp("last_updated").toLocalDateTime() : null
            )
        );
    }

    @Retryable(retryFor = Exception.class, maxAttempts = 3,
               backoff = @Backoff(delay = 2000, multiplier = 2.0))
    public List<AppHealthTrend> getTrend(String appName, int hours) {
        String sql = """
            SELECT application_name, timestamp, experience_score,
                   avg_response_time_ms AS response_time_ms, error_count
            FROM gold.app_health_trend
            WHERE application_name = :appName
              AND timestamp >= current_timestamp() - INTERVAL :hours HOURS
            ORDER BY timestamp ASC
            """;

        return jdbc.query(sql,
            new MapSqlParameterSource()
                .addValue("appName", appName)
                .addValue("hours",   hours),
            (rs, i) -> new AppHealthTrend(
                rs.getString("application_name"),
                rs.getString("timestamp"),
                rs.getBigDecimal("experience_score"),
                rs.getBigDecimal("response_time_ms"),
                rs.getInt("error_count")
            )
        );
    }
}
