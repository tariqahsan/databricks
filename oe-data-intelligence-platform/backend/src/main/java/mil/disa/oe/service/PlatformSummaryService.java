package mil.disa.oe.service;

import mil.disa.oe.dto.PlatformSummary;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PlatformSummaryService {

    private final AppHealthService          appHealth;
    private final DeviceHealthService       deviceHealth;
    private final NetworkPerformanceService network;
    private final TopIssuesService          issues;
    private final VersionSprawlService      versionSprawl;
    private final DataSourceStatusService   dataSource;

    public PlatformSummaryService(
            AppHealthService appHealth,
            DeviceHealthService deviceHealth,
            NetworkPerformanceService network,
            TopIssuesService issues,
            VersionSprawlService versionSprawl,
            DataSourceStatusService dataSource) {
        this.appHealth    = appHealth;
        this.deviceHealth = deviceHealth;
        this.network      = network;
        this.issues       = issues;
        this.versionSprawl = versionSprawl;
        this.dataSource   = dataSource;
    }

    @Cacheable("platformSummary")
    public PlatformSummary getSummary() {
        return new PlatformSummary(
            appHealth.getKpis(),
            deviceHealth.getKpis(),
            network.getKpis(),
            issues.getKpis(),
            versionSprawl.getKpis(),
            dataSource.getAllStatuses(),
            LocalDateTime.now().toString()
        );
    }
}
