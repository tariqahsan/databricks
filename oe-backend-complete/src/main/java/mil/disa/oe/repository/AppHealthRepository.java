package mil.disa.oe.repository;

import mil.disa.oe.config.TableNames;
import mil.disa.oe.dto.*;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;

/** Source: Aternity (End User Experience Monitoring) */
@Repository
public class AppHealthRepository {

    private final NamedParameterJdbcTemplate jdbc;
    private final TableNames tables;

    public AppHealthRepository(NamedParameterJdbcTemplate jdbc, TableNames tables) {
        this.jdbc   = jdbc;
        this.tables = tables;
    }

    @Retryable(retryFor = Exception.class, maxAttempts = 3,
               backoff = @Backoff(delay = 2000, multiplier = 2.0))
    public AppHealthKpis getKpis() {
        String kpiSql = """
            SELECT
                COUNT(DISTINCT app_name)                                 AS total_apps,
                COUNT(CASE WHEN health_status = 'HEALTHY'  THEN 1 END)  AS healthy,
                COUNT(CASE WHEN health_status = 'DEGRADED' THEN 1 END)  AS degraded,
                COUNT(CASE WHEN health_status = 'CRITICAL' THEN 1 END)  AS critical,
                ROUND(AVG(experience_score), 1)                         AS avg_score,
                ROUND(AVG(avg_response_time_ms), 0)                     AS avg_response_ms,
                SUM(active_user_count)                                   AS total_users
            FROM %s
            WHERE snapshot_date = current_date()
            """.formatted(tables.appHealthSummary());

        String degradedSql = """
            SELECT app_name, health_status AS severity, experience_score,
                   degradation_pct, primary_cause, active_user_count AS affected_users
            FROM %s
            WHERE health_status IN ('DEGRADED','CRITICAL')
              AND snapshot_date = current_date()
            ORDER BY experience_score ASC
            LIMIT 5
            """.formatted(tables.appHealthSummary());

        var row = jdbc.queryForMap(kpiSql, Collections.emptyMap());

        List<DegradedApp> degraded = jdbc.query(degradedSql,
            Collections.emptyMap(), (rs, i) -> new DegradedApp(
                rs.getString("app_name"),
                rs.getString("severity"),
                rs.getBigDecimal("experience_score"),
                rs.getBigDecimal("degradation_pct"),
                rs.getString("primary_cause"),
                rs.getInt("affected_users")));

        return new AppHealthKpis(
            ((Number) row.get("total_apps")).intValue(),
            ((Number) row.get("healthy")).intValue(),
            ((Number) row.get("degraded")).intValue(),
            ((Number) row.get("critical")).intValue(),
            (java.math.BigDecimal) row.get("avg_score"),
            (java.math.BigDecimal) row.get("avg_response_ms"),
            ((Number) row.get("total_users")).intValue(),
            degraded);
    }

    @Retryable(retryFor = Exception.class, maxAttempts = 3,
               backoff = @Backoff(delay = 2000, multiplier = 2.0))
    public List<AppHealthSummary> getAll() {
        String sql = """
            SELECT app_name, app_category, experience_score,
                   avg_response_time_ms, p95_response_time_ms, p99_response_time_ms,
                   crash_rate, error_rate, active_user_count, total_session_count,
                   health_status, trend, last_updated
            FROM %s
            WHERE snapshot_date = current_date()
            ORDER BY experience_score ASC
            LIMIT 100
            """.formatted(tables.appHealthSummary());

        return jdbc.query(sql, Collections.emptyMap(), (rs, i) ->
            new AppHealthSummary(
                rs.getString("app_name"), rs.getString("app_category"),
                rs.getBigDecimal("experience_score"),
                rs.getBigDecimal("avg_response_time_ms"),
                rs.getBigDecimal("p95_response_time_ms"),
                rs.getBigDecimal("p99_response_time_ms"),
                rs.getBigDecimal("crash_rate"), rs.getBigDecimal("error_rate"),
                rs.getInt("active_user_count"), rs.getInt("total_session_count"),
                rs.getString("health_status"), rs.getString("trend"),
                rs.getTimestamp("last_updated") != null
                    ? rs.getTimestamp("last_updated").toLocalDateTime() : null));
    }

    @Retryable(retryFor = Exception.class, maxAttempts = 3,
               backoff = @Backoff(delay = 2000, multiplier = 2.0))
    public List<AppHealthTrend> getTrend(String appName, int hours) {
        String sql = """
            SELECT app_name, timestamp, experience_score,
                   avg_response_time_ms AS response_time_ms, error_count
            FROM %s
            WHERE app_name = :appName
              AND timestamp >= current_timestamp() - INTERVAL :hours HOURS
            ORDER BY timestamp ASC
            """.formatted(tables.appHealthTrend());

        return jdbc.query(sql,
            new MapSqlParameterSource()
                .addValue("appName", appName)
                .addValue("hours",   hours),
            (rs, i) -> new AppHealthTrend(
                rs.getString("app_name"), rs.getString("timestamp"),
                rs.getBigDecimal("experience_score"),
                rs.getBigDecimal("response_time_ms"),
                rs.getInt("error_count")));
    }
}
