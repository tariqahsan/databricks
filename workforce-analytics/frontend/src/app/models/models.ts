// ─────────────────────────────────────────────────────────────────────
// employee.model.ts
// ─────────────────────────────────────────────────────────────────────

export interface Employee {
  employeeId:   string;
  firstName:    string;
  lastName:     string;
  fullName:     string;
  department:   string;
  jobTitle:     string;
  salary:       number;
  salaryBand:   string;
  hireDate:     string;
  location:     string;
  status:       string;
  processedAt?: string;
}

export interface EmployeeFormData {
  firstName:   string;
  lastName:    string;
  department:  string;
  jobTitle:    string;
  salary:      number;
  hireDate:    string;
  location:    string;
  status?:     string;
}

export interface TransferRequest {
  employeeId:      string;
  fromDepartment:  string;
  toDepartment:    string;
  reason?:         string;
}

export interface BatchUploadRequest {
  employees:      Employee[];
  uploadedBy:     string;
  batchReference: string;
}

export interface BatchUploadResult {
  totalSubmitted: number;
  inserted:       number;
  updated:        number;
  rejected:       number;
  batchReference: string;
  errors:         string[];
}

// ─────────────────────────────────────────────────────────────────────
// dashboard.model.ts
// ─────────────────────────────────────────────────────────────────────

export interface DeptSummary {
  department:       string;
  deptName:         string;
  division:         string;
  headcount:        number;
  avgSalary:        number;
  totalPayroll:     number;
  maxSalary:        number;
  minSalary:        number;
  medianSalary:     number;
  avgSalaryPctOfMax: number;
}

export interface LocationHeadcount {
  location:   string;
  headcount:  number;
  avgSalary:  number;
  deptCount:  number;
}

export interface SalaryBand {
  salaryBand:     string;
  employeeCount:  number;
  avgSalary:      number;
  totalPayroll:   number;
}

export interface DashboardSummary {
  departments: DeptSummary[];
  locations:   LocationHeadcount[];
  salaryBands: SalaryBand[];
}

// ─────────────────────────────────────────────────────────────────────
// api.model.ts
// ─────────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  success:   boolean;
  message:   string;
  data:      T;
  timestamp: string;
}

export interface PagedResponse<T> {
  content:       T[];
  page:          number;
  size:          number;
  totalElements: number;
  totalPages:    number;
  last:          boolean;
}

export interface PipelineRun {
  runId:     number;
  status:    'PENDING' | 'RUNNING' | 'SUCCEEDED' | 'FAILED' | 'UNKNOWN';
  startTime: string;
  endTime:   string;
  message:   string;
}

export interface PipelineTriggerRequest {
  reason:        string;
  forceRefresh:  boolean;
}

export type PipelineStatus = PipelineRun['status'];
