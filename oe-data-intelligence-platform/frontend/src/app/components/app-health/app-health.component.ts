// ── app-health.component.ts ──────────────────────────────────────────
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule }               from '@angular/common';
import { MatCardModule }              from '@angular/material/card';
import { MatIconModule }              from '@angular/material/icon';
import { MatProgressSpinnerModule }   from '@angular/material/progress-spinner';
import { MatProgressBarModule }       from '@angular/material/progress-bar';
import { AppHealthService }           from '../../services/services';
import { AppHealthKpis, AppHealthSummary } from '../../models/models';

@Component({
  selector: 'app-app-health',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule,
            MatProgressSpinnerModule, MatProgressBarModule],
  template: `
<div class="page-container">
  <h1 class="page-title"><mat-icon>apps</mat-icon> App Health</h1>
  <p class="source-note">
    Sources:
    <strong>Netscout App</strong> (application performance) ·
    <strong>ElastiFlow</strong> (network flows)
  </p>

  <mat-spinner *ngIf="loading" diameter="40"></mat-spinner>

  <div *ngIf="!loading && kpis" class="kpi-strip">
    <div class="kpi-tile">
      <div class="kv green">{{ kpis.healthyApps }}</div>
      <div class="kl">Healthy Apps</div>
    </div>
    <div class="kpi-tile">
      <div class="kv orange">{{ kpis.degradedApps }}</div>
      <div class="kl">Degraded</div>
    </div>
    <div class="kpi-tile">
      <div class="kv red">{{ kpis.criticalApps }}</div>
      <div class="kl">Critical</div>
    </div>
    <div class="kpi-tile">
      <div class="kv">{{ kpis.avgExperienceScore | number:'1.0-0' }}</div>
      <div class="kl">Avg UX Score</div>
    </div>
    <div class="kpi-tile">
      <div class="kv">{{ kpis.avgResponseTimeMs | number:'1.0-0' }}ms</div>
      <div class="kl">Avg Response</div>
    </div>
    <div class="kpi-tile">
      <div class="kv">{{ kpis.totalActiveUsers | number }}</div>
      <div class="kl">Active Users</div>
    </div>
  </div>

  <mat-card *ngIf="!loading && apps.length" class="table-card">
    <mat-card-header>
      <mat-card-title>Application Performance</mat-card-title>
      <mat-card-subtitle>
        Netscout App · ElastiFlow — real-time application telemetry
      </mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
      <table class="data-table">
        <thead>
          <tr>
            <th>Application</th><th>Category</th>
            <th>UX Score</th><th>Avg Response</th>
            <th>Crash Rate</th><th>Error Rate</th>
            <th>Status</th><th>Trend</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let a of apps">
            <td><strong>{{ a.applicationName }}</strong></td>
            <td>{{ a.appCategory }}</td>
            <td>
              <mat-progress-bar mode="determinate"
                [value]="a.experienceScore"
                [color]="a.experienceScore >= 80 ? 'primary' : 'warn'"
                style="width:80px;display:inline-block">
              </mat-progress-bar>
              {{ a.experienceScore | number:'1.0-0' }}
            </td>
            <td>{{ a.avgResponseTimeMs | number:'1.0-0' }}ms</td>
            <td [class]="a.crashRate > 1 ? 'red' : ''">
              {{ a.crashRate | number:'1.2-2' }}%
            </td>
            <td [class]="a.errorRate > 2 ? 'red' : ''">
              {{ a.errorRate | number:'1.2-2' }}%
            </td>
            <td>
              <span class="status-badge"
                    [class]="'s-' + a.healthStatus.toLowerCase()">
                {{ a.healthStatus }}
              </span>
            </td>
            <td>{{ a.trend }}</td>
          </tr>
        </tbody>
      </table>
    </mat-card-content>
  </mat-card>

  <div *ngIf="!loading && !apps.length" class="empty-state">
    <mat-icon>info_outline</mat-icon>
    <p>No data for today. Run the ingestion pipeline to refresh.</p>
    <code>python scripts/generate_mock_logs.py --days 1 && python run_pipeline.py</code>
  </div>
</div>
  `,
  styles: [`
    .page-container { padding:24px; max-width:1400px; margin:0 auto; }
    .page-title     { display:flex; align-items:center; gap:8px;
                      font-size:1.5rem; margin:0 0 4px; }
    .source-note    { color:#546e7a; margin:0 0 20px; font-size:.85rem; }
    .kpi-strip      { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:20px; }
    .kpi-tile       { background:#fff; border-radius:8px; padding:16px 20px;
                      box-shadow:0 1px 4px rgba(0,0,0,.1); min-width:120px; }
    .kv             { font-size:1.6rem; font-weight:700; }
    .kl             { font-size:.75rem; color:#78909c; margin-top:2px; }
    .green          { color:#2e7d32; } .orange { color:#e65100; }
    .red            { color:#c62828; }
    .table-card     { }
    .data-table     { width:100%; border-collapse:collapse; font-size:.85rem; }
    .data-table th  { background:#f5f5f5; padding:8px 12px;
                      text-align:left; font-weight:600; }
    .data-table td  { padding:8px 12px; border-bottom:1px solid #eee; }
    .status-badge   { padding:2px 8px; border-radius:10px; font-size:.72rem; }
    .s-healthy      { background:#e8f5e9; color:#2e7d32; }
    .s-degraded     { background:#fff8e1; color:#e65100; }
    .s-critical     { background:#ffebee; color:#c62828; }
    .empty-state    { text-align:center; padding:48px; color:#78909c; }
    .empty-state mat-icon { font-size:48px; width:48px; height:48px; }
    .empty-state code { display:block; margin-top:12px; font-size:.8rem;
                        background:#f5f5f5; padding:8px 16px; border-radius:4px; }
  `]
})
export class AppHealthComponent implements OnInit {
  private svc = inject(AppHealthService);
  kpis?: AppHealthKpis;
  apps:  AppHealthSummary[] = [];
  loading = true;

  ngOnInit(): void {
    this.svc.getKpis().subscribe(k => { this.kpis = k; });
    this.svc.getAll().subscribe(a => { this.apps = a; this.loading = false; });
  }
}