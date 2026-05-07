import { Injectable, inject }     from '@angular/core';
import { HttpClient, HttpParams }  from '@angular/common/http';
import { Observable }              from 'rxjs';
import { map, shareReplay }        from 'rxjs/operators';
import {
  ApiResponse, PlatformSummary,
  AppHealthKpis, AppHealthSummary, AppHealthTrend,
  DeviceHealthKpis, DeviceHealthSummary,
  NetworkKpis, NetworkPerformanceSummary, DnsMetrics,
  IssuesKpis, VersionSprawlKpis,
  DataSourceStatus, IngestionPipelineRun
} from '../models/models';

const API = '/api';

// ─────────────────────────────────────────────────────────────────────
// PLATFORM SERVICE  — composite dashboard load
// ─────────────────────────────────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class PlatformService {
  private http = inject(HttpClient);

  getSummary(): Observable<PlatformSummary> {
    return this.http.get<ApiResponse<PlatformSummary>>(
        `${API}/platform/summary`)
      .pipe(map(r => r.data), shareReplay(1));
  }
}

// ─────────────────────────────────────────────────────────────────────
// APP HEALTH SERVICE  — Aternity
// ─────────────────────────────────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class AppHealthService {
  private http = inject(HttpClient);

  getKpis(): Observable<AppHealthKpis> {
    return this.http.get<ApiResponse<AppHealthKpis>>(
        `${API}/app-health/kpis`).pipe(map(r => r.data));
  }

  getAll(): Observable<AppHealthSummary[]> {
    return this.http.get<ApiResponse<AppHealthSummary[]>>(
        `${API}/app-health`).pipe(map(r => r.data));
  }

  getTrend(appName: string, hours = 24): Observable<AppHealthTrend[]> {
    return this.http.get<ApiResponse<AppHealthTrend[]>>(
        `${API}/app-health/${encodeURIComponent(appName)}/trend`,
        { params: new HttpParams().set('hours', hours) })
      .pipe(map(r => r.data));
  }
}

// ─────────────────────────────────────────────────────────────────────
// DEVICE HEALTH SERVICE  — Intune
// ─────────────────────────────────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class DeviceHealthService {
  private http = inject(HttpClient);

  getKpis(): Observable<DeviceHealthKpis> {
    return this.http.get<ApiResponse<DeviceHealthKpis>>(
        `${API}/device-health/kpis`).pipe(map(r => r.data));
  }

  getAll(compliance?: string, page = 0, size = 50):
      Observable<DeviceHealthSummary[]> {
    let params = new HttpParams()
      .set('page', page).set('size', size);
    if (compliance) params = params.set('compliance', compliance);
    return this.http.get<ApiResponse<DeviceHealthSummary[]>>(
        `${API}/device-health`, { params }).pipe(map(r => r.data));
  }
}

// ─────────────────────────────────────────────────────────────────────
// NETWORK PERFORMANCE SERVICE  — NetScout + Infoblox
// ─────────────────────────────────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class NetworkPerformanceService {
  private http = inject(HttpClient);

  getKpis(): Observable<NetworkKpis> {
    return this.http.get<ApiResponse<NetworkKpis>>(
        `${API}/network-performance/kpis`).pipe(map(r => r.data));
  }

  getSegments(type?: string): Observable<NetworkPerformanceSummary[]> {
    let params = new HttpParams();
    if (type) params = params.set('type', type);
    return this.http.get<ApiResponse<NetworkPerformanceSummary[]>>(
        `${API}/network-performance/segments`, { params })
      .pipe(map(r => r.data));
  }

  getDns(): Observable<DnsMetrics[]> {
    return this.http.get<ApiResponse<DnsMetrics[]>>(
        `${API}/network-performance/dns`).pipe(map(r => r.data));
  }
}

// ─────────────────────────────────────────────────────────────────────
// TOP ISSUES SERVICE  — ScienceLogic + Salesforce
// ─────────────────────────────────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class TopIssuesService {
  private http = inject(HttpClient);

  getKpis(): Observable<IssuesKpis> {
    return this.http.get<ApiResponse<IssuesKpis>>(
        `${API}/top-issues/kpis`).pipe(map(r => r.data));
  }
}

// ─────────────────────────────────────────────────────────────────────
// VERSION SPRAWL SERVICE  — Intune + Aternity
// ─────────────────────────────────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class VersionSprawlService {
  private http = inject(HttpClient);

  getKpis(): Observable<VersionSprawlKpis> {
    return this.http.get<ApiResponse<VersionSprawlKpis>>(
        `${API}/version-sprawl/kpis`).pipe(map(r => r.data));
  }
}

// ─────────────────────────────────────────────────────────────────────
// DATA SOURCES SERVICE  — Ingestion pipeline
// ─────────────────────────────────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class DataSourcesService {
  private http = inject(HttpClient);

  getStatuses(): Observable<DataSourceStatus[]> {
    return this.http.get<ApiResponse<DataSourceStatus[]>>(
        `${API}/data-sources`).pipe(map(r => r.data));
  }

  triggerIngestion(source?: string, reason?: string):
      Observable<IngestionPipelineRun> {
    let params = new HttpParams();
    if (source) params = params.set('source', source);
    if (reason) params = params.set('reason', reason);
    return this.http.post<ApiResponse<IngestionPipelineRun>>(
        `${API}/data-sources/ingest`, null, { params })
      .pipe(map(r => r.data));
  }
}
