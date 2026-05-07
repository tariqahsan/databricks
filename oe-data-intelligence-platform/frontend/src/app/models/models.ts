// ── api.model.ts ─────────────────────────────────────────────────────
export interface ApiResponse<T> {
  success:   boolean;
  message:   string;
  data:      T;
  timestamp: string;
}

export interface PagedResponse<T> {
  content:       T[];
  page:          number;
  size:          number;
  totalElements: number;
  totalPages:    number;
  last:          boolean;
}

// ── app-health.model.ts ───────────────────────────────────────────────
export interface AppHealthKpis {
  totalApplications:  number;
  healthyApps:        number;
  degradedApps:       number;
  criticalApps:       number;
  avgExperienceScore: number;
  avgResponseTimeMs:  number;
  totalActiveUsers:   number;
  topDegradedApps:    DegradedApp[];
}

export interface AppHealthSummary {
  applicationName:   string;
  appCategory:       string;
  experienceScore:   number;
  avgResponseTimeMs: number;
  p95ResponseTimeMs: number;
  crashRate:         number;
  errorRate:         number;
  activeUserCount:   number;
  healthStatus:      HealthStatus;
  trend:             string;
  lastUpdated:       string;
}

export interface DegradedApp {
  applicationName: string;
  severity:        string;
  experienceScore: number;
  degradationPct:  number;
  primaryCause:    string;
  affectedUsers:   number;
}

export interface AppHealthTrend {
  applicationName: string;
  timestamp:       string;
  experienceScore: number;
  responseTimeMs:  number;
  errorCount:      number;
}

// ── device-health.model.ts ────────────────────────────────────────────
export interface DeviceHealthKpis {
  totalDevices:        number;
  compliantDevices:    number;
  nonCompliantDevices: number;
  unknownDevices:      number;
  complianceRate:      number;
  avgHealthScore:      number;
  devicesNotCheckedIn: number;
  encryptedDevices:    number;
  complianceByType:    ComplianceByType[];
  osDistribution:      OsDistribution[];
}

export interface DeviceHealthSummary {
  deviceId:          string;
  deviceName:        string;
  deviceType:        string;
  osName:            string;
  osVersion:         string;
  complianceState:   string;
  healthScore:       number;
  lastCheckIn:       string;
  assignedUser:      string;
  location:          string;
  encryptionEnabled: boolean;
  managementAgent:   string;
}

export interface ComplianceByType {
  deviceType:     string;
  total:          number;
  compliant:      number;
  nonCompliant:   number;
  complianceRate: number;
}

export interface OsDistribution {
  osName:      string;
  osVersion:   string;
  deviceCount: number;
  isSupported: boolean;
  isLatest:    boolean;
}

// ── network.model.ts ──────────────────────────────────────────────────
export interface NetworkKpis {
  totalSegments:    number;
  healthySegments:  number;
  degradedSegments: number;
  criticalSegments: number;
  avgPacketLoss:    number;
  avgLatencyMs:     number;
  avgAvailability:  number;
  totalAnomalies:   number;
  topRootCauses:    PacketLossRootCause[];
  latencyTrend:     NetworkTrend[];
}

export interface PacketLossRootCause {
  segmentName:    string;
  rootCause:      string;
  packetLossRate: number;
  confidence:     number;
  affectedFlows:  number;
  recommendation: string;
  severity:       string;
}

export interface NetworkTrend {
  timestamp:            string;
  packetLossRate:       number;
  avgLatencyMs:         number;
  bandwidthUtilization: number;
}

export interface NetworkPerformanceSummary {
  segmentId:            string;
  segmentName:          string;
  segmentType:          string;
  location:             string;
  packetLossRate:       number;
  avgLatencyMs:         number;
  bandwidthUtilization: number;
  availabilityRate:     number;
  anomalyCount:         number;
  healthStatus:         HealthStatus;
}

export interface DnsMetrics {
  server:          string;
  totalQueries:    number;
  failedQueries:   number;
  failureRate:     number;
  avgResponseMs:   number;
  nxdomainCount:   number;
  timeoutCount:    number;
}

// ── issues.model.ts ───────────────────────────────────────────────────
export interface IssuesKpis {
  openP1Issues:    number;
  openP2Issues:    number;
  openP3Issues:    number;
  openP4Issues:    number;
  totalOpenIssues: number;
  resolvedToday:   number;
  avgMttrHours:    number;
  slaBreachRate:   number;
  byCategory:      IssuesByCategory[];
  trending:        TrendingIssue[];
  criticalOpen:    TopIssueSummary[];
}

export interface TopIssueSummary {
  issueId:         string;
  title:           string;
  category:        string;
  severity:        string;
  status:          string;
  source:          string;
  affectedDevices: number;
  affectedUsers:   number;
  openedAt:        string;
  mttrMinutes:     number;
  assignedTeam:    string;
  isRecurring:     boolean;
  occurrenceCount: number;
}

export interface IssuesByCategory {
  category:      string;
  openCount:     number;
  resolvedCount: number;
  avgMttrHours:  number;
}

export interface TrendingIssue {
  pattern:           string;
  occurrences:       number;
  affectedComponent: string;
  trend:             string;
}

// ── version-sprawl.model.ts ───────────────────────────────────────────
export interface VersionSprawlKpis {
  totalSoftwareProducts:   number;
  productsWithSprawl:      number;
  avgVersionsPerProduct:   number;
  devicesOnLatestOs:       number;
  devicesOnUnsupportedOs:  number;
  appsWithVulnerabilities: number;
  worstSprawl:             SprawlByProduct[];
  osVersions:              VersionDistribution[];
  topAppVersions:          VersionDistribution[];
}

export interface SprawlByProduct {
  productName:     string;
  versionCount:    number;
  deviceCount:     number;
  latestVersion:   string;
  percentOnLatest: number;
}

export interface VersionDistribution {
  name:        string;
  version:     string;
  count:       number;
  percentage:  number;
  isSupported: boolean;
}

// ── data-source.model.ts ──────────────────────────────────────────────
export interface DataSourceStatus {
  sourceName:        string;
  sourceType:        string;
  status:            'ACTIVE' | 'DEGRADED' | 'FAILED' | 'UNKNOWN';
  lastIngestionAt:   string;
  nextScheduledAt:   string;
  recordsLastBatch:  number;
  totalRecordsToday: number;
  dataQualityScore:  number;
  latencyMs:         number;
  bronzeTable:       string;
  silverTable:       string;
  errorMessage:      string | null;
}

export interface IngestionPipelineRun {
  runId:            number;
  pipelineName:     string;
  status:           string;
  startedAt:        string;
  recordsProcessed: number;
  triggeredBy:      string;
}

// ── platform.model.ts ─────────────────────────────────────────────────
export interface PlatformSummary {
  appHealth:          AppHealthKpis;
  deviceHealth:       DeviceHealthKpis;
  networkPerformance: NetworkKpis;
  topIssues:          IssuesKpis;
  versionSprawl:      VersionSprawlKpis;
  dataSourceStatuses: DataSourceStatus[];
  asOfTimestamp:      string;
}

// ── shared ────────────────────────────────────────────────────────────
export type HealthStatus = 'HEALTHY' | 'DEGRADED' | 'CRITICAL' | 'UNKNOWN';
