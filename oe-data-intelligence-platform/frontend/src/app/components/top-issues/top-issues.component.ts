import { Component, OnInit, inject } from '@angular/core';
import { CommonModule }               from '@angular/common';
import { MatCardModule }              from '@angular/material/card';
import { MatIconModule }              from '@angular/material/icon';
import { MatProgressSpinnerModule }   from '@angular/material/progress-spinner';
import { TopIssuesService }           from '../../services/services';
import { IssuesKpis }                 from '../../models/models';

@Component({
  selector: 'app-top-issues',
  standalone: true,
  imports: [
    CommonModule, MatCardModule,
    MatIconModule, MatProgressSpinnerModule
  ],
  template: `
<div class="page-container">
  <h1 class="page-title">
    <mat-icon>warning_amber</mat-icon> Top Issues
  </h1>
  <p class="source-note">
    Sources: <strong>ScienceLogic</strong> (infrastructure monitoring) ·
    <strong>Salesforce</strong> (ticketing / CRM)
  </p>

  <mat-spinner *ngIf="loading" diameter="40"></mat-spinner>

  <div *ngIf="!loading && kpis">

    <!-- KPI strip -->
    <div class="kpi-strip">
      <div class="kpi-tile critical">
        <div class="kv white">{{ kpis.openP1Issues }}</div>
        <div class="kl white">P1 Open</div>
      </div>
      <div class="kpi-tile warn">
        <div class="kv white">{{ kpis.openP2Issues }}</div>
        <div class="kl white">P2 Open</div>
      </div>
      <div class="kpi-tile">
        <div class="kv">{{ kpis.openP3Issues }}</div>
        <div class="kl">P3 Open</div>
      </div>
      <div class="kpi-tile">
        <div class="kv">{{ kpis.openP4Issues }}</div>
        <div class="kl">P4 Open</div>
      </div>
      <div class="kpi-tile">
        <div class="kv green">{{ kpis.resolvedToday }}</div>
        <div class="kl">Resolved Today</div>
      </div>
      <div class="kpi-tile">
        <div class="kv">{{ kpis.avgMttrHours | number:'1.1-1' }}h</div>
        <div class="kl">Avg MTTR</div>
      </div>
      <div class="kpi-tile">
        <div class="kv"
             [class]="kpis.slaBreachRate > 10 ? 'red' : 'green'">
          {{ kpis.slaBreachRate | number:'1.0-0' }}%
        </div>
        <div class="kl">SLA Breach</div>
      </div>
    </div>

    <div class="two-col">

      <!-- Critical open issues -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Critical Open Issues (P1 / P2)</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="issue-row" *ngFor="let i of kpis.criticalOpen">
            <span class="sev" [class]="'sev-' + i.severity.toLowerCase()">
              {{ i.severity }}
            </span>
            <div class="issue-body">
              <div class="issue-title">{{ i.title }}</div>
              <div class="issue-meta">
                {{ i.category }} ·
                {{ i.affectedDevices }} devices ·
                {{ i.assignedTeam }}
              </div>
            </div>
            <span class="src-badge">{{ i.source }}</span>
          </div>
          <div *ngIf="!kpis.criticalOpen?.length" class="empty-state">
            <mat-icon color="primary">check_circle</mat-icon>
            No critical open issues
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Issues by category -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Issues by Category</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table class="data-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Open</th>
                <th>Resolved</th>
                <th>Avg MTTR</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let c of kpis.byCategory">
                <td>{{ c.category }}</td>
                <td class="red">{{ c.openCount }}</td>
                <td class="green">{{ c.resolvedCount }}</td>
                <td>{{ c.avgMttrHours | number:'1.1-1' }}h</td>
              </tr>
            </tbody>
          </table>
        </mat-card-content>
      </mat-card>

    </div>

    <!-- Trending issues -->
    <mat-card class="trending-card" *ngIf="kpis.trending?.length">
      <mat-card-header>
        <mat-card-title>Trending / Recurring Patterns</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="trend-row" *ngFor="let t of kpis.trending">
          <mat-icon [class]="trendIcon(t.trend) === 'trending_up' ? 'red' : 'green'">
            {{ trendIcon(t.trend) }}
          </mat-icon>
          <div>
            <div class="trend-pattern">{{ t.pattern }}</div>
            <div class="trend-meta">
              {{ t.occurrences }} occurrences ·
              {{ t.affectedComponent }}
            </div>
          </div>
        </div>
      </mat-card-content>
    </mat-card>

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
                      box-shadow:0 1px 4px rgba(0,0,0,.1); min-width:100px; }
    .kpi-tile.critical { background:#c62828; }
    .kpi-tile.warn     { background:#e65100; }
    .kv  { font-size:1.6rem; font-weight:700; }
    .kl  { font-size:.75rem; color:#78909c; margin-top:2px; }
    .white { color:white !important; }
    .green { color:#2e7d32; } .red { color:#c62828; }
    .two-col { display:grid; grid-template-columns:1fr 1fr;
               gap:16px; margin-bottom:16px; }
    .issue-row  { display:flex; align-items:flex-start; gap:10px;
                  padding:10px 0; border-bottom:1px solid #eee; }
    .issue-row:last-child { border-bottom:none; }
    .sev        { padding:2px 8px; border-radius:10px;
                  font-size:.72rem; font-weight:700; white-space:nowrap; }
    .sev-p1     { background:#ffebee; color:#c62828; }
    .sev-p2     { background:#fff8e1; color:#e65100; }
    .issue-body { flex:1; }
    .issue-title{ font-weight:600; font-size:.9rem; }
    .issue-meta { font-size:.75rem; color:#78909c; }
    .src-badge  { font-size:.65rem; color:#78909c; background:#f5f5f5;
                  padding:2px 8px; border-radius:10px; white-space:nowrap; }
    .empty-state{ display:flex; align-items:center; gap:8px;
                  color:#2e7d32; padding:16px; }
    .data-table { width:100%; border-collapse:collapse; font-size:.85rem; }
    .data-table th { background:#f5f5f5; padding:8px 12px;
                     text-align:left; font-weight:600; }
    .data-table td { padding:8px 12px; border-bottom:1px solid #eee; }
    .trending-card { }
    .trend-row  { display:flex; align-items:center; gap:12px;
                  padding:10px 0; border-bottom:1px solid #eee; }
    .trend-row:last-child { border-bottom:none; }
    .trend-pattern { font-weight:600; font-size:.9rem; }
    .trend-meta    { font-size:.75rem; color:#78909c; }
  `]
})
export class TopIssuesComponent implements OnInit {

  private svc = inject(TopIssuesService);

  kpis?: IssuesKpis;
  loading = true;

  ngOnInit(): void {
    this.svc.getKpis().subscribe({
      next:  (k: IssuesKpis) => { this.kpis = k; this.loading = false; },
      error: ()               => { this.loading = false; }
    });
  }

  trendIcon(trend: string): string {
    return trend === 'INCREASING' ? 'trending_up'
         : trend === 'DECREASING' ? 'trending_down'
         : 'trending_flat';
  }
}
