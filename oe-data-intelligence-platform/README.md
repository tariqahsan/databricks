# DISA OE Data Intelligence Platform — POC
### Angular 21 · Spring Boot 4.0.5 · Databricks (AWS GovCloud)

---

## Platform Overview

```
DATA SOURCES              BRONZE → SILVER → GOLD          PRODUCTS
────────────────          ──────────────────────────       ────────────────────
Aternity            →     raw_aternity                →    App Health
NetScout            →     raw_netscout                →    Network Performance
Microsoft Intune    →     raw_intune                  →    Device Health
Infoblox            →     raw_infoblox                →    (DNS merged into Net.)
Salesforce          →     raw_salesforce              →    Top Issues
ScienceLogic        →     raw_sciencelogic            →    Top Issues / Infra
```

---

## Running the Stack

### Backend — Spring Boot 4.0.5
```bash
cd backend

# Required: place these in backend/libs/
#   DatabricksJDBC42.jar  → from databricks.com/spark/jdbc-drivers
#   caffeine-3.1.8.jar    → run: .\scripts\download-libs.ps1

export DATABRICKS_HOST=your-workspace.databricks.com
export DATABRICKS_TOKEN=dapi...
export DATABRICKS_HTTP_PATH=/sql/1.0/warehouses/xxx
export DATABRICKS_WAREHOUSE_ID=xxx
export DATABRICKS_PIPELINE_JOB_ID=2001

mvn clean install -DskipTests
mvn spring-boot:run
# API at: http://localhost:8091
```

### Frontend — Angular 21
```bash
cd frontend
npm install
npm start
# UI at: http://localhost:4200
```

---

## API Endpoints

| Endpoint | Description | Data Source |
|---|---|---|
| `GET /api/platform/summary` | Full dashboard (all KPIs) | All sources |
| `GET /api/app-health/kpis` | App health KPIs | Aternity |
| `GET /api/app-health` | All applications | Aternity |
| `GET /api/app-health/{name}/trend` | App trend over time | Aternity |
| `GET /api/device-health/kpis` | Device health KPIs | Intune |
| `GET /api/device-health` | Device list | Intune |
| `GET /api/network-performance/kpis` | Network KPIs + root cause | NetScout/Infoblox |
| `GET /api/network-performance/segments` | Segment detail | NetScout |
| `GET /api/network-performance/dns` | DNS metrics | Infoblox |
| `GET /api/top-issues/kpis` | Issues KPIs | ScienceLogic/Salesforce |
| `GET /api/version-sprawl/kpis` | Version sprawl KPIs | Intune/Aternity |
| `GET /api/data-sources` | Ingestion pipeline status | All |
| `POST /api/data-sources/ingest` | Trigger ingestion | Databricks Workflows |

---

## Databricks Gold Tables Required

```sql
-- App Health (from Aternity)
CREATE TABLE gold.app_health_summary (...);
CREATE TABLE gold.app_health_trend (...);

-- Device Health (from Intune)
CREATE TABLE gold.device_health_summary (...);

-- Network Performance (from NetScout/Infoblox)
CREATE TABLE gold.network_performance_summary (...);
CREATE TABLE gold.packet_loss_root_cause (...);
CREATE TABLE gold.network_trend (...);
CREATE TABLE gold.dns_metrics (...);

-- Top Issues (from ScienceLogic/Salesforce)
CREATE TABLE gold.top_issues_summary (...);
CREATE TABLE gold.issue_trends (...);

-- Version Sprawl (from Intune/Aternity)
CREATE TABLE gold.version_sprawl_summary (...);

-- Platform
CREATE TABLE gold.data_source_ingestion_status (...);
```

---

## Angular Pages

| Route | Component | Data Source |
|---|---|---|
| `/dashboard` | Platform overview, all KPIs | All via `/api/platform/summary` |
| `/app-health` | App table + UX scores | Aternity |
| `/device-health` | Device compliance + OS dist. | Intune |
| `/network-performance` | Packet loss root cause | NetScout + Infoblox |
| `/top-issues` | P1/P2 open issues, MTTR | ScienceLogic + Salesforce |
| `/version-sprawl` | Sprawl table, CVE apps | Intune + Aternity |
| `/data-sources` | Pipeline status + trigger | Databricks Workflows |
