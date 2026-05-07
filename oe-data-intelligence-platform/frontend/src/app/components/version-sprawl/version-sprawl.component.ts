import { Component, OnInit, inject } from '@angular/core';
import { CommonModule }               from '@angular/common';
import { MatCardModule }              from '@angular/material/card';
import { MatIconModule }              from '@angular/material/icon';
import { MatProgressSpinnerModule }   from '@angular/material/progress-spinner';
import { MatProgressBarModule }       from '@angular/material/progress-bar';
import { VersionSprawlService }       from '../../services/services';
import { VersionSprawlKpis }          from '../../models/models';

@Component({
  selector: 'app-version-sprawl',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatIconModule,
    MatProgressSpinnerModule, MatProgressBarModule
  ],
  template: `
<div class="page-container">
  <h1 class="page-title">
    <mat-icon>account_tree</mat-icon> Version Sprawl
  </h1>
  <p class="source-note">
    Sources: <strong>Microsoft Intune</strong> · <strong>Aternity</strong>
  </p>

  <mat-spinner *ngIf="loading" diameter="40"></mat-spinner>

  <div *ngIf="!loading && kpis">

    <!-- KPI strip -->
    <div class="kpi-strip">
      <div class="kpi-tile">
        <div class="kv">{{ kpis.totalSoftwareProducts }}</div>
        <div class="kl">Total Products</div>
      </div>
      <div class="kpi-tile">
        <div class="kv orange">{{ kpis.productsWithSprawl }}</div>
        <div class="kl">Sprawled (&gt;3 versions)</div>
      </div>
      <div class="kpi-tile">
        <div class="kv">{{ kpis.avgVersionsPerProduct | number:'1.1-1' }}</div>
        <div class="kl">Avg Versions / Product</div>
      </div>
      <div class="kpi-tile">
        <div class="kv green">{{ kpis.devicesOnLatestOs | number }}</div>
        <div class="kl">On Latest OS</div>
      </div>
      <div class="kpi-tile">
        <div class="kv red">{{ kpis.devicesOnUnsupportedOs | number }}</div>
        <div class="kl">Unsupported OS</div>
      </div>
      <div class="kpi-tile">
        <div class="kv red">{{ kpis.appsWithVulnerabilities }}</div>
        <div class="kl">Apps w/ CVEs</div>
      </div>
    </div>

    <div class="two-col">

      <!-- Worst sprawl table -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Worst Version Sprawl</mat-card-title>
          <mat-card-subtitle>Products with most active versions</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <table class="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Versions</th>
                <th>Devices</th>
                <th>% on Latest</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let w of kpis.worstSprawl">
                <td><strong>{{ w.productName }}</strong></td>
                <td [class]="w.versionCount > 5 ? 'red'
                           : w.versionCount > 3 ? 'orange' : ''">
                  {{ w.versionCount }}
                </td>
                <td>{{ w.deviceCount | number }}</td>
                <td>
                  <mat-progress-bar
                    mode="determinate"
                    [value]="w.percentOnLatest"
                    [color]="w.percentOnLatest < 50 ? 'warn'
                            : w.percentOnLatest < 80 ? 'accent'
                            : 'primary'"
                    style="width:60px;display:inline-block;
                           vertical-align:middle;margin-right:6px">
                  </mat-progress-bar>
                  <span [class]="w.percentOnLatest < 50 ? 'red'
                                : w.percentOnLatest < 80 ? 'orange'
                                : 'green'">
                    {{ w.percentOnLatest | number:'1.0-0' }}%
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div *ngIf="!kpis.worstSprawl?.length" class="empty-state">
            No sprawl detected
          </div>
        </mat-card-content>
      </mat-card>

      <!-- OS version distribution -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>OS Version Distribution</mat-card-title>
          <mat-card-subtitle>Fleet OS version breakdown</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <table class="data-table">
            <thead>
              <tr>
                <th>OS</th>
                <th>Version</th>
                <th>Devices</th>
                <th>%</th>
                <th>Supported</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let o of kpis.osVersions">
                <td>{{ o.name }}</td>
                <td>{{ o.version }}</td>
                <td>{{ o.count | number }}</td>
                <td>{{ o.percentage | number:'1.0-0' }}%</td>
                <td [class]="o.isSupported ? 'green' : 'red'">
                  {{ o.isSupported ? '✓ Supported' : '✗ Unsupported' }}
                </td>
              </tr>
            </tbody>
          </table>
          <div *ngIf="!kpis.osVersions?.length" class="empty-state">
            No OS distribution data
          </div>
        </mat-card-content>
      </mat-card>

    </div>
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
                      box-shadow:0 1px 4px rgba(0,0,0,.1); min-width:130px; }
    .kv   { font-size:1.6rem; font-weight:700; }
    .kl   { font-size:.75rem; color:#78909c; margin-top:2px; }
    .green  { color:#2e7d32; }
    .orange { color:#e65100; }
    .red    { color:#c62828; }
    .two-col { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
    .data-table     { width:100%; border-collapse:collapse; font-size:.85rem; }
    .data-table th  { background:#f5f5f5; padding:8px 12px;
                      text-align:left; font-weight:600; }
    .data-table td  { padding:8px 12px; border-bottom:1px solid #eee; }
    .empty-state    { padding:16px; color:#78909c; text-align:center; }
  `]
})
export class VersionSprawlComponent implements OnInit {

  private svc = inject(VersionSprawlService);

  kpis?: VersionSprawlKpis;
  loading = true;

  ngOnInit(): void {
    this.svc.getKpis().subscribe({
      next:  (k: VersionSprawlKpis) => { this.kpis = k; this.loading = false; },
      error: ()                      => { this.loading = false; }
    });
  }
}
