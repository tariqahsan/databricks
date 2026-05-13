package mil.disa.oe.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * TableNames — central registry for all Delta table references.
 *
 * Repositories inject this bean instead of hard-coding "gold." prefixes.
 * When Databricks Unity Catalog is enabled, change ONE property:
 *   oe.datasource.gold-prefix=main.gold
 * All repositories update automatically — no SQL edits required.
 */
@Component
public class TableNames {

    private final String goldPrefix;
    private final String silverPrefix;

    public TableNames(
            @Value("${oe.datasource.gold-prefix:gold}")    String goldPrefix,
            @Value("${oe.datasource.silver-prefix:silver}") String silverPrefix) {
        this.goldPrefix   = goldPrefix;
        this.silverPrefix = silverPrefix;
    }

    // ── GOLD ─────────────────────────────────────────────────────────
    public String appHealthSummary()          { return goldPrefix + ".app_health_summary"; }
    public String appHealthTrend()            { return goldPrefix + ".app_health_trend"; }
    public String networkPerformanceSummary() { return goldPrefix + ".network_performance_summary"; }
    public String packetLossRootCause()       { return goldPrefix + ".packet_loss_root_cause"; }
    public String dnsMetrics()                { return goldPrefix + ".dns_metrics"; }
    public String deviceHealthSummary()       { return goldPrefix + ".device_health_summary"; }
    public String topIssuesSummary()          { return goldPrefix + ".top_issues_summary"; }
    public String issueTrends()               { return goldPrefix + ".issue_trends"; }
    public String versionSprawlSummary()      { return goldPrefix + ".version_sprawl_summary"; }
    public String dataSourceIngestionStatus() { return goldPrefix + ".data_source_ingestion_status"; }

    // ── SILVER ───────────────────────────────────────────────────────
    public String appPerformance()            { return silverPrefix + ".app_performance"; }
    public String networkMetrics()            { return silverPrefix + ".network_metrics"; }
    public String deviceInventory()           { return silverPrefix + ".device_inventory"; }
    public String incidents()                 { return silverPrefix + ".incidents"; }
    public String infrastructureAlerts()      { return silverPrefix + ".infrastructure_alerts"; }
}
