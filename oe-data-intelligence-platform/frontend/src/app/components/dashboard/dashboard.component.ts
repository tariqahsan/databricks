import { Component, OnInit, inject }         from '@angular/core';
import { CommonModule }                        from '@angular/common';
import { RouterModule }                        from '@angular/router';
import { MatCardModule }                       from '@angular/material/card';
import { MatIconModule }                       from '@angular/material/icon';
import { MatButtonModule }                     from '@angular/material/button';
import { MatProgressSpinnerModule }            from '@angular/material/progress-spinner';
import { MatProgressBarModule }                from '@angular/material/progress-bar';
import { MatChipsModule }                      from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule }      from '@angular/material/snack-bar';
import { BaseChartDirective }                  from 'ng2-charts';
import { ChartData, ChartOptions }             from 'chart.js';
import { PlatformService, DataSourcesService } from '../../services/services';
import { PlatformSummary, DataSourceStatus,
         HealthStatus }                        from '../../models/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    MatCardModule, MatIconModule, MatButtonModule,
    MatProgressSpinnerModule, MatProgressBarModule,
    MatChipsModule, MatSnackBarModule, BaseChartDirective
  ],
  template: `
<div class="dashboard">

  <!-- ── Header ─────────────────────────────────────────────── -->
  <div class="page-header">
    <div>
      <h1><mat-icon>hub</mat-icon> OE Data Intelligence Platform</h1>
      <p class="subtitle">
        Operations Engineering — Real-time intelligence from
        Aternity · NetScout · Intune · Infoblox · Salesforce · ScienceLogic
      </p>
    </div>
    <div class="header-actions">
      <button mat-stroked-button (click)="refresh()" [disabled]="loading">
        <mat-icon>refresh</mat-icon> Refresh
      </button>
      <button mat-raised-button color="primary" (click)="triggerIngestion()">
        <mat-icon>play_arrow</mat-icon> Run Ingestion
      </button>
    </div>
  </div>

  <!-- Loading -->
  <mat-progress-bar *ngIf="loading" mode="indeterminate" color="primary">
  </mat-progress-bar>

  <div *ngIf="!loading && summary">

    <!-- ── Data Source Status Bar ─────────────────────────── -->
    <div class="source-bar">
      <span class="source-label">Data Sources:</span>
      <span *ngFor="let s of summary.dataSourceStatuses"
            class="source-chip"
            [class]="'chip-' + s.status.toLowerCase()"
            [title]="s.errorMessage || s.lastIngestionAt">
        <mat-icon class="chip-icon">
          {{ sourceIcon(s.sourceType) }}
        </mat-icon>
        {{ s.sourceName }}
      </span>
    </div>

    <!-- ── Product KPI Grid ───────────────────────────────── -->
    <div class="kpi-grid">

      <!-- App Health -->
      <mat-card class="product-card"
                [class]="healthClass(getAppHealthStatus())"
                routerLink="/app-health">
        <div class="product-icon-row">
          <mat-icon class="product-icon">apps</mat-icon>
          <span class="product-badge"
                [class]="'badge-' + getAppHealthStatus().toLowerCase()">
            {{ getAppHealthStatus() }}
          </span>
        </div>
        <div class="product-title">App Health</div>
        <div class="product-source">Aternity</div>
        <div class="kpi-row">
          <div class="kpi-item">
            <div class="kpi-val green">{{ summary.appHealth.healthyApps }}</div>
            <div class="kpi-lbl">Healthy</div>
          </div>
          <div class="kpi-item">
            <div class="kpi-val orange">{{ summary.appHealth.degradedApps }}</div>
            <div class="kpi-lbl">Degraded</div>
          </div>
          <div class="kpi-item">
            <div class="kpi-val red">{{ summary.appHealth.criticalApps }}</div>
            <div class="kpi-lbl">Critical</div>
          </div>
        </div>
        <div class="score-row">
          <span>Avg UX Score</span>
          <strong>{{ summary.appHealth.avgExperienceScore | number:'1.0-0' }}</strong>
        </div>
        <mat-progress-bar mode="determinate"
          [value]="summary.appHealth.avgExperienceScore"
          [color]="scoreColor(summary.appHealth.avgExperienceScore)">
        </mat-progress-bar>
      </mat-card>

      <!-- Device Health -->
      <mat-card class="product-card"
                [class]="healthClass(getDeviceHealthStatus())"
                routerLink="/device-health">
        <div class="product-icon-row">
          <mat-icon class="product-icon">devices</mat-icon>
          <span class="product-badge"
                [class]="'badge-' + getDeviceHealthStatus().toLowerCase()">
            {{ getDeviceHealthStatus() }}
          </span>
        </div>
        <div class="product-title">Device Health</div>
        <div class="product-source">Microsoft Intune</div>
        <div class="kpi-row">
          <div class="kpi-item">
            <div class="kpi-val green">{{ summary.deviceHealth.compliantDevices }}</div>
            <div class="kpi-lbl">Compliant</div>
          </div>
          <div class="kpi-item">
            <div class="kpi-val red">{{ summary.deviceHealth.nonCompliantDevices }}</div>
            <div class="kpi-lbl">Non-Compliant</div>
          </div>
          <div class="kpi-item">
            <div class="kpi-val gray">{{ summary.deviceHealth.unknownDevices }}</div>
            <div class="kpi-lbl">Unknown</div>
          </div>
        </div>
        <div class="score-row">
          <span>Compliance Rate</span>
          <strong>{{ summary.deviceHealth.complianceRate | number:'1.0-1' }}%</strong>
        </div>
        <mat-progress-bar mode="determinate"
          [value]="summary.deviceHealth.complianceRate"
          [color]="scoreColor(summary.deviceHealth.complianceRate)">
        </mat-progress-bar>
      </mat-card>

      <!-- Network Performance -->
      <mat-card class="product-card"
                [class]="healthClass(getNetworkStatus())"
                routerLink="/network-performance">
        <div class="product-icon-row">
          <mat-icon class="product-icon">network_check</mat-icon>
          <span class="product-badge"
                [class]="'badge-' + getNetworkStatus().toLowerCase()">
            {{ getNetworkStatus() }}
          </span>
        </div>
        <div class="product-title">Network Performance</div>
        <div class="product-source">NetScout · Infoblox</div>
        <div class="kpi-row">
          <div class="kpi-item">
            <div class="kpi-val"
                 [class]="summary.networkPerformance.avgPacketLoss > 1 ? 'red' : 'green'">
              {{ summary.networkPerformance.avgPacketLoss | number:'1.2-2' }}%
            </div>
            <div class="kpi-lbl">Packet Loss</div>
          </div>
          <div class="kpi-item">
            <div class="kpi-val">
              {{ summary.networkPerformance.avgLatencyMs | number:'1.0-0' }}ms
            </div>
            <div class="kpi-lbl">Avg Latency</div>
          </div>
          <div class="kpi-item">
            <div class="kpi-val red">
              {{ summary.networkPerformance.totalAnomalies }}
            </div>
            <div class="kpi-lbl">Anomalies</div>
          </div>
        </div>
        <div class="score-row">
          <span>Availability</span>
          <strong>{{ summary.networkPerformance.avgAvailability | number:'1.2-2' }}%</strong>
        </div>
        <mat-progress-bar mode="determinate"
          [value]="summary.networkPerformance.avgAvailability"
          color="primary">
        </mat-progress-bar>
      </mat-card>

      <!-- Top Issues -->
      <mat-card class="product-card"
                [class]="summary.topIssues.openP1Issues > 0 ? 'card-critical' : 'card-healthy'"
                routerLink="/top-issues">
        <div class="product-icon-row">
          <mat-icon class="product-icon">warning_amber</mat-icon>
          <span class="product-badge"
                [class]="summary.topIssues.openP1Issues > 0 ? 'badge-critical' : 'badge-healthy'">
            {{ summary.topIssues.openP1Issues > 0 ? 'P1 OPEN' : 'NORMAL' }}
          </span>
        </div>
        <div class="product-title">Top Issues</div>
        <div class="product-source">ScienceLogic · Salesforce</div>
        <div class="kpi-row">
          <div class="kpi-item">
            <div class="kpi-val red">{{ summary.topIssues.openP1Issues }}</div>
            <div class="kpi-lbl">P1</div>
          </div>
          <div class="kpi-item">
            <div class="kpi-val orange">{{ summary.topIssues.openP2Issues }}</div>
            <div class="kpi-lbl">P2</div>
          </div>
          <div class="kpi-item">
            <div class="kpi-val">{{ summary.topIssues.openP3Issues + summary.topIssues.openP4Issues }}</div>
            <div class="kpi-lbl">P3/P4</div>
          </div>
        </div>
        <div class="score-row">
          <span>Avg MTTR</span>
          <strong>{{ summary.topIssues.avgMttrHours | number:'1.1-1' }}h</strong>
        </div>
        <div class="score-row">
          <span>Resolved Today</span>
          <strong class="green">{{ summary.topIssues.resolvedToday }}</strong>
        </div>
      </mat-card>

      <!-- Version Sprawl -->
      <mat-card class="product-card"
                [class]="summary.versionSprawl.productsWithSprawl > 5 ? 'card-degraded' : 'card-healthy'"
                routerLink="/version-sprawl">
        <div class="product-icon-row">
          <mat-icon class="product-icon">account_tree</mat-icon>
          <span class="product-badge"
                [class]="summary.versionSprawl.productsWithSprawl > 5 ? 'badge-degraded' : 'badge-healthy'">
            {{ summary.versionSprawl.productsWithSprawl > 5 ? 'SPRAWL' : 'CONTROLLED' }}
          </span>
        </div>
        <div class="product-title">Version Sprawl</div>
        <div class="product-source">Intune · Aternity</div>
        <div class="kpi-row">
          <div class="kpi-item">
            <div class="kpi-val red">{{ summary.versionSprawl.productsWithSprawl }}</div>
            <div class="kpi-lbl">Sprawled</div>
          </div>
          <div class="kpi-item">
            <div class="kpi-val orange">{{ summary.versionSprawl.devicesOnUnsupportedOs }}</div>
            <div class="kpi-lbl">Unsupported OS</div>
          </div>
          <div class="kpi-item">
            <div class="kpi-val red">{{ summary.versionSprawl.appsWithVulnerabilities }}</div>
            <div class="kpi-lbl">CVEs</div>
          </div>
        </div>
        <div class="score-row">
          <span>Avg Versions/Product</span>
          <strong>{{ summary.versionSprawl.avgVersionsPerProduct | number:'1.1-1' }}</strong>
        </div>
      </mat-card>

    </div>

    <!-- ── Root Cause Panel ───────────────────────────────── -->
    <mat-card class="root-cause-card" *ngIf="summary.networkPerformance.topRootCauses?.length">
      <mat-card-header>
        <mat-icon mat-card-avatar color="warn">radar</mat-icon>
        <mat-card-title>Network Packet Loss — Root Cause Analysis</mat-card-title>
        <mat-card-subtitle>AI-assisted analysis from NetScout data</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <table class="rca-table">
          <thead>
            <tr>
              <th>Segment</th><th>Root Cause</th>
              <th>Packet Loss</th><th>Confidence</th>
              <th>Severity</th><th>Recommendation</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let r of summary.networkPerformance.topRootCauses">
              <td><strong>{{ r.segmentName }}</strong></td>
              <td>{{ r.rootCause }}</td>
              <td [class]="r.packetLossRate > 1 ? 'red' : 'green'">
                {{ r.packetLossRate | number:'1.2-2' }}%
              </td>
              <td>{{ r.confidence | number:'1.0-0' }}%</td>
              <td>
                <span class="sev-badge" [class]="'sev-' + r.severity.toLowerCase()">
                  {{ r.severity }}
                </span>
              </td>
              <td class="recommendation">{{ r.recommendation }}</td>
            </tr>
          </tbody>
        </table>
      </mat-card-content>
    </mat-card>

    <!-- ── Critical Issues Panel ─────────────────────────── -->
    <mat-card class="issues-card"
              *ngIf="summary.topIssues.criticalOpen?.length">
      <mat-card-header>
        <mat-icon mat-card-avatar color="warn">priority_high</mat-icon>
        <mat-card-title>Critical Open Issues (P1/P2)</mat-card-title>
        <mat-card-subtitle>ScienceLogic + Salesforce</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <div class="issue-item" *ngFor="let i of summary.topIssues.criticalOpen">
          <div class="issue-header">
            <span class="issue-sev" [class]="'sev-' + i.severity.toLowerCase()">
              {{ i.severity }}
            </span>
            <strong>{{ i.title }}</strong>
            <span class="issue-source">{{ i.source }}</span>
          </div>
          <div class="issue-meta">
            <span><mat-icon>category</mat-icon>{{ i.category }}</span>
            <span><mat-icon>devices</mat-icon>{{ i.affectedDevices }} devices</span>
            <span><mat-icon>people</mat-icon>{{ i.affectedUsers }} users</span>
            <span><mat-icon>group</mat-icon>{{ i.assignedTeam }}</span>
          </div>
        </div>
      </mat-card-content>
    </mat-card>

    <div class="footer-note">
      Last updated: {{ summary.asOfTimestamp | date:'medium' }} •
      Data from Databricks Gold layer (AWS GovCloud)
    </div>
  </div>

</div>
  `,
  styles: [`
    .dashboard     { padding:24px; max-width:1600px; margin:0 auto; }
    .page-header   { display:flex; justify-content:space-between;
                     align-items:flex-start; margin-bottom:20px; }
    .page-header h1{ display:flex; align-items:center; gap:8px;
                     font-size:1.6rem; margin:0; }
    .subtitle      { color:#546e7a; margin:4px 0 0; font-size:.9rem; }
    .header-actions{ display:flex; gap:8px; flex-shrink:0; }

    /* Data source chips */
    .source-bar    { display:flex; align-items:center; gap:8px;
                     flex-wrap:wrap; margin-bottom:20px;
                     background:#fff; padding:10px 16px;
                     border-radius:8px; box-shadow:0 1px 4px rgba(0,0,0,.1); }
    .source-label  { font-weight:600; color:#455a64; font-size:.85rem; }
    .source-chip   { display:flex; align-items:center; gap:4px;
                     padding:4px 10px; border-radius:16px;
                     font-size:.78rem; font-weight:500; cursor:default; }
    .chip-icon     { font-size:14px !important; width:14px !important; height:14px !important; }
    .chip-active   { background:#e8f5e9; color:#2e7d32; }
    .chip-degraded { background:#fff8e1; color:#f57f17; }
    .chip-failed   { background:#ffebee; color:#c62828; }
    .chip-unknown  { background:#f5f5f5; color:#666; }

    /* Product cards */
    .kpi-grid      { display:grid;
                     grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
                     gap:16px; margin-bottom:20px; }
    .product-card  { padding:20px; cursor:pointer; transition:transform .2s,
                     box-shadow .2s; }
    .product-card:hover { transform:translateY(-2px);
                          box-shadow:0 6px 20px rgba(0,0,0,.15) !important; }
    .card-healthy  { border-left:4px solid #4caf50; }
    .card-degraded { border-left:4px solid #ff9800; }
    .card-critical { border-left:4px solid #f44336; }

    .product-icon-row { display:flex; justify-content:space-between;
                        align-items:center; margin-bottom:8px; }
    .product-icon   { font-size:28px; width:28px; height:28px; color:#1565c0; }
    .product-title  { font-size:1.1rem; font-weight:700; margin-bottom:2px; }
    .product-source { font-size:.75rem; color:#78909c; margin-bottom:12px; }

    .product-badge  { padding:2px 8px; border-radius:10px;
                      font-size:.7rem; font-weight:700; }
    .badge-healthy  { background:#e8f5e9; color:#2e7d32; }
    .badge-degraded { background:#fff8e1; color:#f57f17; }
    .badge-critical { background:#ffebee; color:#c62828; }
    .badge-normal   { background:#e8f5e9; color:#2e7d32; }
    .badge-controlled{ background:#e8f5e9; color:#2e7d32; }
    .badge-sprawl   { background:#fff8e1; color:#f57f17; }
    .badge-p1\ open { background:#ffebee; color:#c62828; }

    .kpi-row       { display:flex; gap:8px; margin-bottom:12px; }
    .kpi-item      { flex:1; text-align:center;
                     background:#f5f7fa; border-radius:6px; padding:8px 4px; }
    .kpi-val       { font-size:1.3rem; font-weight:700; }
    .kpi-lbl       { font-size:.68rem; color:#78909c; margin-top:2px; }
    .green         { color:#2e7d32; }
    .orange        { color:#e65100; }
    .red           { color:#c62828; }
    .gray          { color:#78909c; }

    .score-row     { display:flex; justify-content:space-between;
                     font-size:.8rem; color:#546e7a; margin-bottom:6px; }

    /* RCA Table */
    .root-cause-card { margin-bottom:20px; }
    .rca-table     { width:100%; border-collapse:collapse; font-size:.85rem; }
    .rca-table th  { background:#e3f2fd; padding:8px 12px;
                     text-align:left; font-weight:600; }
    .rca-table td  { padding:8px 12px; border-bottom:1px solid #eee; }
    .sev-badge     { padding:2px 8px; border-radius:10px;
                     font-size:.72rem; font-weight:700; }
    .sev-critical  { background:#ffebee; color:#c62828; }
    .sev-high      { background:#fff8e1; color:#e65100; }
    .sev-medium    { background:#f3e5f5; color:#6a1b9a; }
    .sev-low       { background:#e8f5e9; color:#2e7d32; }
    .recommendation{ color:#1565c0; font-size:.8rem; }

    /* Issues panel */
    .issues-card   { margin-bottom:20px; }
    .issue-item    { padding:12px 0; border-bottom:1px solid #eee; }
    .issue-item:last-child { border-bottom:none; }
    .issue-header  { display:flex; align-items:center; gap:8px; margin-bottom:6px; }
    .issue-sev     { padding:2px 8px; border-radius:10px;
                     font-size:.72rem; font-weight:700; }
    .sev-p1        { background:#ffebee; color:#c62828; }
    .sev-p2        { background:#fff8e1; color:#e65100; }
    .issue-source  { margin-left:auto; font-size:.75rem;
                     color:#78909c; background:#f5f5f5;
                     padding:2px 8px; border-radius:10px; }
    .issue-meta    { display:flex; gap:16px; font-size:.78rem; color:#546e7a; }
    .issue-meta span{ display:flex; align-items:center; gap:3px; }
    .issue-meta mat-icon { font-size:14px; width:14px; height:14px; }

    .footer-note   { text-align:center; color:#90a4ae;
                     font-size:.78rem; padding:16px 0; }
  `]
})
export class DashboardComponent implements OnInit {

  private platformSvc  = inject(PlatformService);
  private dsSvc        = inject(DataSourcesService);
  private snack        = inject(MatSnackBar);

  summary: PlatformSummary | null = null;
  loading = true;

  ngOnInit(): void { this.loadDashboard(); }

  loadDashboard(): void {
    this.loading = true;
    this.platformSvc.getSummary().subscribe({
      next:  s  => { this.summary = s; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  refresh(): void { this.loadDashboard(); }

  triggerIngestion(): void {
    this.dsSvc.triggerIngestion('ALL', 'manual-dashboard').subscribe({
      next:  r => this.snack.open(
        `Ingestion triggered (Run #${r.runId})`, 'OK', { duration: 4000 }),
      error: () => this.snack.open('Failed to trigger ingestion',
        'Dismiss', { duration: 3000 })
    });
  }

  getAppHealthStatus(): HealthStatus {
    if (!this.summary) return 'UNKNOWN';
    const { criticalApps, degradedApps } = this.summary.appHealth;
    if (criticalApps > 0) return 'CRITICAL';
    if (degradedApps > 0) return 'DEGRADED';
    return 'HEALTHY';
  }

  getDeviceHealthStatus(): HealthStatus {
    if (!this.summary) return 'UNKNOWN';
    const rate = this.summary.deviceHealth.complianceRate;
    if (rate < 70) return 'CRITICAL';
    if (rate < 90) return 'DEGRADED';
    return 'HEALTHY';
  }

  getNetworkStatus(): HealthStatus {
    if (!this.summary) return 'UNKNOWN';
    const { criticalSegments, degradedSegments } = this.summary.networkPerformance;
    if (criticalSegments > 0) return 'CRITICAL';
    if (degradedSegments > 0) return 'DEGRADED';
    return 'HEALTHY';
  }

  healthClass(status: HealthStatus): string {
    return { HEALTHY:'card-healthy', DEGRADED:'card-degraded',
             CRITICAL:'card-critical', UNKNOWN:'card-healthy' }[status];
  }

  scoreColor(val: number): 'primary' | 'accent' | 'warn' {
    if (val >= 80) return 'primary';
    if (val >= 60) return 'accent';
    return 'warn';
  }

  sourceIcon(type: string): string {
    return { APPLICATION_PERFORMANCE:'trending_up',
             NETWORK_PERFORMANCE:'network_check',
             DEVICE_MANAGEMENT:'devices',
             DNS_DHCP_IPAM:'dns',
             TICKETING_CRM:'confirmation_number',
             INFRASTRUCTURE_MONITORING:'monitor_heart' }[type] ?? 'cloud';
  }
}
