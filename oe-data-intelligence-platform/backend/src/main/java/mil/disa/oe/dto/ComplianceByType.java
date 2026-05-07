package mil.disa.oe.dto;
import java.math.BigDecimal;
public record ComplianceByType(
    String deviceType, Integer total,
    Integer compliant, Integer nonCompliant, BigDecimal complianceRate
) {}
