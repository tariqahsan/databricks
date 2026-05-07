package mil.disa.oe.config;

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

    @Bean
    public CacheManager cacheManager() {
        SimpleCacheManager mgr = new SimpleCacheManager();
        mgr.setCaches(List.of(
            // Gold layer dashboards — 5 min TTL
            build("appHealth",          300, 200),
            build("deviceHealth",       300, 200),
            build("networkPerformance", 300, 200),
            build("topIssues",          120, 200),  // shorter — more volatile
            build("versionSprawl",      600, 100),  // longer — slow changing
            build("ingestionStatus",     60, 50),   // very short — near real-time
            build("platformSummary",    300, 50)
        ));
        return mgr;
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
