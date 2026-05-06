import { Component, OnInit, inject }         from '@angular/core';
import { CommonModule }                        from '@angular/common';
import { MatCardModule }                       from '@angular/material/card';
import { MatProgressSpinnerModule }            from '@angular/material/progress-spinner';
import { MatIconModule }                       from '@angular/material/icon';
import { MatButtonModule }                     from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule }      from '@angular/material/snack-bar';
import { BaseChartDirective }                  from 'ng2-charts';
import { ChartData, ChartOptions }             from 'chart.js';
import { DashboardService }                    from '../../services/services';
import { PipelineService }                     from '../../services/services';
import { DashboardSummary }                    from '../../models/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    BaseChartDirective
  ],
  template: `
<div class="dashboard-container">

  <!-- ── Header ──────────────────────────────────────────── -->
  <div class="dashboard-header">
    <h1>
      <mat-icon>analytics</mat-icon>
      Workforce Analytics Dashboard
    </h1>
    <button mat-raised-button color="primary"
            [disabled]="refreshing"
            (click)="triggerRefresh()">
      <mat-icon>refresh</mat-icon>
      {{ refreshing ? 'Refreshing...' : 'Refresh Data' }}
    </button>
  </div>

  <!-- ── Loading ─────────────────────────────────────────── -->
  <div *ngIf="loading" class="loading-center">
    <mat-spinner diameter="48"></mat-spinner>
    <p>Querying Databricks Gold layer...</p>
  </div>

  <!-- ── KPI Cards ───────────────────────────────────────── -->
  <div *ngIf="!loading && summary" class="kpi-grid">

    <mat-card class="kpi-card primary">
      <mat-icon>people</mat-icon>
      <div class="kpi-value">{{ totalHeadcount | number }}</div>
      <div class="kpi-label">Total Active Employees</div>
    </mat-card>

    <mat-card class="kpi-card accent">
      <mat-icon>attach_money</mat-icon>
      <div class="kpi-value">{{ totalPayroll | currency:'USD':'symbol':'1.0-0' }}</div>
      <div class="kpi-label">Total Annual Payroll</div>
    </mat-card>

    <mat-card class="kpi-card">
      <mat-icon>trending_up</mat-icon>
      <div class="kpi-value">{{ orgAvgSalary | currency:'USD':'symbol':'1.0-0' }}</div>
      <div class="kpi-label">Org Average Salary</div>
    </mat-card>

    <mat-card class="kpi-card">
      <mat-icon>business</mat-icon>
      <div class="kpi-value">{{ summary.departments.length }}</div>
      <div class="kpi-label">Departments</div>
    </mat-card>

    <mat-card class="kpi-card">
      <mat-icon>location_on</mat-icon>
      <div class="kpi-value">{{ summary.locations.length }}</div>
      <div class="kpi-label">Locations</div>
    </mat-card>

  </div>

  <!-- ── Charts Row ──────────────────────────────────────── -->
  <div *ngIf="!loading && summary" class="charts-grid">

    <!-- Payroll by Department (Bar) -->
    <mat-card class="chart-card">
      <mat-card-header>
        <mat-card-title>Payroll by Department</mat-card-title>
        <mat-card-subtitle>Total annual payroll ($M)</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <canvas baseChart
          [data]="payrollChartData"
          [options]="barChartOptions"
          type="bar">
        </canvas>
      </mat-card-content>
    </mat-card>

    <!-- Headcount by Location (Doughnut) -->
    <mat-card class="chart-card">
      <mat-card-header>
        <mat-card-title>Headcount by Location</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <canvas baseChart
          [data]="locationChartData"
          [options]="doughnutOptions"
          type="doughnut">
        </canvas>
      </mat-card-content>
    </mat-card>

    <!-- Salary Band Distribution (Bar) -->
    <mat-card class="chart-card">
      <mat-card-header>
        <mat-card-title>Salary Band Distribution</mat-card-title>
        <mat-card-subtitle>Employee count per band</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <canvas baseChart
          [data]="bandChartData"
          [options]="barChartOptions"
          type="bar">
        </canvas>
      </mat-card-content>
    </mat-card>

  </div>

  <!-- ── Dept Table ───────────────────────────────────────── -->
  <mat-card *ngIf="!loading && summary" class="table-card">
    <mat-card-header>
      <mat-card-title>Department Breakdown</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <table class="data-table">
        <thead>
          <tr>
            <th>Department</th>
            <th>Division</th>
            <th>Headcount</th>
            <th>Avg Salary</th>
            <th>Total Payroll</th>
            <th>Max Salary</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let d of summary.departments">
            <td><strong>{{ d.deptName || d.department }}</strong></td>
            <td>{{ d.division }}</td>
            <td>{{ d.headcount | number }}</td>
            <td>{{ d.avgSalary | currency:'USD':'symbol':'1.0-0' }}</td>
            <td>{{ d.totalPayroll | currency:'USD':'symbol':'1.0-0' }}</td>
            <td>{{ d.maxSalary | currency:'USD':'symbol':'1.0-0' }}</td>
          </tr>
        </tbody>
      </table>
    </mat-card-content>
  </mat-card>

</div>
  `,
  styles: [`
    .dashboard-container { padding: 24px; max-width: 1400px; margin: 0 auto; }
    .dashboard-header    { display:flex; justify-content:space-between;
                           align-items:center; margin-bottom:24px; }
    .dashboard-header h1 { display:flex; align-items:center; gap:8px;
                           font-size:1.6rem; margin:0; }
    .loading-center      { display:flex; flex-direction:column;
                           align-items:center; padding:48px; gap:16px; }
    .kpi-grid            { display:grid;
                           grid-template-columns: repeat(auto-fit, minmax(180px,1fr));
                           gap:16px; margin-bottom:24px; }
    .kpi-card            { padding:20px; text-align:center; }
    .kpi-card mat-icon   { font-size:32px; width:32px; height:32px;
                           color:#1565c0; }
    .kpi-card.primary    { background:#1565c0; color:white; }
    .kpi-card.primary mat-icon { color:white; }
    .kpi-card.accent     { background:#0097a7; color:white; }
    .kpi-card.accent mat-icon  { color:white; }
    .kpi-value           { font-size:1.8rem; font-weight:700; margin:8px 0 4px; }
    .kpi-label           { font-size:0.8rem; opacity:0.85; }
    .charts-grid         { display:grid;
                           grid-template-columns: repeat(auto-fit, minmax(380px,1fr));
                           gap:16px; margin-bottom:24px; }
    .chart-card          { padding:16px; }
    .table-card          { padding:16px; }
    .data-table          { width:100%; border-collapse:collapse; font-size:0.9rem; }
    .data-table th       { background:#f5f5f5; padding:10px 12px;
                           text-align:left; font-weight:600;
                           border-bottom:2px solid #ddd; }
    .data-table td       { padding:10px 12px; border-bottom:1px solid #eee; }
    .data-table tr:hover { background:#fafafa; }
  `]
})
export class DashboardComponent implements OnInit {

  private readonly dashSvc     = inject(DashboardService);
  private readonly pipelineSvc = inject(PipelineService);
  private readonly snackBar    = inject(MatSnackBar);

  summary:   DashboardSummary | null = null;
  loading  = true;
  refreshing = false;

  // KPI computed values
  totalHeadcount = 0;
  totalPayroll   = 0;
  orgAvgSalary   = 0;

  // Chart data
  payrollChartData!: ChartData<'bar'>;
  locationChartData!: ChartData<'doughnut'>;
  bandChartData!: ChartData<'bar'>;

  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: { legend: { display: false } }
  };

  doughnutOptions: ChartOptions = {
    responsive: true,
    plugins: { legend: { position: 'bottom' } }
  };

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;
    this.dashSvc.getSummary().subscribe({
      next: s  => { this.summary = s; this.buildCharts(s); this.loading = false; },
      error: e => { console.error(e); this.loading = false; }
    });
  }

  triggerRefresh(): void {
    this.refreshing = true;
    this.pipelineSvc.trigger({ reason: 'manual-dashboard-refresh',
                                forceRefresh: true }).subscribe({
      next: run => {
        this.snackBar.open(
          `Pipeline triggered (runId: ${run.runId}). Data refreshes in ~2 min.`,
          'OK', { duration: 5000 });
        this.refreshing = false;
      },
      error: () => {
        this.snackBar.open('Failed to trigger pipeline', 'Dismiss',
          { duration: 4000 });
        this.refreshing = false;
      }
    });
  }

  private buildCharts(s: DashboardSummary): void {
    // KPIs
    this.totalHeadcount = s.departments.reduce((a, d) => a + d.headcount, 0);
    this.totalPayroll   = s.departments.reduce((a, d) => a + d.totalPayroll, 0);
    this.orgAvgSalary   = this.totalHeadcount > 0
      ? this.totalPayroll / this.totalHeadcount : 0;

    const COLORS = ['#1565C0','#0097A7','#2E7D32','#F57F17',
                    '#6A1B9A','#AD1457','#00695C'];

    // Payroll bar chart
    this.payrollChartData = {
      labels:   s.departments.map(d => d.department),
      datasets: [{
        data:            s.departments.map(d => +(d.totalPayroll / 1_000_000).toFixed(2)),
        backgroundColor: COLORS,
        label: 'Payroll ($M)'
      }]
    };

    // Location doughnut
    this.locationChartData = {
      labels:   s.locations.map(l => l.location),
      datasets: [{
        data:            s.locations.map(l => l.headcount),
        backgroundColor: COLORS
      }]
    };

    // Salary band bar chart
    this.bandChartData = {
      labels:   s.salaryBands.map(b => b.salaryBand.replace('BAND_', '')),
      datasets: [{
        data:            s.salaryBands.map(b => b.employeeCount),
        backgroundColor: COLORS,
        label: 'Employees'
      }]
    };
  }
}
