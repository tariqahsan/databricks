// network-performance.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule }               from '@angular/common';
import { MatCardModule }              from '@angular/material/card';
import { MatIconModule }              from '@angular/material/icon';
import { MatProgressSpinnerModule }   from '@angular/material/progress-spinner';
import { NetworkPerformanceService }  from '../../services/services';
import { NetworkKpis }                from '../../models/models';

@Component({
  selector: 'app-network-performance',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule],
  template: `
<div class="page-container">
  <h1 class="page-title"><mat-icon>network_check</mat-icon> Network Performance</h1>
  <p class="source-note">Sources: <strong>NetScout</strong> (network monitoring) ·
    <strong>Infoblox</strong> (DNS/DHCP/IPAM)</p>
  <mat-spinner *ngIf="loading" diameter="40"></mat-spinner>

  <div *ngIf="!loading && kpis">
    <div class="kpi-strip">
      <div class="kpi-tile"><div class="kv" [class]="kpis.avgPacketLoss > 1 ? 'red' : 'green'">{{ kpis.avgPacketLoss | number:'1.2-2' }}%</div><div class="kl">Avg Packet Loss</div></div>
      <div class="kpi-tile"><div class="kv">{{ kpis.avgLatencyMs | number:'1.0-0' }}ms</div><div class="kl">Avg Latency</div></div>
      <div class="kpi-tile"><div class="kv green">{{ kpis.avgAvailability | number:'1.2-2' }}%</div><div class="kl">Availability</div></div>
      <div class="kpi-tile"><div class="kv green">{{ kpis.healthySegments }}</div><div class="kl">Healthy Segs</div></div>
      <div class="kpi-tile"><div class="kv orange">{{ kpis.degradedSegments }}</div><div class="kl">Degraded</div></div>
      <div class="kpi-tile"><div class="kv red">{{ kpis.totalAnomalies | number }}</div><div class="kl">Anomalies</div></div>
    </div>

    <mat-card>
      <mat-card-header>
        <mat-icon mat-card-avatar>radar</mat-icon>
        <mat-card-title>Packet Loss Root Cause Analysis</mat-card-title>
        <mat-card-subtitle>AI-assisted analysis — NetScout data via Databricks ML</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <table class="data-table">
          <thead>
            <tr><th>Segment</th><th>Root Cause</th><th>Packet Loss</th>
                <th>Confidence</th><th>Flows Affected</th>
                <th>Severity</th><th>Recommendation</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let r of kpis.topRootCauses">
              <td><strong>{{ r.segmentName }}</strong></td>
              <td>{{ r.rootCause }}</td>
              <td [class]="r.packetLossRate > 1 ? 'red' : 'green'">
                {{ r.packetLossRate | number:'1.2-2' }}%</td>
              <td>{{ r.confidence | number:'1.0-0' }}%</td>
              <td>{{ r.affectedFlows | number }}</td>
              <td><span class="sev" [class]="'sev-' + r.severity.toLowerCase()">{{ r.severity }}</span></td>
              <td class="rec">{{ r.recommendation }}</td>
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
    .kv{font-size:1.6rem;font-weight:700}.kl{font-size:.75rem;color:#78909c}
    .green{color:#2e7d32}.red{color:#c62828}.orange{color:#e65100}
    .data-table{width:100%;border-collapse:collapse;font-size:.85rem}
    .data-table th{background:#e3f2fd;padding:8px 12px;text-align:left;font-weight:600}
    .data-table td{padding:8px 12px;border-bottom:1px solid #eee}
    .sev{padding:2px 8px;border-radius:10px;font-size:.72rem;font-weight:700}
    .sev-critical{background:#ffebee;color:#c62828}.sev-high{background:#fff8e1;color:#e65100}
    .sev-medium{background:#f3e5f5;color:#6a1b9a}.sev-low{background:#e8f5e9;color:#2e7d32}
    .rec{color:#1565c0;font-size:.8rem}`]
})
export class NetworkPerformanceComponent implements OnInit {
  private svc = inject(NetworkPerformanceService);
  kpis?: NetworkKpis; loading = true;
  ngOnInit() { this.svc.getKpis().subscribe(k => { this.kpis = k; this.loading = false; }); }
}
