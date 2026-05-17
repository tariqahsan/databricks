package mil.disa.oe.service;

import mil.disa.oe.dto.*;
import mil.disa.oe.repository.DeviceHealthRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class DeviceHealthService {
    private final DeviceHealthRepository repo;
    public DeviceHealthService(DeviceHealthRepository repo) { this.repo = repo; }

    @Cacheable("deviceHealth")
    @Transactional(readOnly = true)
    public DeviceHealthKpis getKpis() { return repo.getKpis(); }

    @Transactional(readOnly = true)
    public List<DeviceHealthSummary> getAll(String filter, int page, int size) {
        return repo.getAll(filter, page, size);
    }
}
