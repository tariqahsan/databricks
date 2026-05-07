package mil.disa.oe.service;

import mil.disa.oe.dto.*;
import mil.disa.oe.repository.AppHealthRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class AppHealthService {
    private final AppHealthRepository repo;
    public AppHealthService(AppHealthRepository repo) { this.repo = repo; }

    @Cacheable("appHealth")
    @Transactional(readOnly = true)
    public AppHealthKpis getKpis() { return repo.getKpis(); }

    @Transactional(readOnly = true)
    public List<AppHealthSummary> getAll() { return repo.getAll(); }

    @Transactional(readOnly = true)
    public List<AppHealthTrend> getTrend(String appName, int hours) {
        return repo.getTrend(appName, hours);
    }
}
