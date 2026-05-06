package mil.disa.workforce.repository;

import mil.disa.workforce.dto.DeptSummaryDTO;
import mil.disa.workforce.dto.LocationHeadcountDTO;
import mil.disa.workforce.dto.SalaryBandDTO;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;

@Repository
public class DashboardRepository {

    private final NamedParameterJdbcTemplate jdbc;

    public DashboardRepository(NamedParameterJdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @Retryable(retryFor = Exception.class, maxAttempts = 3,
               backoff = @Backoff(delay = 2000, multiplier = 2.0))
    public List<DeptSummaryDTO> getDeptSalarySummary() {
        String sql = """
            SELECT department, dept_name, division,
                   headcount, avg_salary, total_payroll,
                   max_salary, min_salary, median_salary,
                   avg_salary_pct_of_max
            FROM   gold.dept_salary_summary
            ORDER  BY total_payroll DESC
            """;

        return jdbc.query(sql, Collections.emptyMap(), (rs, row) ->
            new DeptSummaryDTO(
                rs.getString("department"),
                rs.getString("dept_name"),
                rs.getString("division"),
                rs.getInt("headcount"),
                rs.getBigDecimal("avg_salary"),
                rs.getBigDecimal("total_payroll"),
                rs.getBigDecimal("max_salary"),
                rs.getBigDecimal("min_salary"),
                rs.getBigDecimal("median_salary"),
                rs.getDouble("avg_salary_pct_of_max")
            )
        );
    }

    @Retryable(retryFor = Exception.class, maxAttempts = 3,
               backoff = @Backoff(delay = 2000, multiplier = 2.0))
    public List<LocationHeadcountDTO> getLocationHeadcount() {
        String sql = """
            SELECT location, headcount, avg_salary, dept_count
            FROM   gold.location_headcount
            ORDER  BY headcount DESC
            """;

        return jdbc.query(sql, Collections.emptyMap(), (rs, row) ->
            new LocationHeadcountDTO(
                rs.getString("location"),
                rs.getInt("headcount"),
                rs.getBigDecimal("avg_salary"),
                rs.getInt("dept_count")
            )
        );
    }

    @Retryable(retryFor = Exception.class, maxAttempts = 3,
               backoff = @Backoff(delay = 2000, multiplier = 2.0))
    public List<SalaryBandDTO> getSalaryBandDistribution() {
        String sql = """
            SELECT salary_band, employee_count, avg_salary, total_payroll
            FROM   gold.salary_band_distribution
            ORDER  BY salary_band
            """;

        return jdbc.query(sql, Collections.emptyMap(), (rs, row) ->
            new SalaryBandDTO(
                rs.getString("salary_band"),
                rs.getInt("employee_count"),
                rs.getBigDecimal("avg_salary"),
                rs.getBigDecimal("total_payroll")
            )
        );
    }
}
