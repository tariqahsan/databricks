package mil.disa.oe.repository;

import mil.disa.oe.dto.*;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;

@Repository
public class TopIssuesRepository {

    private final NamedParameterJdbcTemplate jdbc;

    public TopIssuesRepository(NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @Retryable(retryFor = Exception.class, maxAttempts = 3,
               backoff = @Backoff(delay = 2000, multiplier = 2.0))
    public IssuesKpis getKpis() {
        String kpiSql = """
            SELECT
                COUNT(CASE WHEN severity='P1' AND status!='RESOLVED' THEN 1 END) AS p1_open,
                COUNT(CASE WHEN severity='P2' AND status!='RESOLVED' THEN 1 END) AS p2_open,
                COUNT(CASE WHEN severity='P3' AND status!='RESOLVED' THEN 1 END) AS p3_open,
                COUNT(CASE WHEN severity='P4' AND status!='RESOLVED' THEN 1 END) AS p4_open,
                COUNT(CASE WHEN status != 'RESOLVED'                 THEN 1 END) AS total_open,
                COUNT(CASE WHEN status = 'RESOLVED'
                            AND DATE(resolved_at) = current_date()   THEN 1 END) AS resolved_today,
                ROUND(AVG(CASE WHEN status='RESOLVED'
                          THEN mttr_minutes END) / 60.0, 1)                       AS avg_mttr_hours,
                ROUND(COUNT(CASE WHEN sla_breached = true THEN 1 END)*100.0
                      / NULLIF(COUNT(*), 0), 1)                                   AS sla_breach_rate
            FROM gold.top_issues_summary
            WHERE opened_at >= current_date() - 30
            """;

        String byCatSql = """
            SELECT category,
                   COUNT(CASE WHEN status != 'RESOLVED' THEN 1 END) AS open_count,
                   COUNT(CASE WHEN status = 'RESOLVED'  THEN 1 END) AS resolved_count,
                   ROUND(AVG(CASE WHEN status='RESOLVED'
                             THEN mttr_minutes END)/60.0, 1)         AS avg_mttr
            FROM gold.top_issues_summary
            WHERE opened_at >= current_date() - 30
            GROUP BY category ORDER BY open_count DESC
            """;

        String trendingSql = """
            SELECT pattern, occurrence_count AS occurrences,
                   affected_component, trend
            FROM gold.issue_trends
            WHERE analysis_date = current_date()
            ORDER BY occurrences DESC LIMIT 5
            """;

        String criticalSql = """
            SELECT issue_id, title, category, severity, status, source,
                   affected_devices, affected_users, opened_at, last_updated_at,
                   resolved_at, mttr_minutes, assigned_team, root_cause,
                   is_recurring, occurrence_count
            FROM gold.top_issues_summary
            WHERE severity IN ('P1','P2') AND status != 'RESOLVED'
            ORDER BY severity, opened_at ASC LIMIT 10
            """;

        var r = jdbc.queryForMap(kpiSql, Collections.emptyMap());

        List<IssuesByCategory> byCat = jdbc.query(byCatSql,
            Collections.emptyMap(), (rs, i) -> new IssuesByCategory(
                rs.getString("category"), rs.getInt("open_count"),
                rs.getInt("resolved_count"), rs.getBigDecimal("avg_mttr")));

        List<TrendingIssue> trending = jdbc.query(trendingSql,
            Collections.emptyMap(), (rs, i) -> new TrendingIssue(
                rs.getString("pattern"), rs.getInt("occurrences"),
                rs.getString("affected_component"), rs.getString("trend")));

        List<TopIssueSummary> critical = jdbc.query(criticalSql,
            Collections.emptyMap(), (rs, i) -> new TopIssueSummary(
                rs.getString("issue_id"), rs.getString("title"),
                rs.getString("category"), rs.getString("severity"),
                rs.getString("status"), rs.getString("source"),
                rs.getInt("affected_devices"), rs.getInt("affected_users"),
                rs.getTimestamp("opened_at").toLocalDateTime(),
                rs.getTimestamp("last_updated_at").toLocalDateTime(),
                rs.getTimestamp("resolved_at") != null
                    ? rs.getTimestamp("resolved_at").toLocalDateTime() : null,
                rs.getLong("mttr_minutes"), rs.getString("assigned_team"),
                rs.getString("root_cause"), rs.getBoolean("is_recurring"),
                rs.getInt("occurrence_count")));

        return new IssuesKpis(
            ((Number) r.get("p1_open")).intValue(),
            ((Number) r.get("p2_open")).intValue(),
            ((Number) r.get("p3_open")).intValue(),
            ((Number) r.get("p4_open")).intValue(),
            ((Number) r.get("total_open")).intValue(),
            ((Number) r.get("resolved_today")).intValue(),
            (java.math.BigDecimal) r.get("avg_mttr_hours"),
            (java.math.BigDecimal) r.get("sla_breach_rate"),
            byCat, trending, critical
        );
    }
}
