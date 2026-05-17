package mil.disa.oe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.retry.annotation.EnableRetry;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableCaching
@EnableRetry
@EnableAsync
@EnableScheduling
public class OeDataIntelligenceApplication {

    public static void main(String[] args) {
        // JDK 21 virtual threads
        System.setProperty("spring.threads.virtual.enabled", "true");
        SpringApplication.run(OeDataIntelligenceApplication.class, args);
    }
}
