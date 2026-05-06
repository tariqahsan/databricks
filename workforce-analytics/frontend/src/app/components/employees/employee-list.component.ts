import { Component, OnInit, inject }        from '@angular/core';
import { CommonModule }                       from '@angular/common';
import { ReactiveFormsModule, FormBuilder,
         Validators }                         from '@angular/forms';
import { MatTableModule }                     from '@angular/material/table';
import { MatPaginatorModule, PageEvent }      from '@angular/material/paginator';
import { MatInputModule }                     from '@angular/material/input';
import { MatSelectModule }                    from '@angular/material/select';
import { MatButtonModule }                    from '@angular/material/button';
import { MatIconModule }                      from '@angular/material/icon';
import { MatCardModule }                      from '@angular/material/card';
import { MatDialogModule, MatDialog }         from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule }     from '@angular/material/snack-bar';
import { MatChipsModule }                     from '@angular/material/chips';
import { MatProgressSpinnerModule }           from '@angular/material/progress-spinner';
import { MatProgressBarModule }               from '@angular/material/progress-bar';
import { MatFormFieldModule }                 from '@angular/material/form-field';
import { EmployeeService }                    from '../../services/services';
import { Employee, PagedResponse }            from '../../models/models';

// ─────────────────────────────────────────────────────────────────────
// EMPLOYEE LIST COMPONENT
// ─────────────────────────────────────────────────────────────────────
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatTableModule, MatPaginatorModule, MatInputModule,
    MatSelectModule, MatButtonModule, MatIconModule,
    MatCardModule, MatSnackBarModule, MatChipsModule,
    MatProgressSpinnerModule, MatProgressBarModule,
    MatFormFieldModule, MatDialogModule
  ],
  template: `
<div class="emp-container">

  <!-- Header -->
  <div class="emp-header">
    <h1><mat-icon>people</mat-icon> Employee Directory</h1>
    <button mat-raised-button color="primary" (click)="openCreateForm()">
      <mat-icon>person_add</mat-icon> Add Employee
    </button>
  </div>

  <!-- Search Filters -->
  <mat-card class="filter-card">
    <form [formGroup]="filterForm" (ngSubmit)="applySearch()" class="filter-form">

      <mat-form-field appearance="outline">
        <mat-label>Search name / title</mat-label>
        <input matInput formControlName="keyword">
        <mat-icon matSuffix>search</mat-icon>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Department</mat-label>
        <mat-select formControlName="dept">
          <mat-option value="">All</mat-option>
          <mat-option *ngFor="let d of departments" [value]="d">{{ d }}</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Location</mat-label>
        <mat-select formControlName="location">
          <mat-option value="">All</mat-option>
          <mat-option *ngFor="let l of locations" [value]="l">{{ l }}</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Salary Band</mat-label>
        <mat-select formControlName="band">
          <mat-option value="">All</mat-option>
          <mat-option *ngFor="let b of salaryBands" [value]="b">{{ b }}</mat-option>
        </mat-select>
      </mat-form-field>

      <div class="filter-actions">
        <button mat-raised-button color="primary" type="submit">Search</button>
        <button mat-button type="button" (click)="clearFilters()">Clear</button>
      </div>

    </form>
  </mat-card>

  <!-- Progress bar for loading -->
  <mat-progress-bar *ngIf="loading" mode="indeterminate"></mat-progress-bar>

  <!-- Table -->
  <mat-card class="table-card">
    <table mat-table [dataSource]="employees" class="emp-table">

      <ng-container matColumnDef="fullName">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let e">
          <strong>{{ e.fullName }}</strong>
        </td>
      </ng-container>

      <ng-container matColumnDef="department">
        <th mat-header-cell *matHeaderCellDef>Department</th>
        <td mat-cell *matCellDef="let e">{{ e.department }}</td>
      </ng-container>

      <ng-container matColumnDef="jobTitle">
        <th mat-header-cell *matHeaderCellDef>Title</th>
        <td mat-cell *matCellDef="let e">{{ e.jobTitle }}</td>
      </ng-container>

      <ng-container matColumnDef="salary">
        <th mat-header-cell *matHeaderCellDef>Salary</th>
        <td mat-cell *matCellDef="let e">
          {{ e.salary | currency:'USD':'symbol':'1.0-0' }}
        </td>
      </ng-container>

      <ng-container matColumnDef="salaryBand">
        <th mat-header-cell *matHeaderCellDef>Band</th>
        <td mat-cell *matCellDef="let e">
          <span class="band-chip" [class]="bandClass(e.salaryBand)">
            {{ e.salaryBand?.replace('BAND_', '') }}
          </span>
        </td>
      </ng-container>

      <ng-container matColumnDef="location">
        <th mat-header-cell *matHeaderCellDef>Location</th>
        <td mat-cell *matCellDef="let e">{{ e.location }}</td>
      </ng-container>

      <ng-container matColumnDef="status">
        <th mat-header-cell *matHeaderCellDef>Status</th>
        <td mat-cell *matCellDef="let e">
          <span [class]="'status-' + e.status?.toLowerCase()">
            {{ e.status }}
          </span>
        </td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let e">
          <button mat-icon-button title="Edit"
                  (click)="openEditForm(e)">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button title="Transfer"
                  (click)="openTransferForm(e)">
            <mat-icon>swap_horiz</mat-icon>
          </button>
          <button mat-icon-button color="warn" title="Deactivate"
                  (click)="confirmDeactivate(e)">
            <mat-icon>person_off</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="columns"></tr>
      <tr mat-row *matRowDef="let row; columns: columns;"></tr>

      <tr class="mat-row" *matNoDataRow>
        <td class="mat-cell no-data" [attr.colspan]="columns.length">
          {{ loading ? 'Loading...' : 'No employees found' }}
        </td>
      </tr>

    </table>

    <mat-paginator
      [length]="totalElements"
      [pageSize]="pageSize"
      [pageSizeOptions]="[10, 25, 50]"
      (page)="onPageChange($event)">
    </mat-paginator>
  </mat-card>

</div>
  `,
  styles: [`
    .emp-container  { padding:24px; max-width:1400px; margin:0 auto; }
    .emp-header     { display:flex; justify-content:space-between;
                      align-items:center; margin-bottom:20px; }
    .emp-header h1  { display:flex; align-items:center; gap:8px;
                      font-size:1.6rem; margin:0; }
    .filter-card    { padding:16px; margin-bottom:16px; }
    .filter-form    { display:flex; flex-wrap:wrap; gap:12px; align-items:center; }
    .filter-form mat-form-field { flex:1; min-width:160px; }
    .filter-actions { display:flex; gap:8px; }
    .table-card     { overflow:hidden; }
    .emp-table      { width:100%; }
    .band-chip      { padding:3px 8px; border-radius:12px;
                      font-size:0.75rem; font-weight:600; }
    .band-1         { background:#e3f2fd; color:#1565c0; }
    .band-2         { background:#e8f5e9; color:#2e7d32; }
    .band-3         { background:#fff8e1; color:#f57f17; }
    .band-4         { background:#fce4ec; color:#ad1457; }
    .band-5         { background:#f3e5f5; color:#6a1b9a; }
    .status-active  { color:#2e7d32; font-weight:600; }
    .status-inactive{ color:#c62828; }
    .no-data        { text-align:center; padding:32px; color:#666; }
  `]
})
export class EmployeeListComponent implements OnInit {

  private readonly svc      = inject(EmployeeService);
  private readonly snack    = inject(MatSnackBar);
  private readonly dialog   = inject(MatDialog);
  private readonly fb       = inject(FormBuilder);

  columns = ['fullName','department','jobTitle','salary',
             'salaryBand','location','status','actions'];

  employees:     Employee[] = [];
  totalElements  = 0;
  pageSize       = 25;
  currentPage    = 0;
  loading        = false;
  searchMode     = false;

  departments  = ['IT','CYBERSECURITY','FINANCE','HR','OPERATIONS'];
  locations    = ['Arlington VA','Fort Meade MD','Pentagon DC','Remote'];
  salaryBands  = ['BAND_1_ENTRY','BAND_2_MID','BAND_3_SENIOR',
                  'BAND_4_LEAD','BAND_5_EXEC'];

  filterForm = this.fb.group({
    keyword:  [''],
    dept:     [''],
    location: [''],
    band:     ['']
  });

  ngOnInit(): void {
    this.loadPage('IT', 0);
  }

  loadPage(dept: string, page: number): void {
    this.loading = true;
    this.svc.getByDepartment(dept, page, this.pageSize).subscribe({
      next: (r: PagedResponse<Employee>) => {
        this.employees     = r.content;
        this.totalElements = r.totalElements;
        this.loading       = false;
      },
      error: () => { this.loading = false; }
    });
  }

  applySearch(): void {
    const { keyword, dept, location, band } = this.filterForm.value;
    this.loading = true;
    this.svc.search(keyword || undefined, dept || undefined,
                    location || undefined, band || undefined).subscribe({
      next: employees => {
        this.employees     = employees;
        this.totalElements = employees.length;
        this.searchMode    = true;
        this.loading       = false;
      },
      error: () => { this.loading = false; }
    });
  }

  clearFilters(): void {
    this.filterForm.reset();
    this.searchMode = false;
    this.loadPage('IT', 0);
  }

  onPageChange(e: PageEvent): void {
    this.currentPage = e.pageIndex;
    this.pageSize    = e.pageSize;
    const dept = this.filterForm.value.dept || 'IT';
    this.loadPage(dept, e.pageIndex);
  }

  openCreateForm(): void {
    // In a real app: open MatDialog with EmployeeFormComponent
    this.snack.open('Open Create Employee dialog', 'OK', { duration: 2000 });
  }

  openEditForm(emp: Employee): void {
    this.snack.open(`Edit: ${emp.fullName}`, 'OK', { duration: 2000 });
  }

  openTransferForm(emp: Employee): void {
    this.snack.open(`Transfer: ${emp.fullName}`, 'OK', { duration: 2000 });
  }

  confirmDeactivate(emp: Employee): void {
    if (!confirm(`Deactivate ${emp.fullName}?`)) return;
    this.svc.deactivate(emp.employeeId).subscribe({
      next: () => {
        this.snack.open(`${emp.fullName} deactivated`, 'OK', { duration: 3000 });
        this.employees = this.employees.filter(
          e => e.employeeId !== emp.employeeId);
      },
      error: () => this.snack.open('Deactivate failed', 'Dismiss',
        { duration: 3000 })
    });
  }

  bandClass(band: string): string {
    const n = band?.match(/\d/)?.[0] || '1';
    return `band-${n}`;
  }
}
