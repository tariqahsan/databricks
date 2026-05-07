package mil.disa.oe.service;

import mil.disa.oe.dto.VersionSprawlKpis;
import mil.disa.oe.repository.VersionSprawlRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class VersionSprawlService {
    private final VersionSprawlRepository repo;
    public VersionSprawlService(VersionSprawlRepository repo) { this.repo = repo; }

    @Cacheable("versionSprawl")
    @Transactional(readOnly = true)
    public VersionSprawlKpis getKpis() { return repo.getKpis(); }
}
