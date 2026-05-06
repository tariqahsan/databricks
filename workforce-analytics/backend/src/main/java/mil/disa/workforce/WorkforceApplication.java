package mil.disa.workforce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.retry.annotation.EnableRetry;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableCaching
@EnableRetry
@EnableAsync
public class WorkforceApplication {

    public static void main(String[] args) {
        // Enable virtual threads (JDK 21)
        System.setProperty("spring.threads.virtual.enabled", "true");
        SpringApplication.run(WorkforceApplication.class, args);
    }
}
