package mil.disa.workforce.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class DatabricksConfig {

    @Value("${databricks.host}")
    private String databricksHost;

    @Value("${databricks.token}")
    private String databricksToken;

    /**
     * RestClient for Databricks REST API calls (job mgmt, pipeline triggers).
     * Separate from JDBC datasource — handles workflow orchestration.
     */
    @Bean
    public RestClient databricksRestClient() {
        return RestClient.builder()
            .baseUrl(databricksHost)
            .defaultHeader("Authorization", "Bearer " + databricksToken)
            .defaultHeader("Content-Type",  "application/json")
            .defaultHeader("Accept",        "application/json")
            .build();
    }

    /**
     * CORS — allow Angular dev server and deployed frontend.
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins(
                        "http://localhost:4200",
                        "http://localhost:4300"
                    )
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true)
                    .maxAge(3600);
            }
        };
    }
}
