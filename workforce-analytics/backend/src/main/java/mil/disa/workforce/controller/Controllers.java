package mil.disa.workforce.controller;

import mil.disa.workforce.dto.*;
import mil.disa.workforce.service.DashboardService;
import mil.disa.workforce.service.EmployeeService;
import mil.disa.workforce.service.PipelineService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD CONTROLLER  — Gold layer reads (cached)
// ─────────────────────────────────────────────────────────────────────────────
@RestController
@RequestMapping("/api/dashboard")
class DashboardController {

    private final DashboardService service;

    DashboardController(DashboardService service) {
        this.service = service;
    }

    @GetMapping("/departments")
    public ResponseEntity<ApiResponse<List<DeptSummaryDTO>>> getDepts() {
        return ResponseEntity.ok(
            ApiResponse.ok(service.getDeptSummary()));
    }

    @GetMapping("/locations")
    public ResponseEntity<ApiResponse<List<LocationHeadcountDTO>>> getLocations() {
        return ResponseEntity.ok(
            ApiResponse.ok(service.getLocationHeadcount()));
    }

    @GetMapping("/salary-bands")
    public ResponseEntity<ApiResponse<List<SalaryBandDTO>>> getSalaryBands() {
        return ResponseEntity.ok(
            ApiResponse.ok(service.getSalaryBands()));
    }

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getSummary() {
        Map<String, Object> summary = Map.of(
            "departments", service.getDeptSummary(),
            "locations",   service.getLocationHeadcount(),
            "salaryBands", service.getSalaryBands()
        );
        return ResponseEntity.ok(ApiResponse.ok(summary));
    }
}


// ─────────────────────────────────────────────────────────────────────────────
// EMPLOYEE CONTROLLER  — CRUD + Search + Transfer + Batch
// ─────────────────────────────────────────────────────────────────────────────
@RestController
@RequestMapping("/api/employees")
class EmployeeController {

    private final EmployeeService service;

    EmployeeController(EmployeeService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EmployeeDTO>> getById(
            @PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.ok(service.getById(id)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<EmployeeDTO>>> getByDept(
            @RequestParam(required = false) String dept,
            @RequestParam(defaultValue = "0")  int page,
            @RequestParam(defaultValue = "25") int size) {
        return ResponseEntity.ok(
            ApiResponse.ok(service.getByDepartment(dept, page, size)));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<EmployeeDTO>>> search(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String dept,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String band) {
        return ResponseEntity.ok(
            ApiResponse.ok(service.search(keyword, dept, location, band)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<EmployeeDTO>> create(
            @RequestBody @Valid EmployeeDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.ok("Employee created",
                service.create(dto)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<EmployeeDTO>> update(
            @PathVariable String id,
            @RequestBody @Valid EmployeeDTO dto) {
        return ResponseEntity.ok(
            ApiResponse.ok("Employee updated", service.update(id, dto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deactivate(
            @PathVariable String id) {
        service.deactivate(id);
        return ResponseEntity.ok(
            ApiResponse.ok("Employee deactivated", null));
    }

    @PostMapping("/transfer")
    public ResponseEntity<ApiResponse<Void>> transfer(
            @RequestBody @Valid TransferRequest request) {
        service.transfer(request);
        return ResponseEntity.ok(ApiResponse.ok("Transfer complete", null));
    }

    @PostMapping("/batch")
    public ResponseEntity<ApiResponse<BatchUploadResult>> batchUpload(
            @RequestBody @Valid BatchUploadRequest request) {
        return ResponseEntity.status(HttpStatus.MULTI_STATUS)
            .body(ApiResponse.ok("Batch upload complete",
                service.batchUpload(request)));
    }
}


// ─────────────────────────────────────────────────────────────────────────────
// PIPELINE CONTROLLER  — Databricks Workflow job management
// ─────────────────────────────────────────────────────────────────────────────
@RestController
@RequestMapping("/api/pipeline")
class PipelineController {

    private final PipelineService service;

    PipelineController(PipelineService service) {
        this.service = service;
    }

    @PostMapping("/trigger")
    public ResponseEntity<ApiResponse<PipelineRunDTO>> trigger(
            @RequestBody PipelineTriggerRequest request) {
        PipelineRunDTO run = service.triggerPipeline(
            request.reason() != null ? request.reason() : "manual-trigger");
        return ResponseEntity.accepted()
            .body(ApiResponse.ok("Pipeline triggered", run));
    }

    @GetMapping("/status/{runId}")
    public ResponseEntity<ApiResponse<PipelineRunDTO>> getStatus(
            @PathVariable Long runId) {
        return ResponseEntity.ok(
            ApiResponse.ok(service.getStatus(runId)));
    }
}
