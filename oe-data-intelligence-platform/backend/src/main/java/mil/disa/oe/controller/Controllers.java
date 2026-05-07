package mil.disa.oe.controller;

import mil.disa.oe.dto.*;
import mil.disa.oe.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

// ─────────────────────────────────────────────────────────────────────────────
// PLATFORM SUMMARY  — Single composite call for main dashboard
// ─────────────────────────────────────────────────────────────────────────────
@RestController
@RequestMapping("/api/platform")
class PlatformController {

    private final PlatformSummaryService service;

    PlatformController(PlatformSummaryService service) {
        this.service = service;
    }

    /** GET /api/platform/summary — loads entire dashboard in one call */
    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<PlatformSummary>> getSummary() {
        return ResponseEntity.ok(ApiResponse.ok(service.getSummary()));
    }
}


// ─────────────────────────────────────────────────────────────────────────────
// APP HEALTH  — Aternity data
// ─────────────────────────────────────────────────────────────────────────────
@RestController
@RequestMapping("/api/app-health")
class AppHealthController {

    private final AppHealthService service;

    AppHealthController(AppHealthService service) {
        this.service = service;
    }

    @GetMapping("/kpis")
    public ResponseEntity<ApiResponse<AppHealthKpis>> getKpis() {
        return ResponseEntity.ok(ApiResponse.ok(service.getKpis()));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<AppHealthSummary>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok(service.getAll()));
    }

    @GetMapping("/{appName}/trend")
    public ResponseEntity<ApiResponse<List<AppHealthTrend>>> getTrend(
            @PathVariable String appName,
            @RequestParam(defaultValue = "24") int hours) {
        return ResponseEntity.ok(
            ApiResponse.ok(service.getTrend(appName, hours)));
    }
}


// ─────────────────────────────────────────────────────────────────────────────
// DEVICE HEALTH  — Intune data
// ─────────────────────────────────────────────────────────────────────────────
@RestController
@RequestMapping("/api/device-health")
class DeviceHealthController {

    private final DeviceHealthService service;

    DeviceHealthController(DeviceHealthService service) {
        this.service = service;
    }

    @GetMapping("/kpis")
    public ResponseEntity<ApiResponse<DeviceHealthKpis>> getKpis() {
        return ResponseEntity.ok(ApiResponse.ok(service.getKpis()));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<DeviceHealthSummary>>> getAll(
            @RequestParam(required = false) String compliance,
            @RequestParam(defaultValue = "0")  int page,
            @RequestParam(defaultValue = "50") int size) {
        return ResponseEntity.ok(
            ApiResponse.ok(service.getAll(compliance, page, size)));
    }
}


// ─────────────────────────────────────────────────────────────────────────────
// NETWORK PERFORMANCE  — NetScout + Infoblox
// ─────────────────────────────────────────────────────────────────────────────
@RestController
@RequestMapping("/api/network-performance")
class NetworkPerformanceController {

    private final NetworkPerformanceService service;

    NetworkPerformanceController(NetworkPerformanceService service) {
        this.service = service;
    }

    @GetMapping("/kpis")
    public ResponseEntity<ApiResponse<NetworkKpis>> getKpis() {
        return ResponseEntity.ok(ApiResponse.ok(service.getKpis()));
    }

    @GetMapping("/segments")
    public ResponseEntity<ApiResponse<List<NetworkPerformanceSummary>>> getSegments(
            @RequestParam(required = false) String type) {
        return ResponseEntity.ok(
            ApiResponse.ok(service.getBySegment(type)));
    }

    @GetMapping("/dns")
    public ResponseEntity<ApiResponse<List<DnsMetrics>>> getDns() {
        return ResponseEntity.ok(ApiResponse.ok(service.getDnsMetrics()));
    }
}


// ─────────────────────────────────────────────────────────────────────────────
// TOP ISSUES  — ScienceLogic + Salesforce
// ─────────────────────────────────────────────────────────────────────────────
@RestController
@RequestMapping("/api/top-issues")
class TopIssuesController {

    private final TopIssuesService service;

    TopIssuesController(TopIssuesService service) {
        this.service = service;
    }

    @GetMapping("/kpis")
    public ResponseEntity<ApiResponse<IssuesKpis>> getKpis() {
        return ResponseEntity.ok(ApiResponse.ok(service.getKpis()));
    }
}


// ─────────────────────────────────────────────────────────────────────────────
// VERSION SPRAWL  — Intune + Aternity
// ─────────────────────────────────────────────────────────────────────────────
@RestController
@RequestMapping("/api/version-sprawl")
class VersionSprawlController {

    private final VersionSprawlService service;

    VersionSprawlController(VersionSprawlService service) {
        this.service = service;
    }

    @GetMapping("/kpis")
    public ResponseEntity<ApiResponse<VersionSprawlKpis>> getKpis() {
        return ResponseEntity.ok(ApiResponse.ok(service.getKpis()));
    }
}


// ─────────────────────────────────────────────────────────────────────────────
// DATA SOURCES  — Ingestion pipeline status + trigger
// ─────────────────────────────────────────────────────────────────────────────
@RestController
@RequestMapping("/api/data-sources")
class DataSourcesController {

    private final DataSourceStatusService service;

    DataSourcesController(DataSourceStatusService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<DataSourceStatus>>> getStatuses() {
        return ResponseEntity.ok(
            ApiResponse.ok(service.getAllStatuses()));
    }

    @PostMapping("/ingest")
    public ResponseEntity<ApiResponse<IngestionPipelineRun>> triggerIngestion(
            @RequestParam(required = false) String source,
            @RequestParam(required = false) String reason) {
        return ResponseEntity.accepted()
            .body(ApiResponse.ok("Ingestion triggered",
                service.triggerIngestion(source, reason)));
    }
}
