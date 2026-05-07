package mil.disa.oe.service;

import mil.disa.oe.dto.*;
import mil.disa.oe.repository.NetworkPerformanceRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class NetworkPerformanceService {
    private final NetworkPerformanceRepository repo;
    public NetworkPerformanceService(NetworkPerformanceRepository repo) { this.repo = repo; }

    @Cacheable("networkPerformance")
    @Transactional(readOnly = true)
    public NetworkKpis getKpis() { return repo.getKpis(); }

    @Transactional(readOnly = true)
    public List<NetworkPerformanceSummary> getBySegment(String type) {
        return repo.getBySegment(type);
    }

    @Transactional(readOnly = true)
    public List<DnsMetrics> getDnsMetrics() { return repo.getDnsMetrics(); }
}
