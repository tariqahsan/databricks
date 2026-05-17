package mil.disa.oe.dto;
import java.math.BigDecimal;
import java.util.List;
public record VersionSprawlKpis(
    Integer totalSoftwareProducts, Integer productsWithSprawl,
    BigDecimal avgVersionsPerProduct, Integer devicesOnLatestOs,
    Integer devicesOnUnsupportedOs, Integer appsWithVulnerabilities,
    List<SprawlByProduct> worstSprawl,
    List<VersionDistribution> osVersions,
    List<VersionDistribution> topAppVersions
) {}
