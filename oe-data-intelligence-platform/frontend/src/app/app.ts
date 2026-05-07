// ── app.routes.ts ─────────────────────────────────────────────────────
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component')
        .then(m => m.DashboardComponent),
    title: 'OE Intelligence — Dashboard'
  },
  {
    path: 'app-health',
    loadComponent: () =>
      import('./components/app-health/app-health.component')
        .then(m => m.AppHealthComponent),
    title: 'App Health'
  },
  {
    path: 'device-health',
    loadComponent: () =>
      import('./components/device-health/device-health.component')
        .then(m => m.DeviceHealthComponent),
    title: 'Device Health'
  },
  {
    path: 'network-performance',
    loadComponent: () =>
      import('./components/network-performance/network-performance.component')
        .then(m => m.NetworkPerformanceComponent),
    title: 'Network Performance'
  },
  {
    path: 'top-issues',
    loadComponent: () =>
      import('./components/top-issues/top-issues.component')
        .then(m => m.TopIssuesComponent),
    title: 'Top Issues'
  },
  {
    path: 'version-sprawl',
    loadComponent: () =>
      import('./components/version-sprawl/version-sprawl.component')
        .then(m => m.VersionSprawlComponent),
    title: 'Version Sprawl'
  },
  {
    path: 'data-sources',
    loadComponent: () =>
      import('./components/data-sources/data-sources.component')
        .then(m => m.DataSourcesComponent),
    title: 'Data Sources'
  },
  { path: '**', redirectTo: 'dashboard' }
];


// ── app.config.ts ──────────────────────────────────────────────────────
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter }          from '@angular/router';
import { provideHttpClient }      from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync()
  ]
};


// ── app.component.ts ────────────────────────────────────────────────────
import { Component }           from '@angular/core';
import { CommonModule }        from '@angular/common';
import { RouterModule }        from '@angular/router';
import { MatToolbarModule }    from '@angular/material/toolbar';
import { MatSidenavModule }    from '@angular/material/sidenav';
import { MatListModule }       from '@angular/material/list';
import { MatIconModule }       from '@angular/material/icon';
import { MatBadgeModule }      from '@angular/material/badge';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, RouterModule,
    MatToolbarModule, MatSidenavModule,
    MatListModule, MatIconModule, MatBadgeModule
  ],
  template: `
<mat-sidenav-container class="app-shell">

  <!-- ── Sidenav ─────────────────────────────────────────── -->
  <mat-sidenav mode="side" opened class="sidenav">

    <div class="sidenav-brand">
      <div class="brand-logo">
        <mat-icon>hub</mat-icon>
      </div>
      <div>
        <div class="brand-name">OE Intelligence</div>
        <div class="brand-sub">DISA Operations Engineering</div>
      </div>
    </div>

    <div class="nav-section-label">PRODUCTS</div>
    <mat-nav-list>
      <a mat-list-item routerLink="/dashboard"
         routerLinkActive="nav-active">
        <mat-icon matListItemIcon>dashboard</mat-icon>
        <span matListItemTitle>Overview</span>
      </a>
      <a mat-list-item routerLink="/app-health"
         routerLinkActive="nav-active">
        <mat-icon matListItemIcon>apps</mat-icon>
        <span matListItemTitle>App Health</span>
        <span matListItemMeta class="nav-source">Aternity</span>
      </a>
      <a mat-list-item routerLink="/device-health"
         routerLinkActive="nav-active">
        <mat-icon matListItemIcon>devices</mat-icon>
        <span matListItemTitle>Device Health</span>
        <span matListItemMeta class="nav-source">Intune</span>
      </a>
      <a mat-list-item routerLink="/network-performance"
         routerLinkActive="nav-active">
        <mat-icon matListItemIcon>network_check</mat-icon>
        <span matListItemTitle>Network Performance</span>
        <span matListItemMeta class="nav-source">NetScout</span>
      </a>
      <a mat-list-item routerLink="/top-issues"
         routerLinkActive="nav-active">
        <mat-icon matListItemIcon>warning_amber</mat-icon>
        <span matListItemTitle>Top Issues</span>
        <span matListItemMeta class="nav-source">ScienceLogic</span>
      </a>
      <a mat-list-item routerLink="/version-sprawl"
         routerLinkActive="nav-active">
        <mat-icon matListItemIcon>account_tree</mat-icon>
        <span matListItemTitle>Version Sprawl</span>
        <span matListItemMeta class="nav-source">Intune</span>
      </a>
    </mat-nav-list>

    <div class="nav-section-label">PLATFORM</div>
    <mat-nav-list>
      <a mat-list-item routerLink="/data-sources"
         routerLinkActive="nav-active">
        <mat-icon matListItemIcon>storage</mat-icon>
        <span matListItemTitle>Data Sources</span>
      </a>
    </mat-nav-list>

    <div class="sidenav-footer">
      <div class="stack-badge">
        <mat-icon>bolt</mat-icon>
        Databricks · AWS GovCloud
      </div>
      <div class="stack-badge" style="margin-top:4px">
        <mat-icon>code</mat-icon>
        Spring Boot 4 · Angular 21
      </div>
    </div>

  </mat-sidenav>

  <!-- ── Main ─────────────────────────────────────────────── -->
  <mat-sidenav-content>
    <mat-toolbar class="app-toolbar" color="primary">
      <span class="toolbar-title">
        DISA OE Data Intelligence Platform
      </span>
      <span class="spacer"></span>
      <span class="env-badge">AWS GovCloud POC</span>
    </mat-toolbar>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  </mat-sidenav-content>

</mat-sidenav-container>
  `,
  styles: [`
    .app-shell      { height:100vh; }
    .sidenav        { width:248px; background:#0a1628;
                      display:flex; flex-direction:column; }
    .sidenav-brand  { display:flex; align-items:center; gap:12px;
                      padding:20px 16px 16px;
                      border-bottom:1px solid #1a2f4a; }
    .brand-logo     { width:36px; height:36px; border-radius:8px;
                      background:#1565c0; display:flex;
                      align-items:center; justify-content:center; }
    .brand-logo mat-icon { color:white; font-size:20px; }
    .brand-name     { font-weight:700; color:white; font-size:.95rem; }
    .brand-sub      { font-size:.68rem; color:#4fc3f7; margin-top:1px; }

    .nav-section-label { font-size:.65rem; font-weight:700;
                         color:#37474f; letter-spacing:.1em;
                         padding:16px 16px 4px; }
    mat-nav-list        { padding:0 8px !important; }
    mat-list-item       { color:#90a4ae !important;
                          border-radius:6px !important;
                          margin:1px 0 !important; }
    .nav-active         { background:#1565c0 !important;
                          color:white !important; }
    .nav-active mat-icon{ color:white !important; }
    mat-icon[matListItemIcon]{ color:#4fc3f7 !important; }
    .nav-source         { font-size:.65rem; color:#546e7a; }

    .sidenav-footer     { margin-top:auto; padding:12px 16px;
                          border-top:1px solid #1a2f4a; }
    .stack-badge        { display:flex; align-items:center; gap:6px;
                          color:#37474f; font-size:.7rem; }
    .stack-badge mat-icon{ font-size:14px; width:14px; height:14px; }

    .app-toolbar        { position:sticky; top:0; z-index:10; }
    .toolbar-title      { font-weight:600; font-size:1rem; }
    .spacer             { flex:1; }
    .env-badge          { background:rgba(255,255,255,.15);
                          padding:4px 12px; border-radius:16px;
                          font-size:.75rem; }
    .main-content       { min-height:calc(100vh - 64px);
                          background:#f0f3f8; }
  `]
})
export class AppComponent {}
