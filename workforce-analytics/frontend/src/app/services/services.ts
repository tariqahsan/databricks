import { Injectable, inject }           from '@angular/core';
import { HttpClient, HttpParams }        from '@angular/common/http';
import { Observable, interval, switchMap,
         takeWhile, tap, catchError,
         throwError, shareReplay }       from 'rxjs';
import { map }                           from 'rxjs/operators';
import {
  ApiResponse, PagedResponse,
  Employee, EmployeeFormData,
  TransferRequest, BatchUploadRequest, BatchUploadResult,
  DashboardSummary, DeptSummary,
  LocationHeadcount, SalaryBand,
  PipelineRun, PipelineTriggerRequest
} from '../models/models';

const API = '/api';

// ─────────────────────────────────────────────────────────────────────
// EMPLOYEE SERVICE
// ─────────────────────────────────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class EmployeeService {

  private readonly http = inject(HttpClient);
  private readonly base = `${API}/employees`;

  /** Pattern 1 — READ paginated */
  getByDepartment(dept: string, page = 0, size = 25):
      Observable<PagedResponse<Employee>> {
    const params = new HttpParams()
      .set('dept', dept)
      .set('page', page)
      .set('size', size);
    return this.http.get<ApiResponse<PagedResponse<Employee>>>(
        this.base, { params })
      .pipe(map(r => r.data));
  }

  getById(id: string): Observable<Employee> {
    return this.http.get<ApiResponse<Employee>>(`${this.base}/${id}`)
      .pipe(map(r => r.data));
  }

  search(keyword?: string, dept?: string,
         location?: string, band?: string):
      Observable<Employee[]> {
    let params = new HttpParams();
    if (keyword)  params = params.set('keyword',  keyword);
    if (dept)     params = params.set('dept',     dept);
    if (location) params = params.set('location', location);
    if (band)     params = params.set('band',     band);

    return this.http.get<ApiResponse<Employee[]>>(
        `${this.base}/search`, { params })
      .pipe(map(r => r.data));
  }

  /** Pattern 1 — CREATE via MERGE */
  create(form: EmployeeFormData): Observable<Employee> {
    return this.http.post<ApiResponse<Employee>>(this.base, form)
      .pipe(map(r => r.data));
  }

  /** Pattern 1 — UPDATE via MERGE */
  update(id: string, form: EmployeeFormData): Observable<Employee> {
    return this.http.put<ApiResponse<Employee>>(
        `${this.base}/${id}`, form)
      .pipe(map(r => r.data));
  }

  /** Pattern 2 — SOFT DELETE */
  deactivate(id: string): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.base}/${id}`)
      .pipe(map(() => void 0));
  }

  /** Pattern 3 — TRANSFER (multi-table @Transactional) */
  transfer(request: TransferRequest): Observable<void> {
    return this.http.post<ApiResponse<void>>(
        `${this.base}/transfer`, request)
      .pipe(map(() => void 0));
  }

  /** Pattern 4 — BATCH UPSERT */
  batchUpload(request: BatchUploadRequest):
      Observable<BatchUploadResult> {
    return this.http.post<ApiResponse<BatchUploadResult>>(
        `${this.base}/batch`, request)
      .pipe(map(r => r.data));
  }
}


// ─────────────────────────────────────────────────────────────────────
// DASHBOARD SERVICE
// ─────────────────────────────────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class DashboardService {

  private readonly http = inject(HttpClient);
  private readonly base = `${API}/dashboard`;

  /** Single composite call — one round trip for whole dashboard */
  getSummary(): Observable<DashboardSummary> {
    return this.http.get<ApiResponse<DashboardSummary>>(
        `${this.base}/summary`)
      .pipe(
        map(r => r.data),
        shareReplay(1)           // share across multiple subscribers
      );
  }

  getDeptSummary(): Observable<DeptSummary[]> {
    return this.http.get<ApiResponse<DeptSummary[]>>(
        `${this.base}/departments`)
      .pipe(map(r => r.data));
  }

  getLocations(): Observable<LocationHeadcount[]> {
    return this.http.get<ApiResponse<LocationHeadcount[]>>(
        `${this.base}/locations`)
      .pipe(map(r => r.data));
  }

  getSalaryBands(): Observable<SalaryBand[]> {
    return this.http.get<ApiResponse<SalaryBand[]>>(
        `${this.base}/salary-bands`)
      .pipe(map(r => r.data));
  }
}


// ─────────────────────────────────────────────────────────────────────
// PIPELINE SERVICE
// ─────────────────────────────────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class PipelineService {

  private readonly http = inject(HttpClient);
  private readonly base = `${API}/pipeline`;

  trigger(request: PipelineTriggerRequest): Observable<PipelineRun> {
    return this.http.post<ApiResponse<PipelineRun>>(
        `${this.base}/trigger`, request)
      .pipe(map(r => r.data));
  }

  getStatus(runId: number): Observable<PipelineRun> {
    return this.http.get<ApiResponse<PipelineRun>>(
        `${this.base}/status/${runId}`)
      .pipe(map(r => r.data));
  }

  /**
   * Poll pipeline status every 5s until terminal state.
   * Angular component subscribes → auto-updates UI.
   */
  pollUntilComplete(runId: number): Observable<PipelineRun> {
    const TERMINAL = new Set(['SUCCEEDED', 'FAILED', 'UNKNOWN', 'TIMEOUT']);

    return interval(5000).pipe(
      switchMap(() => this.getStatus(runId)),
      takeWhile(run => !TERMINAL.has(run.status), true),
      catchError(err => {
        console.error('Pipeline poll error:', err);
        return throwError(() => err);
      })
    );
  }
}
