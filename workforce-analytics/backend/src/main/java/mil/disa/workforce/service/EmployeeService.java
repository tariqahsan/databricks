package mil.disa.workforce.service;

import mil.disa.workforce.dto.*;
import mil.disa.workforce.event.EmployeeUpdatedEvent;
import mil.disa.workforce.exception.EmployeeNotFoundException;
import mil.disa.workforce.repository.EmployeeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class EmployeeService {

    private static final Logger log =
        LoggerFactory.getLogger(EmployeeService.class);

    private final EmployeeRepository       repo;
    private final ApplicationEventPublisher events;

    public EmployeeService(EmployeeRepository repo,
                           ApplicationEventPublisher events) {
        this.repo   = repo;
        this.events = events;
    }

    // ── READS ────────────────────────────────────────────────────────

    @Cacheable(value = "employeePage",
               key = "#dept + '_' + #page + '_' + #size")
    @Transactional(readOnly = true)
    public PagedResponse<EmployeeDTO> getByDepartment(String dept,
                                                       int page,
                                                       int size) {
        return repo.findByDepartment(dept, page, size);
    }

    @Transactional(readOnly = true)
    public EmployeeDTO getById(String employeeId) {
        return repo.findById(employeeId)
            .orElseThrow(() ->
                new EmployeeNotFoundException(employeeId));
    }

    @Transactional(readOnly = true)
    public List<EmployeeDTO> search(String keyword, String dept,
                                     String location, String band) {
        return repo.search(keyword, dept, location, band);
    }

    // ── Pattern 1: Create — MERGE ensures idempotency ────────────────

    @Transactional
    @CacheEvict(value = {"employeePage", "deptSummary"}, allEntries = true)
    public EmployeeDTO create(EmployeeDTO dto) {
        String id = UUID.randomUUID().toString();

        EmployeeDTO withId = new EmployeeDTO(
            id, dto.firstName(), dto.lastName(), dto.resolvedFullName(),
            dto.department(), dto.jobTitle(), dto.salary(), null,
            dto.hireDate(), dto.location(), "ACTIVE", null
        );

        repo.upsert(withId);
        events.publishEvent(new EmployeeUpdatedEvent(id, "CREATE"));

        log.info("Created employee: {}", id);
        return repo.findById(id).orElse(withId);
    }

    // ── Pattern 1: Update — MERGE handles update atomically ──────────

    @Transactional
    @CacheEvict(value = {"employeePage", "deptSummary"}, allEntries = true)
    public EmployeeDTO update(String employeeId, EmployeeDTO dto) {
        repo.findById(employeeId)
            .orElseThrow(() ->
                new EmployeeNotFoundException(employeeId));

        EmployeeDTO withId = new EmployeeDTO(
            employeeId, dto.firstName(), dto.lastName(),
            dto.resolvedFullName(), dto.department(), dto.jobTitle(),
            dto.salary(), null, dto.hireDate(), dto.location(),
            dto.status(), null
        );

        repo.upsert(withId);
        events.publishEvent(
            new EmployeeUpdatedEvent(employeeId, "UPDATE"));

        log.info("Updated employee: {}", employeeId);
        return repo.findById(employeeId).orElse(withId);
    }

    // ── Pattern 2: Soft Delete ────────────────────────────────────────

    @Transactional
    @CacheEvict(value = {"employeePage", "deptSummary"}, allEntries = true)
    public void deactivate(String employeeId) {
        boolean found = repo.deactivate(employeeId);
        if (!found) throw new EmployeeNotFoundException(employeeId);

        events.publishEvent(
            new EmployeeUpdatedEvent(employeeId, "DEACTIVATE"));
        log.info("Deactivated employee: {}", employeeId);
    }

    // ── Pattern 3: Transfer — multi-table @Transactional ─────────────

    @Transactional
    @CacheEvict(value = {"employeePage", "deptSummary",
                          "locationHeadcount"}, allEntries = true)
    public void transfer(TransferRequest request) {
        log.info("Transfer: {} → {} → {}",
            request.employeeId(),
            request.fromDepartment(),
            request.toDepartment());

        repo.transfer(request.employeeId(),
                      request.fromDepartment(),
                      request.toDepartment());

        events.publishEvent(
            new EmployeeUpdatedEvent(request.employeeId(), "TRANSFER"));
    }

    // ── Pattern 4: Batch Upload ───────────────────────────────────────

    @CacheEvict(value = {"employeePage", "deptSummary"}, allEntries = true)
    public BatchUploadResult batchUpload(BatchUploadRequest request) {
        log.info("Batch upload: {} records [ref={}]",
            request.employees().size(), request.batchReference());

        List<String>      errors = new ArrayList<>();
        List<EmployeeDTO> valid  = new ArrayList<>();
        int rejected = 0;

        for (EmployeeDTO emp : request.employees()) {
            if (emp.firstName() == null || emp.salary() == null) {
                errors.add("Invalid record — missing required fields: "
                    + emp.employeeId());
                rejected++;
                continue;
            }

            EmployeeDTO withId = emp.employeeId() == null
                ? new EmployeeDTO(UUID.randomUUID().toString(),
                    emp.firstName(), emp.lastName(),
                    emp.resolvedFullName(), emp.department(),
                    emp.jobTitle(), emp.salary(), null,
                    emp.hireDate(), emp.location(), "ACTIVE", null)
                : emp;

            valid.add(withId);
        }

        if (!valid.isEmpty()) {
            repo.batchUpsert(valid);
        }

        log.info("Batch complete — processed: {}, rejected: {}",
            valid.size(), rejected);

        return new BatchUploadResult(
            request.employees().size(),
            valid.size(),
            0,
            rejected,
            request.batchReference(),
            errors
        );
    }
}
