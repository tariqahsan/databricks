# DISA Workforce Analytics — Full Stack
### Spring Boot 3 / JDK 21 + Angular 18 + Databricks (AWS GovCloud)

---

## Architecture

```
Angular 18 (SPA)
  └── HTTP → Spring Boot 3 API (port 8090)
               ├── JdbcTemplate  → Databricks SQL Warehouse (JDBC)
               └── RestClient    → Databricks REST API (job mgmt)
                                        └── Delta Lake (AWS S3)
```

## Transaction Patterns Implemented

| Pattern | Where | Code |
|---|---|---|
| MERGE upsert | EmployeeRepository.upsert() | Delta MERGE INTO |
| Soft delete | EmployeeRepository.deactivate() | MERGE → status=INACTIVE |
| Multi-table @Transactional | EmployeeRepository.transfer() | JDBC tx wraps 2 writes |
| Batch batchUpdate | EmployeeRepository.batchUpsert() | 500-row chunks |
| REST pipeline trigger | PipelineService.triggerPipeline() | Databricks Workflows API |
| Post-commit event | @TransactionalEventListener | Fires AFTER JDBC commit |

---

## Quick Start

### Backend
```bash
cd backend

# Set env vars (.env or export):
export DATABRICKS_HOST=your-workspace.databricks.com
export DATABRICKS_TOKEN=dapi...
export DATABRICKS_HTTP_PATH=/sql/1.0/warehouses/xxx
export DATABRICKS_WAREHOUSE_ID=xxx
export DATABRICKS_PIPELINE_JOB_ID=1001

mvn spring-boot:run
# API running at http://localhost:8090
```

### Frontend
```bash
cd frontend
npm install
npm start
# App running at http://localhost:4200
```

---

## API Endpoints

### Dashboard (Gold layer — cached 5 min)
```
GET  /api/dashboard/summary        All dashboard data in one call
GET  /api/dashboard/departments    Dept salary summaries
GET  /api/dashboard/locations      Headcount by location
GET  /api/dashboard/salary-bands   Band distribution
```

### Employees (Silver layer — CRUD)
```
GET  /api/employees?dept=IT&page=0&size=25   Paginated list
GET  /api/employees/{id}                     Single record
GET  /api/employees/search?keyword=Smith     Full-text search
POST /api/employees                          Create (MERGE)
PUT  /api/employees/{id}                     Update (MERGE)
DEL  /api/employees/{id}                     Soft delete
POST /api/employees/transfer                 Dept transfer
POST /api/employees/batch                    Batch upsert
```

### Pipeline (Databricks Workflows)
```
POST /api/pipeline/trigger          Trigger full pipeline
GET  /api/pipeline/status/{runId}   Poll job status
```

---

## Angular Pages

| Route | Component | Description |
|---|---|---|
| `/dashboard` | DashboardComponent | KPIs, charts, dept table |
| `/employees` | EmployeeListComponent | CRUD, search, transfer |
| `/pipeline` | PipelineComponent | Trigger & monitor runs |

---

## Key Files

```
backend/src/main/java/com/disa/workforce/
  ├── repository/EmployeeRepository.java   ← All 4 write patterns
  ├── repository/DashboardRepository.java  ← Gold layer reads
  ├── service/EmployeeService.java         ← Business logic + cache evict
  ├── service/Services.java                ← DashboardService + PipelineService
  ├── controller/Controllers.java          ← All REST endpoints
  └── event/EmployeeUpdatedEvent.java      ← Post-commit pipeline trigger

frontend/src/app/
  ├── services/services.ts                 ← 3 Angular services
  ├── components/dashboard/                ← Charts + KPIs
  ├── components/employees/                ← CRUD table
  └── components/pipeline/                 ← Job monitoring
```
