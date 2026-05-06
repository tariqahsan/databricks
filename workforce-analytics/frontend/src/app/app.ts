// ─── app.routes.ts ───────────────────────────────────────────────────
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',          redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component')
        .then(m => m.DashboardComponent),
    title: 'Dashboard'
  },
  {
    path: 'employees',
    loadComponent: () =>
      import('./components/employees/employee-list.component')
        .then(m => m.EmployeeListComponent),
    title: 'Employees'
  },
  {
    path: 'pipeline',
    loadComponent: () =>
      import('./components/pipeline/pipeline.component')
        .then(m => m.PipelineComponent),
    title: 'Pipeline'
  },
  { path: '**', redirectTo: 'dashboard' }
];


// ─── app.config.ts ───────────────────────────────────────────────────
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation }  from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync }           from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(),
    provideAnimationsAsync()
  ]
};


// ─── app.component.ts ────────────────────────────────────────────────
import { Component }          from '@angular/core';
import { CommonModule }       from '@angular/common';
import { RouterModule }       from '@angular/router';
import { MatToolbarModule }   from '@angular/material/toolbar';
import { MatSidenavModule }   from '@angular/material/sidenav';
import { MatListModule }      from '@angular/material/list';
import { MatIconModule }      from '@angular/material/icon';
import { MatButtonModule }    from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    MatToolbarModule, MatSidenavModule,
    MatListModule, MatIconModule, MatButtonModule
  ],
  template: `
<mat-sidenav-container class="app-container">

  <!-- ── Sidenav ────────────────────────────────────────── -->
  <mat-sidenav mode="side" opened class="sidenav">
    <div class="sidenav-header">
      <mat-icon class="logo-icon">shield</mat-icon>
      <div>
        <div class="app-name">DISA Workforce</div>
        <div class="app-sub">Analytics Platform</div>
      </div>
    </div>

    <mat-nav-list>
      <a mat-list-item routerLink="/dashboard"
         routerLinkActive="active-link">
        <mat-icon matListItemIcon>analytics</mat-icon>
        <span matListItemTitle>Dashboard</span>
      </a>
      <a mat-list-item routerLink="/employees"
         routerLinkActive="active-link">
        <mat-icon matListItemIcon>people</mat-icon>
        <span matListItemTitle>Employees</span>
      </a>
      <a mat-list-item routerLink="/pipeline"
         routerLinkActive="active-link">
        <mat-icon matListItemIcon>account_tree</mat-icon>
        <span matListItemTitle>Pipeline</span>
      </a>
    </mat-nav-list>

    <div class="sidenav-footer">
      <mat-icon>storage</mat-icon>
      <span>Databricks · AWS GovCloud</span>
    </div>
  </mat-sidenav>

  <!-- ── Main Content ────────────────────────────────────── -->
  <mat-sidenav-content>

    <!-- Top toolbar -->
    <mat-toolbar class="app-toolbar" color="primary">
      <span>DISA Workforce Analytics</span>
      <span class="spacer"></span>
      <span class="databricks-badge">
        <mat-icon>bolt</mat-icon> Databricks
      </span>
    </mat-toolbar>

    <!-- Router outlet -->
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>

  </mat-sidenav-content>
</mat-sidenav-container>
  `,
  styles: [`
    .app-container    { height:100vh; }
    .sidenav          { width:240px; background:#0d1b2a; color:white;
                        display:flex; flex-direction:column; }
    .sidenav-header   { display:flex; align-items:center; gap:12px;
                        padding:20px 16px; border-bottom:1px solid #1e3a5f; }
    .logo-icon        { font-size:32px; width:32px; height:32px;
                        color:#4fc3f7; }
    .app-name         { font-weight:700; font-size:1rem; color:white; }
    .app-sub          { font-size:0.7rem; color:#78909c; }
    mat-nav-list      { flex:1; padding-top:8px; }
    .active-link      { background:#1565c0 !important; border-radius:4px; }
    mat-list-item     { color:#b0bec5 !important; margin:2px 8px; }
    mat-icon[matListItemIcon] { color:#4fc3f7 !important; }
    .sidenav-footer   { padding:16px; border-top:1px solid #1e3a5f;
                        display:flex; align-items:center; gap:8px;
                        color:#546e7a; font-size:0.75rem; }
    .app-toolbar      { position:sticky; top:0; z-index:10; }
    .spacer           { flex:1; }
    .databricks-badge { display:flex; align-items:center; gap:4px;
                        background:rgba(255,255,255,0.15);
                        padding:4px 10px; border-radius:16px;
                        font-size:0.8rem; }
    .main-content     { min-height:calc(100vh - 64px); background:#f5f7fa; }
  `]
})
export class AppComponent {}
