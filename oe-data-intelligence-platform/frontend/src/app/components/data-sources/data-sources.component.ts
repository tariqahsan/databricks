import { Component, OnInit, inject }         from '@angular/core';
import { CommonModule }                        from '@angular/common';
import { MatCardModule }                       from '@angular/material/card';
import { MatIconModule }                       from '@angular/material/icon';
import { MatButtonModule }                     from '@angular/material/button';
import { MatProgressBarModule }                from '@angular/material/progress-bar';
import { MatProgressSpinnerModule }            from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule }      from '@angular/material/snack-bar';
import { MatTableModule }                      from '@angular/material/table';
import { DataSourcesService }                  from '../../services/services';
import { DataSourceStatus }                    from '../../models/models';

@Component({
  selector: 'app-data-sources',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatIconModule, MatButtonModule,
    MatProgressBarModule, MatProgressSpinnerModule,
    MatSnackBarModule, MatTableModule
  ],
  template: `
<div class="page-container">
  <div class="page-header">
    <h1><mat-icon>storage</mat-icon> Data Sources</h1>
    <button mat-raised-button color="primary"
            (click)="triggerAll()" [disabled]="triggering">
      <mat-icon>play_arrow</mat-icon>
      {{ triggering ? 'Triggering...' : 'Run All Ingestion' }}
    </button>
  </div>

  <!-- Medallion flow diagram -->
  <mat-card class="flow-card">
    <mat-card-content>
      <div class="flow-diagram">
        <div class="flow-sources">
          <div class="flow-src" *ngFor="let s of statuses">
            <mat-icon>{{ sourceIcon(s.sourceType) }}</mat-icon>
            <span>{{ s.sourceName }}</span>
            <span class="flow-status" [class]="'fs-' + s.status.toLowerCase()">
              ●
            </span>
          </div>
        </div>
        <div class="flow-arrow"><mat-icon>arrow_forward</mat-icon> Ingest</div>
        <div class="flow-layer bronze">
          <div class="layer-label">🥉 BRONZE</div>
          <div class="layer-sub">Raw Delta tables</div>
        </div>
        <div class="flow-arrow"><mat-icon>arrow_forward</mat-icon> Cleanse</div>
        <div class="flow-layer silver">
          <div class="layer-label">🥈 SILVER</div>
          <div class="layer-sub">Trusted, merged</div>
        </div>
        <div class="flow-arrow"><mat-icon>arrow_forward</mat-icon> Aggregate</div>
        <div class="flow-layer gold">
          <div class="layer-label">🥇 GOLD</div>
          <div class="layer-sub">Products &amp; KPIs</div>
        </div>
      </div>
    </mat-card-content>
  </mat-card>

  <mat-progress-bar *ngIf="loading" mode="indeterminate"></mat-progress-bar>

  <!-- Source cards -->
  <div class="source-grid" *ngIf="!loading">
    <mat-card *ngFor="let s of statuses"
              class="source-card"
              [class]="'border-' + s.status.toLowerCase()">
      <div class="sc-header">
        <div class="sc-icon-wrap" [class]="'icon-' + s.status.toLowerCase()">
          <mat-icon>{{ sourceIcon(s.sourceType) }}</mat-icon>
        </div>
        <div>
          <div class="sc-name">{{ s.sourceName }}</div>
          <div class="sc-type">{{ s.sourceType }}</div>
        </div>
        <div class="sc-status" [class]="'chip-' + s.status.toLowerCase()">
          {{ s.status }}
        </div>
      </div>

      <div class="sc-metrics">
        <div class="sc-metric">
          <span class="m-lbl">Records (batch)</span>
          <span class="m-val">{{ s.recordsLastBatch | number }}</span>
        </div>
        <div class="sc-metric">
          <span class="m-lbl">Today total</span>
          <span class="m-val">{{ s.totalRecordsToday | number }}</span>
        </div>
        <div class="sc-metric">
          <span class="m-lbl">Latency</span>
          <span class="m-val">{{ s.latencyMs | number }}ms</span>
        </div>
        <div class="sc-metric">
          <span class="m-lbl">Data quality</span>
          <span class="m-val" [class]="s.dataQualityScore >= 95 ? 'green' : 'orange'">
            {{ s.dataQualityScore | number:'1.0-1' }}%
          </span>
        </div>
      </div>

      <mat-progress-bar mode="determinate"
        [value]="s.dataQualityScore"
        [color]="s.dataQualityScore >= 95 ? 'primary' : 'accent'">
      </mat-progress-bar>

      <div class="sc-tables">
        <span class="table-chip bronze">{{ s.bronzeTable }}</span>
        <mat-icon class="arrow-sm">arrow_forward</mat-icon>
        <span class="table-chip silver">{{ s.silverTable }}</span>
      </div>

      <div class="sc-error" *ngIf="s.errorMessage">
        <mat-icon color="warn">error_outline</mat-icon>
        {{ s.errorMessage }}
      </div>

      <div class="sc-timestamps">
        <span>Last: {{ s.lastIngestionAt | date:'shortTime' }}</span>
        <button mat-button color="primary" (click)="triggerOne(s)">
          <mat-icon>play_circle</mat-icon> Run
        </button>
      </div>
    </mat-card>
  </div>
</div>
  `,
  styles: [`
    .page-container { padding:24px; max-width:1400px; margin:0 auto; }
    .page-header    { display:flex; justify-content:space-between;
                      align-items:center; margin-bottom:20px; }
    .page-header h1 { display:flex; align-items:center; gap:8px;
                      font-size:1.5rem; margin:0; }

    /* Flow diagram */
    .flow-card   { margin-bottom:20px; }
    .flow-diagram{ display:flex; align-items:center; gap:12px;
                   flex-wrap:wrap; padding:8px 0; }
    .flow-sources{ display:flex; flex-direction:column; gap:4px; }
    .flow-src    { display:flex; align-items:center; gap:6px;
                   font-size:.8rem; color:#455a64; }
    .flow-src mat-icon{ font-size:16px; width:16px; height:16px;
                        color:#1565c0; }
    .flow-status { font-size:12px; }
    .fs-active   { color:#4caf50; }
    .fs-degraded { color:#ff9800; }
    .fs-failed   { color:#f44336; }
    .fs-unknown  { color:#9e9e9e; }
    .flow-arrow  { display:flex; flex-direction:column; align-items:center;
                   color:#90a4ae; font-size:.7rem; }
    .flow-layer  { padding:12px 20px; border-radius:10px; text-align:center; }
    .layer-label { font-weight:700; font-size:1rem; }
    .layer-sub   { font-size:.72rem; color:#546e7a; margin-top:2px; }
    .bronze      { background:#fff3e0; border:2px solid #ff9800; }
    .silver      { background:#f5f5f5; border:2px solid #9e9e9e; }
    .gold        { background:#fffde7; border:2px solid #fbc02d; }

    /* Source cards */
    .source-grid { display:grid;
                   grid-template-columns:repeat(auto-fill,minmax(300px,1fr));
                   gap:16px; }
    .source-card { padding:16px; }
    .border-active   { border-left:4px solid #4caf50; }
    .border-degraded { border-left:4px solid #ff9800; }
    .border-failed   { border-left:4px solid #f44336; }
    .border-unknown  { border-left:4px solid #9e9e9e; }

    .sc-header   { display:flex; align-items:center; gap:12px;
                   margin-bottom:12px; }
    .sc-icon-wrap{ width:40px; height:40px; border-radius:8px;
                   display:flex; align-items:center; justify-content:center; }
    .icon-active   { background:#e8f5e9; color:#2e7d32; }
    .icon-degraded { background:#fff8e1; color:#e65100; }
    .icon-failed   { background:#ffebee; color:#c62828; }
    .icon-unknown  { background:#f5f5f5; color:#666; }
    .sc-icon-wrap mat-icon{ }
    .sc-name     { font-weight:700; font-size:.95rem; }
    .sc-type     { font-size:.72rem; color:#78909c; }
    .sc-status   { margin-left:auto; padding:3px 10px; border-radius:12px;
                   font-size:.72rem; font-weight:700; }
    .chip-active   { background:#e8f5e9; color:#2e7d32; }
    .chip-degraded { background:#fff8e1; color:#e65100; }
    .chip-failed   { background:#ffebee; color:#c62828; }
    .chip-unknown  { background:#f5f5f5; color:#666; }

    .sc-metrics  { display:grid; grid-template-columns:1fr 1fr;
                   gap:8px; margin-bottom:10px; }
    .sc-metric   { background:#f5f7fa; border-radius:6px;
                   padding:6px 10px; }
    .m-lbl       { display:block; font-size:.68rem; color:#78909c; }
    .m-val       { font-weight:700; font-size:.95rem; }
    .green       { color:#2e7d32; }
    .orange      { color:#e65100; }

    .sc-tables   { display:flex; align-items:center; gap:6px;
                   margin:10px 0 8px; flex-wrap:wrap; }
    .table-chip  { padding:2px 8px; border-radius:8px;
                   font-size:.7rem; font-family:monospace; }
    .table-chip.bronze{ background:#fff3e0; color:#e65100; }
    .table-chip.silver{ background:#f5f5f5; color:#546e7a; }
    .arrow-sm    { font-size:14px; width:14px; height:14px; color:#90a4ae; }

    .sc-error    { display:flex; align-items:center; gap:6px;
                   color:#c62828; font-size:.78rem;
                   background:#ffebee; padding:6px 10px;
                   border-radius:6px; margin-bottom:8px; }
    .sc-timestamps{ display:flex; justify-content:space-between;
                    align-items:center; font-size:.75rem; color:#78909c;
                    margin-top:8px; }
  `]
})
export class DataSourcesComponent implements OnInit {

  private svc   = inject(DataSourcesService);
  private snack = inject(MatSnackBar);

  statuses:   DataSourceStatus[] = [];
  loading     = true;
  triggering  = false;

  ngOnInit(): void {
    this.svc.getStatuses().subscribe({
      next:  s  => { this.statuses = s; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  triggerAll(): void {
    this.triggering = true;
    this.svc.triggerIngestion('ALL', 'manual-all').subscribe({
      next:  r => {
        this.snack.open(`All sources ingestion triggered (Run #${r.runId})`,
          'OK', { duration: 4000 });
        this.triggering = false;
      },
      error: () => {
        this.snack.open('Failed to trigger ingestion', 'Dismiss',
          { duration: 3000 });
        this.triggering = false;
      }
    });
  }

  triggerOne(s: DataSourceStatus): void {
    this.svc.triggerIngestion(s.sourceName, 'manual-single').subscribe({
      next: r => this.snack.open(
        `${s.sourceName} ingestion triggered (Run #${r.runId})`,
        'OK', { duration: 3000 }),
      error: () => this.snack.open('Failed', 'Dismiss', { duration: 2000 })
    });
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
