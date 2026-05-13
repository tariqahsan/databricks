package mil.disa.oe.repository;

import mil.disa.oe.config.TableNames;
import mil.disa.oe.dto.*;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;

/** Source: Microsoft Intune + Aternity */
@Repository
public class VersionSprawlRepository {

    private final NamedParameterJdbcTemplate jdbc;
    private final TableNames tables;

    public VersionSprawlRepository(NamedParameterJdbcTemplate jdbc, TableNames tables) {
        this.jdbc   = jdbc;
        this.tables = tables;
    }

    @Retryable(retryFor = Exception.class, maxAttempts = 3,
               backoff = @Backoff(delay = 2000, multiplier = 2.0))
    public VersionSprawlKpis getKpis() {
        String kpiSql = """
            SELECT
                COUNT(DISTINCT software_name)                             AS total_products,
                COUNT(DISTINCT CASE WHEN version_count > 3
                               THEN software_name END)                    AS with_sprawl,
                ROUND(AVG(version_count), 1)                             AS avg_versions,
                SUM(CASE WHEN is_latest AND software_type = 'OS'
                         THEN device_count ELSE 0 END)                   AS on_latest_os,
                SUM(CASE WHEN NOT is_supported
                         THEN device_count ELSE 0 END)                   AS unsupported_os,
                COUNT(DISTINCT CASE WHEN has_vulnerabilities
                               THEN software_name END)                   AS apps_with_cves
            FROM %s
            WHERE snapshot_date = current_date()
            """.formatted(tables.versionSprawlSummary());

        String worstSql = """
            SELECT software_name, version_count,
                   SUM(device_count) AS device_count,
                   MAX(CASE WHEN is_latest THEN version ELSE NULL END) AS latest_version,
                   ROUND(SUM(CASE WHEN is_latest THEN device_count ELSE 0 END)
                         * 100.0 / NULLIF(SUM(device_count),0), 1) AS pct_on_latest
            FROM %s
            WHERE snapshot_date = current_date()
            GROUP BY software_name, version_count
            ORDER BY version_count DESC
            LIMIT 10
            """.formatted(tables.versionSprawlSummary());

        String osVerSql = """
            SELECT software_name AS name, version, device_count AS count,
                   ROUND(device_count * 100.0
                         / SUM(device_count) OVER(), 1) AS percentage,
                   is_supported
            FROM %s
            WHERE snapshot_date = current_date()
              AND software_type = 'OS'
            ORDER BY device_count DESC
            LIMIT 15
            """.formatted(tables.versionSprawlSummary());

        var r = jdbc.queryForMap(kpiSql, Collections.emptyMap());

        List<SprawlByProduct> worst = jdbc.query(worstSql,
            Collections.emptyMap(), (rs, i) -> new SprawlByProduct(
                rs.getString("software_name"), rs.getInt("version_count"),
                rs.getInt("device_count"), rs.getString("latest_version"),
                rs.getBigDecimal("pct_on_latest")));

        List<VersionDistribution> osVer = jdbc.query(osVerSql,
            Collections.emptyMap(), (rs, i) -> new VersionDistribution(
                rs.getString("name"), rs.getString("version"),
                rs.getInt("count"), rs.getBigDecimal("percentage"),
                rs.getBoolean("is_supported")));

        return new VersionSprawlKpis(
            ((Number) r.get("total_products")).intValue(),
            ((Number) r.get("with_sprawl")).intValue(),
            (java.math.BigDecimal) r.get("avg_versions"),
            ((Number) r.get("on_latest_os")).intValue(),
            ((Number) r.get("unsupported_os")).intValue(),
            ((Number) r.get("apps_with_cves")).intValue(),
            worst, osVer, List.of());
    }
}
