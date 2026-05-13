package mil.disa.oe.repository;

import mil.disa.oe.config.TableNames;
import mil.disa.oe.dto.*;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Collections;
import java.util.List;

/** Source: Microsoft Intune (Device Management) */
@Repository
public class DeviceHealthRepository {

    private final NamedParameterJdbcTemplate jdbc;
    private final TableNames tables;

    public DeviceHealthRepository(NamedParameterJdbcTemplate jdbc, TableNames tables) {
        this.jdbc   = jdbc;
        this.tables = tables;
    }

    @Retryable(retryFor = Exception.class, maxAttempts = 3,
               backoff = @Backoff(delay = 2000, multiplier = 2.0))
    public DeviceHealthKpis getKpis() {
        String kpiSql = """
            SELECT
                COUNT(*)                                                     AS total_devices,
                COUNT(CASE WHEN compliance_state = 'COMPLIANT'     THEN 1 END) AS compliant,
                COUNT(CASE WHEN compliance_state = 'NON_COMPLIANT' THEN 1 END) AS non_compliant,
                COUNT(CASE WHEN compliance_state = 'UNKNOWN'       THEN 1 END) AS unknown,
                ROUND(AVG(health_score), 1)                                  AS avg_health,
                COUNT(CASE WHEN days_since_checkin > 7             THEN 1 END) AS not_checked_in,
                COUNT(CASE WHEN encryption_enabled = true          THEN 1 END) AS encrypted
            FROM %s
            WHERE snapshot_date = current_date()
            """.formatted(tables.deviceHealthSummary());

        String byTypeSql = """
            SELECT device_type, COUNT(*) AS total,
                   COUNT(CASE WHEN compliance_state = 'COMPLIANT'     THEN 1 END) AS compliant,
                   COUNT(CASE WHEN compliance_state = 'NON_COMPLIANT' THEN 1 END) AS non_compliant,
                   ROUND(COUNT(CASE WHEN compliance_state = 'COMPLIANT' THEN 1 END)
                         * 100.0 / NULLIF(COUNT(*),0), 1) AS compliance_rate
            FROM %s
            WHERE snapshot_date = current_date()
            GROUP BY device_type
            ORDER BY total DESC
            """.formatted(tables.deviceHealthSummary());

        String osSql = """
            SELECT os_name, os_version, COUNT(*) AS device_count,
                   is_os_supported AS is_supported, is_os_latest AS is_latest
            FROM %s
            WHERE snapshot_date = current_date()
            GROUP BY os_name, os_version, is_os_supported, is_os_latest
            ORDER BY device_count DESC
            LIMIT 20
            """.formatted(tables.deviceHealthSummary());

        var r = jdbc.queryForMap(kpiSql, Collections.emptyMap());

        List<ComplianceByType> byType = jdbc.query(byTypeSql,
            Collections.emptyMap(), (rs, i) -> new ComplianceByType(
                rs.getString("device_type"), rs.getInt("total"),
                rs.getInt("compliant"), rs.getInt("non_compliant"),
                rs.getBigDecimal("compliance_rate")));

        List<OsDistribution> os = jdbc.query(osSql,
            Collections.emptyMap(), (rs, i) -> new OsDistribution(
                rs.getString("os_name"), rs.getString("os_version"),
                rs.getInt("device_count"),
                rs.getBoolean("is_supported"), rs.getBoolean("is_latest")));

        int total     = ((Number) r.get("total_devices")).intValue();
        int compliant = ((Number) r.get("compliant")).intValue();
        BigDecimal rate = total > 0
            ? new BigDecimal(compliant * 100.0 / total).setScale(1, RoundingMode.HALF_UP)
            : BigDecimal.ZERO;

        return new DeviceHealthKpis(
            total, compliant,
            ((Number) r.get("non_compliant")).intValue(),
            ((Number) r.get("unknown")).intValue(),
            rate,
            (BigDecimal) r.get("avg_health"),
            ((Number) r.get("not_checked_in")).intValue(),
            ((Number) r.get("encrypted")).intValue(),
            byType, os);
    }

    @Retryable(retryFor = Exception.class, maxAttempts = 3,
               backoff = @Backoff(delay = 2000, multiplier = 2.0))
    public List<DeviceHealthSummary> getAll(String complianceFilter, int page, int size) {
        String sql = """
            SELECT device_id, device_name, device_type, os_name, os_version,
                   compliance_state, health_score, enrollment_status,
                   last_check_in, assigned_user, location,
                   encryption_enabled, firewall_enabled, antivirus_enabled,
                   management_agent
            FROM %s
            WHERE snapshot_date = current_date()
              AND (:filter IS NULL OR compliance_state = :filter)
            ORDER BY health_score ASC
            LIMIT :size OFFSET :offset
            """.formatted(tables.deviceHealthSummary());

        return jdbc.query(sql,
            new MapSqlParameterSource()
                .addValue("filter", complianceFilter)
                .addValue("size",   size)
                .addValue("offset", page * size),
            (rs, i) -> new DeviceHealthSummary(
                rs.getString("device_id"), rs.getString("device_name"),
                rs.getString("device_type"), rs.getString("os_name"),
                rs.getString("os_version"), rs.getString("compliance_state"),
                rs.getBigDecimal("health_score"),
                rs.getString("enrollment_status"),
                rs.getTimestamp("last_check_in") != null
                    ? rs.getTimestamp("last_check_in").toLocalDateTime() : null,
                rs.getString("assigned_user"), rs.getString("location"),
                rs.getBoolean("encryption_enabled"),
                rs.getBoolean("firewall_enabled"),
                rs.getBoolean("antivirus_enabled"),
                rs.getString("management_agent")));
    }
}
