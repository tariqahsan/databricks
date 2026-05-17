package mil.disa.oe.dto;
import java.math.BigDecimal;
public record SprawlByProduct(
    String productName, Integer versionCount, Integer deviceCount,
    String latestVersion, BigDecimal percentOnLatest
) {}
