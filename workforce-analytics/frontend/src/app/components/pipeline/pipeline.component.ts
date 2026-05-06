import { Component, OnDestroy, inject }   from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatCardModule }                    from '@angular/material/card';
import { MatButtonModule }                  from '@angular/material/button';
import { MatIconModule }                    from '@angular/material/icon';
import { MatProgressBarModule }             from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule }   from '@angular/material/snack-bar';
import { MatInputModule }                   from '@angular/material/input';
import { MatFormFieldModule }               from '@angular/material/form-field';
import { MatChipsModule }                   from '@angular/material/chips';
import { Subscription }                     from 'rxjs';
import { PipelineService }                  from '../../services/services';
import { PipelineRun }                      from '../../models/models';

@Component({
  selector: 'app-pipeline',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatCardModule, MatButtonModule, MatIconModule,
    MatProgressBarModule, MatSnackBarModule,
    MatInputModule, MatFormFieldModule, MatChipsModule
  ],
  template: `
<div class="pipeline-container">

  <h1><mat-icon>account_tree</mat-icon> Pipeline Management</h1>
  <p class="subtitle">
    Trigger and monitor the Bronze → Silver → Gold Medallion pipeline.
    This runs on your Databricks Workflow in AWS GovCloud.
  </p>

  <!-- ── Trigger Panel ─────────────────────────────────── -->
  <mat-card class="trigger-card">
    <mat-card-header>
      <mat-icon mat-card-avatar>play_circle</mat-icon>
      <mat-card-title>Trigger Pipeline Run</mat-card-title>
      <mat-card-subtitle>
        Runs full Bronze → Silver → Gold pipeline.
        Takes ~2-5 minutes.
      </mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
      <mat-form-field appearance="outline" class="reason-field">
        <mat-label>Reason / Notes</mat-label>
        <input matInput [formControl]="reasonCtrl"
               placeholder="e.g. Monthly payroll data refresh">
      </mat-form-field>
    </mat-card-content>
    <mat-card-actions>
      <button mat-raised-button color="primary"
              [disabled]="triggering || isRunning"
              (click)="trigger()">
        <mat-icon>rocket_launch</mat-icon>
        {{ triggering ? 'Triggering...' : 'Trigger Pipeline' }}
      </button>
    </mat-card-actions>
  </mat-card>

  <!-- ── Active Run Status ─────────────────────────────── -->
  <mat-card *ngIf="activeRun" class="status-card"
            [class]="'status-' + activeRun.status.toLowerCase()">
    <mat-card-header>
      <mat-icon mat-card-avatar>
        {{ statusIcon(activeRun.status) }}
      </mat-icon>
      <mat-card-title>
        Run #{{ activeRun.runId }} — {{ activeRun.status }}
      </mat-card-title>
      <mat-card-subtitle>
        {{ activeRun.message || 'Pipeline executing on Databricks...' }}
      </mat-card-subtitle>
    </mat-card-header>

    <!-- Progress bar while running -->
    <mat-progress-bar
      *ngIf="isRunning"
      mode="indeterminate"
      color="primary">
    </mat-progress-bar>

    <mat-card-content style="margin-top:16px">
      <div class="run-meta">
        <span><strong>Started:</strong>  {{ activeRun.startTime  || '—' }}</span>
        <span><strong>Finished:</strong> {{ activeRun.endTime    || '—' }}</span>
        <span><strong>Status:</strong>
          <mat-chip [class]="'chip-' + activeRun.status.toLowerCase()">
            {{ activeRun.status }}
          </mat-chip>
        </span>
      </div>

      <div *ngIf="isRunning" class="polling-note">
        <mat-icon>sync</mat-icon>
        Polling status every 5 seconds...
      </div>
    </mat-card-content>
  </mat-card>

  <!-- ── Medallion Pipeline Visual ─────────────────────── -->
  <mat-card class="pipeline-visual-card">
    <mat-card-header>
      <mat-card-title>Medallion Architecture</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <div class="pipeline-flow">

        <div class="pipeline-stage bronze">
          <div class="stage-icon">🥉</div>
          <div class="stage-name">BRONZE</div>
          <div class="stage-desc">Raw CSV / API ingestion</div>
          <div class="stage-table">silver.employees (raw)</div>
        </div>

        <div class="pipeline-arrow">
          <mat-icon>arrow_forward</mat-icon>
        </div>

        <div class="pipeline-stage silver">
          <div class="stage-icon">🥈</div>
          <div class="stage-name">SILVER</div>
          <div class="stage-desc">Cleansed + MERGE/upsert</div>
          <div class="stage-table">silver.employees</div>
        </div>

        <div class="pipeline-arrow">
          <mat-icon>arrow_forward</mat-icon>
        </div>

        <div class="pipeline-stage gold">
          <div class="stage-icon">🥇</div>
          <div class="stage-name">GOLD</div>
          <div class="stage-desc">Business aggregates</div>
          <div class="stage-table">gold.dept_salary_summary</div>
        </div>

      </div>
    </mat-card-content>
  </mat-card>

</div>
  `,
  styles: [`
    .pipeline-container  { padding:24px; max-width:900px; margin:0 auto; }
    h1                   { display:flex; align-items:center; gap:8px;
                           font-size:1.6rem; }
    .subtitle            { color:#555; margin-bottom:24px; }
    .trigger-card        { margin-bottom:20px; padding:8px; }
    .reason-field        { width:100%; margin-top:12px; }
    .status-card         { margin-bottom:20px; }
    .status-running      { border-left:4px solid #1565c0; }
    .status-succeeded    { border-left:4px solid #2e7d32; }
    .status-failed       { border-left:4px solid #c62828; }
    .run-meta            { display:flex; gap:24px; flex-wrap:wrap;
                           margin-bottom:12px; }
    .polling-note        { display:flex; align-items:center; gap:6px;
                           color:#1565c0; font-style:italic; }
    .chip-running        { background:#e3f2fd !important; color:#1565c0 !important; }
    .chip-succeeded      { background:#e8f5e9 !important; color:#2e7d32 !important; }
    .chip-failed         { background:#ffebee !important; color:#c62828 !important; }
    .pipeline-visual-card{ padding:16px; }
    .pipeline-flow       { display:flex; align-items:center;
                           justify-content:center; gap:8px;
                           flex-wrap:wrap; padding:20px 0; }
    .pipeline-stage      { text-align:center; padding:20px 24px;
                           border-radius:12px; min-width:180px; }
    .pipeline-stage.bronze{ background:#fff3e0; border:2px solid #ff9800; }
    .pipeline-stage.silver{ background:#f5f5f5; border:2px solid #9e9e9e; }
    .pipeline-stage.gold  { background:#fffde7; border:2px solid #fbc02d; }
    .stage-icon  { font-size:2rem; }
    .stage-name  { font-weight:700; font-size:1.1rem; margin:4px 0; }
    .stage-desc  { font-size:0.8rem; color:#555; }
    .stage-table { font-size:0.75rem; color:#888;
                   font-family:monospace; margin-top:6px; }
    .pipeline-arrow mat-icon { font-size:2rem; color:#bbb; }
  `]
})
export class PipelineComponent implements OnDestroy {

  private readonly svc   = inject(PipelineService);
  private readonly snack = inject(MatSnackBar);
  private readonly fb    = inject(FormBuilder);

  reasonCtrl = this.fb.control('');

  activeRun:  PipelineRun | null = null;
  triggering  = false;
  pollSub?:   Subscription;

  get isRunning(): boolean {
    return this.activeRun?.status === 'RUNNING'
        || this.activeRun?.status === 'PENDING';
  }

  trigger(): void {
    this.triggering = true;

    this.svc.trigger({
      reason:       this.reasonCtrl.value || 'manual-trigger',
      forceRefresh: true
    }).subscribe({
      next: run => {
        this.activeRun  = run;
        this.triggering = false;
        this.snack.open(`Pipeline started — Run #${run.runId}`,
          'OK', { duration: 3000 });
        this.startPolling(run.runId);
      },
      error: () => {
        this.triggering = false;
        this.snack.open('Failed to trigger pipeline', 'Dismiss',
          { duration: 4000 });
      }
    });
  }

  private startPolling(runId: number): void {
    this.pollSub?.unsubscribe();

    this.pollSub = this.svc.pollUntilComplete(runId).subscribe({
      next: run => {
        this.activeRun = run;

        if (run.status === 'SUCCEEDED') {
          this.snack.open('✅ Pipeline completed successfully!',
            'OK', { duration: 5000 });
        } else if (run.status === 'FAILED') {
          this.snack.open('❌ Pipeline failed. Check Databricks logs.',
            'Dismiss', { duration: 5000 });
        }
      },
      error: () => this.snack.open('Status polling error', 'Dismiss',
        { duration: 3000 })
    });
  }

  statusIcon(status: string): string {
    return { PENDING:'hourglass_empty', RUNNING:'sync',
             SUCCEEDED:'check_circle', FAILED:'error',
             UNKNOWN:'help' }[status] ?? 'info';
  }

  ngOnDestroy(): void {
    this.pollSub?.unsubscribe();
  }
}
