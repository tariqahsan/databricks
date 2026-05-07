// ─────────────────────────────────────────────────────────────────────
// device-health.component.ts
// ─────────────────────────────────────────────────────────────────────
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule }               from '@angular/common';
import { MatCardModule }              from '@angular/material/card';
import { MatIconModule }              from '@angular/material/icon';
import { MatProgressSpinnerModule }   from '@angular/material/progress-spinner';
import { MatProgressBarModule }       from '@angular/material/progress-bar';
import { DeviceHealthService }        from '../../services/services';
import { DeviceHealthKpis }           from '../../models/models';

@Component({
  selector: 'app-device-health',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule,
            MatProgressSpinnerModule, MatProgressBarModule],
  template: `
<div class="page-container">
  <h1 class="page-title"><mat-icon>devices</mat-icon> Device Health</h1>
  <p class="source-note">Source: <strong>Microsoft Intune</strong> — Device Management</p>
  <mat-spinner *ngIf="loading" diameter="40"></mat-spinner>

  <div *ngIf="!loading && kpis" class="kpi-strip">
    <div class="kpi-tile"><div class="kv">{{ kpis.totalDevices | number }}</div><div class="kl">Total Devices</div></div>
    <div class="kpi-tile"><div class="kv green">{{ kpis.compliantDevices | number }}</div><div class="kl">Compliant</div></div>
    <div class="kpi-tile"><div class="kv red">{{ kpis.nonCompliantDevices | number }}</div><div class="kl">Non-Compliant</div></div>
    <div class="kpi-tile"><div class="kv">{{ kpis.complianceRate | number:'1.1-1' }}%</div><div class="kl">Compliance Rate</div></div>
    <div class="kpi-tile"><div class="kv orange">{{ kpis.devicesNotCheckedIn | number }}</div><div class="kl">Not Checked In 7d</div></div>
    <div class="kpi-tile"><div class="kv green">{{ kpis.encryptedDevices | number }}</div><div class="kl">Encrypted</div></div>
  </div>

  <div class="two-col" *ngIf="!loading && kpis">
    <mat-card>
      <mat-card-header><mat-card-title>Compliance by Device Type</mat-card-title></mat-card-header>
      <mat-card-content>
        <table class="data-table" *ngIf="kpis.complianceByType?.length">
          <thead><tr><th>Type</th><th>Total</th><th>Compliant</th><th>Rate</th></tr></thead>
          <tbody>
            <tr *ngFor="let t of kpis.complianceByType">
              <td>{{ t.deviceType }}</td>
              <td>{{ t.total | number }}</td>
              <td class="green">{{ t.compliant | number }}</td>
              <td>
                <mat-progress-bar mode="determinate" [value]="t.complianceRate" style="width:60px;display:inline-block"></mat-progress-bar>
                {{ t.complianceRate | number:'1.0-0' }}%
              </td>
            </tr>
          </tbody>
        </table>
      </mat-card-content>
    </mat-card>

    <mat-card>
      <mat-card-header><mat-card-title>OS Version Distribution</mat-card-title></mat-card-header>
      <mat-card-content>
        <table class="data-table" *ngIf="kpis.osDistribution?.length">
          <thead><tr><th>OS</th><th>Version</th><th>Devices</th><th>Supported</th></tr></thead>
          <tbody>
            <tr *ngFor="let o of kpis.osDistribution">
              <td>{{ o.osName }}</td>
              <td>{{ o.osVersion }}</td>
              <td>{{ o.deviceCount | number }}</td>
              <td [class]="o.isSupported ? 'green' : 'red'">
                {{ o.isSupported ? '✓' : '✗ Unsupported' }}
              </td>
            </tr>
          </tbody>
        </table>
      </mat-card-content>
    </mat-card>
  </div>
</div>`,
  styles: [`.page-container{padding:24px;max-width:1400px;margin:0 auto}
    .page-title{display:flex;align-items:center;gap:8px;font-size:1.5rem;margin:0 0 4px}
    .source-note{color:#546e7a;margin:0 0 20px;font-size:.85rem}
    .kpi-strip{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:20px}
    .kpi-tile{background:#fff;border-radius:8px;padding:16px 20px;box-shadow:0 1px 4px rgba(0,0,0,.1);min-width:120px}
    .kv{font-size:1.6rem;font-weight:700}.kl{font-size:.75rem;color:#78909c;margin-top:2px}
    .green{color:#2e7d32}.red{color:#c62828}.orange{color:#e65100}
    .two-col{display:grid;grid-template-columns:1fr 1fr;gap:16px}
    .data-table{width:100%;border-collapse:collapse;font-size:.85rem}
    .data-table th{background:#f5f5f5;padding:8px 12px;text-align:left;font-weight:600}
    .data-table td{padding:8px 12px;border-bottom:1px solid #eee}`]
})
export class DeviceHealthComponent implements OnInit {
  private svc = inject(DeviceHealthService);
  kpis?: DeviceHealthKpis;
  loading = true;
  ngOnInit() {
    this.svc.getKpis().subscribe(k => { this.kpis = k; this.loading = false; });
  }
}
