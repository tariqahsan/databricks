package mil.disa.workforce.repository;

import mil.disa.workforce.dto.EmployeeDTO;
import mil.disa.workforce.dto.PagedResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class EmployeeRepository {

    private static final Logger log =
        LoggerFactory.getLogger(EmployeeRepository.class);

    private final NamedParameterJdbcTemplate jdbc;

    public EmployeeRepository(NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    // ── RowMapper ────────────────────────────────────────────────────

    private static final RowMapper<EmployeeDTO> MAPPER =
        new RowMapper<>() {
            @Override
            public EmployeeDTO mapRow(ResultSet rs, int row)
                    throws SQLException {
                return new EmployeeDTO(
                    rs.getString("employee_id"),
                    rs.getString("first_name"),
                    rs.getString("last_name"),
                    rs.getString("full_name"),
                    rs.getString("department"),
                    rs.getString("job_title"),
                    rs.getBigDecimal("salary"),
                    rs.getString("salary_band"),
                    rs.getDate("hire_date") != null
                        ? rs.getDate("hire_date").toLocalDate() : null,
                    rs.getString("location"),
                    rs.getString("status"),
                    rs.getTimestamp("_processed_at") != null
                        ? rs.getTimestamp("_processed_at").toLocalDateTime()
                        : null
                );
            }
        };

    // ── READS ────────────────────────────────────────────────────────

    @Retryable(retryFor = Exception.class, maxAttempts = 3,
               backoff = @Backoff(delay = 2000, multiplier = 2.0))
    public PagedResponse<EmployeeDTO> findByDepartment(String dept,
                                                        int page,
                                                        int size) {
        String countSql = """
            SELECT COUNT(*) FROM silver.employees
            WHERE department = :dept AND status = 'ACTIVE'
            """;

        String dataSql = """
            SELECT employee_id, first_name, last_name, full_name,
                   department, job_title, salary, salary_band,
                   hire_date, location, status, _processed_at
            FROM   silver.employees
            WHERE  department = :dept AND status = 'ACTIVE'
            ORDER  BY salary DESC
            LIMIT  :size OFFSET :offset
            """;

        var params = new MapSqlParameterSource()
            .addValue("dept",   dept)
            .addValue("size",   size)
            .addValue("offset", page * size);

        Long total = jdbc.queryForObject(countSql, params, Long.class);
        List<EmployeeDTO> content = jdbc.query(dataSql, params, MAPPER);

        int totalPages = (int) Math.ceil((double) total / size);
        return new PagedResponse<>(content, page, size, total,
                                   totalPages, page >= totalPages - 1);
    }

    @Retryable(retryFor = Exception.class, maxAttempts = 3,
               backoff = @Backoff(delay = 2000, multiplier = 2.0))
    public Optional<EmployeeDTO> findById(String employeeId) {
        String sql = """
            SELECT employee_id, first_name, last_name, full_name,
                   department, job_title, salary, salary_band,
                   hire_date, location, status, _processed_at
            FROM   silver.employees
            WHERE  employee_id = :id
            """;
        List<EmployeeDTO> results = jdbc.query(sql,
            new MapSqlParameterSource("id", employeeId), MAPPER);
        return results.isEmpty() ? Optional.empty()
                                 : Optional.of(results.getFirst());
    }

    @Retryable(retryFor = Exception.class, maxAttempts = 3,
               backoff = @Backoff(delay = 2000, multiplier = 2.0))
    public List<EmployeeDTO> search(String keyword, String dept,
                                     String location, String band) {
        String sql = """
            SELECT employee_id, first_name, last_name, full_name,
                   department, job_title, salary, salary_band,
                   hire_date, location, status, _processed_at
            FROM   silver.employees
            WHERE  status = 'ACTIVE'
              AND  (:keyword  IS NULL
                    OR full_name ILIKE '%' || :keyword || '%'
                    OR job_title ILIKE '%' || :keyword || '%')
              AND  (:dept     IS NULL OR department  = :dept)
              AND  (:location IS NULL OR location    = :location)
              AND  (:band     IS NULL OR salary_band = :band)
            ORDER  BY full_name
            LIMIT  500
            """;

        var params = new MapSqlParameterSource()
            .addValue("keyword",  keyword)
            .addValue("dept",     dept)
            .addValue("location", location)
            .addValue("band",     band);

        return jdbc.query(sql, params, MAPPER);
    }

    // ── WRITES — Pattern 1: MERGE (upsert) ───────────────────────────

    @Transactional
    public void upsert(EmployeeDTO dto) {
        log.info("MERGE employee: {}", dto.employeeId());

        String sql = """
            MERGE INTO silver.employees AS target
            USING (
                SELECT
                    :employeeId  AS employee_id,
                    :firstName   AS first_name,
                    :lastName    AS last_name,
                    :fullName    AS full_name,
                    :department  AS department,
                    :jobTitle    AS job_title,
                    :salary      AS salary,
                    :salaryBand  AS salary_band,
                    CAST(:hireDate AS DATE) AS hire_date,
                    :location    AS location,
                    :status      AS status,
                    current_timestamp() AS _processed_at
            ) AS source
            ON target.employee_id = source.employee_id

            WHEN MATCHED THEN UPDATE SET
                target.first_name    = source.first_name,
                target.last_name     = source.last_name,
                target.full_name     = source.full_name,
                target.job_title     = source.job_title,
                target.salary        = source.salary,
                target.salary_band   = source.salary_band,
                target.location      = source.location,
                target.status        = source.status,
                target._processed_at = source._processed_at

            WHEN NOT MATCHED THEN INSERT (
                employee_id, first_name, last_name, full_name,
                department, job_title, salary, salary_band,
                hire_date, location, status, _processed_at
            ) VALUES (
                source.employee_id, source.first_name, source.last_name,
                source.full_name,   source.department,  source.job_title,
                source.salary,      source.salary_band, source.hire_date,
                source.location,    source.status,       source._processed_at
            )
            """;

        jdbc.update(sql, buildParams(dto));
        log.info("MERGE complete: {}", dto.employeeId());
    }

    // ── WRITES — Pattern 2: Soft Delete ──────────────────────────────

    @Transactional
    public boolean deactivate(String employeeId) {
        log.info("Deactivating employee: {}", employeeId);

        String sql = """
            MERGE INTO silver.employees AS target
            USING (SELECT :id AS employee_id) AS source
            ON target.employee_id = source.employee_id
            WHEN MATCHED AND target.status = 'ACTIVE'
            THEN UPDATE SET
                target.status        = 'INACTIVE',
                target._processed_at = current_timestamp()
            """;

        int rows = jdbc.update(sql,
            new MapSqlParameterSource("id", employeeId));
        return rows > 0;
    }

    // ── WRITES — Pattern 3: Department Transfer ───────────────────────

    @Transactional
    public void transfer(String employeeId,
                         String fromDept,
                         String toDept) {
        log.info("Transferring {} from {} to {}",
            employeeId, fromDept, toDept);

        String updateSql = """
            UPDATE silver.employees
            SET    department    = :toDept,
                   _processed_at = current_timestamp()
            WHERE  employee_id   = :id
              AND  department    = :fromDept
              AND  status        = 'ACTIVE'
            """;

        jdbc.update(updateSql, new MapSqlParameterSource()
            .addValue("id",       employeeId)
            .addValue("toDept",   toDept)
            .addValue("fromDept", fromDept));

        String auditSql = """
            INSERT INTO silver.department_transfers
                (employee_id, from_dept, to_dept,
                 transfer_date, _processed_at)
            VALUES
                (:id, :fromDept, :toDept,
                 current_date(), current_timestamp())
            """;

        jdbc.update(auditSql, new MapSqlParameterSource()
            .addValue("id",       employeeId)
            .addValue("fromDept", fromDept)
            .addValue("toDept",   toDept));
    }

    // ── WRITES — Pattern 4: Batch Upsert ─────────────────────────────

    @Transactional
    public void batchUpsert(List<EmployeeDTO> employees) {
        log.info("Batch upserting {} employees", employees.size());

        String sql = """
            MERGE INTO silver.employees AS target
            USING (
                SELECT
                    :employeeId  AS employee_id,
                    :firstName   AS first_name,
                    :lastName    AS last_name,
                    :fullName    AS full_name,
                    :department  AS department,
                    :jobTitle    AS job_title,
                    :salary      AS salary,
                    :salaryBand  AS salary_band,
                    CAST(:hireDate AS DATE) AS hire_date,
                    :location    AS location,
                    :status      AS status,
                    current_timestamp() AS _processed_at
            ) AS source
            ON target.employee_id = source.employee_id
            WHEN MATCHED THEN UPDATE SET
                target.job_title     = source.job_title,
                target.salary        = source.salary,
                target.salary_band   = source.salary_band,
                target.status        = source.status,
                target._processed_at = source._processed_at
            WHEN NOT MATCHED THEN INSERT *
            """;

        employees.forEach(emp -> jdbc.update(sql, buildParams(emp)));
        log.info("Batch upsert complete: {} records", employees.size());
    }

    // ── HELPERS ──────────────────────────────────────────────────────

    private MapSqlParameterSource buildParams(EmployeeDTO dto) {
        return new MapSqlParameterSource()
            .addValue("employeeId",  dto.employeeId())
            .addValue("firstName",   dto.firstName())
            .addValue("lastName",    dto.lastName())
            .addValue("fullName",    dto.resolvedFullName())
            .addValue("department",  dto.department())
            .addValue("jobTitle",    dto.jobTitle())
            .addValue("salary",      dto.salary())
            .addValue("salaryBand",  resolveBand(dto.salary()))
            .addValue("hireDate",    dto.hireDate() != null
                                         ? dto.hireDate().toString() : null)
            .addValue("location",    dto.location())
            .addValue("status",      dto.status() != null
                                         ? dto.status() : "ACTIVE");
    }

    private String resolveBand(BigDecimal salary) {
        if (salary == null) return "BAND_1_ENTRY";
        int s = salary.intValue();
        if (s < 50_000)  return "BAND_1_ENTRY";
        if (s < 80_000)  return "BAND_2_MID";
        if (s < 120_000) return "BAND_3_SENIOR";
        if (s < 180_000) return "BAND_4_LEAD";
        return "BAND_5_EXEC";
    }
}
