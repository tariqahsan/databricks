package mil.disa.workforce.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCache;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Configuration
public class CacheConfig {

    /**
     * Fine-grained cache config per cache name.
     * Databricks SQL Warehouse has cold-start latency —
     * caching Gold layer results is critical for UI responsiveness.
     */
    @Bean
    public CacheManager cacheManager() {
        SimpleCacheManager manager = new SimpleCacheManager();
        manager.setCaches(List.of(

            // Dashboard Gold tables — refresh every 5 min
            build("deptSummary",      300, 500),
            build("locationHeadcount", 300, 100),
            build("salaryBands",       600, 50),

            // Employee pages — shorter TTL (data changes more often)
            build("employeePage",      60,  200),

            // Pipeline status — very short TTL (near-real-time)
            build("pipelineStatus",    10,  50)
        ));
        return manager;
    }

    private CaffeineCache build(String name, long ttlSeconds, long maxSize) {
        return new CaffeineCache(name,
            Caffeine.newBuilder()
                .expireAfterWrite(ttlSeconds, TimeUnit.SECONDS)
                .maximumSize(maxSize)
                .recordStats()
                .build()
        );
    }
}
