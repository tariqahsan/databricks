package mil.disa.oe.service;

import mil.disa.oe.dto.IssuesKpis;
import mil.disa.oe.repository.TopIssuesRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TopIssuesService {
    private final TopIssuesRepository repo;
    public TopIssuesService(TopIssuesRepository repo) { this.repo = repo; }

    @Cacheable("topIssues")
    @Transactional(readOnly = true)
    public IssuesKpis getKpis() { return repo.getKpis(); }
}
