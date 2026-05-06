package mil.disa.workforce.service;

import mil.disa.workforce.dto.DeptSummaryDTO;
import mil.disa.workforce.dto.LocationHeadcountDTO;
import mil.disa.workforce.dto.SalaryBandDTO;
import mil.disa.workforce.repository.DashboardRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DashboardService {

    private final DashboardRepository repo;

    public DashboardService(DashboardRepository repo) {
        this.repo = repo;
    }

    @Cacheable("deptSummary")
    @Transactional(readOnly = true)
    public List<DeptSummaryDTO> getDeptSummary() {
        return repo.getDeptSalarySummary();
    }

    @Cacheable("locationHeadcount")
    @Transactional(readOnly = true)
    public List<LocationHeadcountDTO> getLocationHeadcount() {
        return repo.getLocationHeadcount();
    }

    @Cacheable("salaryBands")
    @Transactional(readOnly = true)
    public List<SalaryBandDTO> getSalaryBands() {
        return repo.getSalaryBandDistribution();
    }
}
