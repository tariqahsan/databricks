package mil.disa.oe.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.EventListener;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

/**
 * ConnectionValidationService
 *
 * On startup (non-mock profiles) validates all Gold tables are accessible
 * and prints a diagnostic. Active on thrift and prod profiles.
 */
@Component
@Profile("!mock")
public class ConnectionValidationService {

    private static final Logger log =
        LoggerFactory.getLogger(ConnectionValidationService.class);

    private final JdbcTemplate jdbc;
    private final TableNames   tables;

    public ConnectionValidationService(JdbcTemplate jdbc, TableNames tables) {
        this.jdbc   = jdbc;
        this.tables = tables;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void validateOnStartup() {
        log.info("═══════════════════════════════════════════════");
        log.info("  OE Data Intelligence — Connection Validation");
        log.info("═══════════════════════════════════════════════");

        try {
            String version = jdbc.queryForObject("SELECT version()", String.class);
            log.info("  ✅  Connected: {}", version);
        } catch (Exception e) {
            log.error("  ❌  Cannot connect: {}", e.getMessage());
            return;
        }

        String[] goldTables = {
            tables.appHealthSummary(),
            tables.networkPerformanceSummary(),
            tables.packetLossRootCause(),
            tables.deviceHealthSummary(),
            tables.dnsMetrics(),
            tables.topIssuesSummary(),
            tables.versionSprawlSummary(),
            tables.dataSourceIngestionStatus(),
        };

        int ok = 0;
        for (String t : goldTables) {
            try {
                Long n = jdbc.queryForObject("SELECT COUNT(*) FROM " + t, Long.class);
                log.info("  ✅  {} ({} rows)", t, n);
                ok++;
            } catch (Exception e) {
                log.warn("  ⚠️   {} — {}", t, e.getMessage());
            }
        }
        log.info("───────────────────────────────────────────────");
        if (ok == goldTables.length)
            log.info("  ✅  All {} Gold tables ready", ok);
        else
            log.warn("  ⚠️   {}/{} tables accessible — run ingestion pipeline",
                     ok, goldTables.length);
        log.info("═══════════════════════════════════════════════");
    }
}
