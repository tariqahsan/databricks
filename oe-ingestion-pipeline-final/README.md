# DISA OE Data Intelligence Platform — Ingestion Pipeline

Local Databricks-equivalent stack for the OE Data Intelligence Platform POC.

Ingests sys logs from 6 operational tools through a **Medallion Architecture**
(Bronze → Silver → Gold) into Delta Lake tables stored in MinIO (local S3).

---

## Architecture

```
DATA SOURCES          RAW LOG FILES          MEDALLION PIPELINE
─────────────         ─────────────          ──────────────────────────────────
Aternity        →     JSONL                  BRONZE  (raw Delta, append-only)
NetScout        →     CSV                      ↓  cleanse + validate
Intune          →     JSONL                  SILVER  (trusted, MERGE/upsert)
Infoblox        →     Syslog (RFC 5424)        ↓  aggregate into KPIs
Salesforce      →     CSV                    GOLD    (Spring Boot API queries)
ScienceLogic    →     JSONL
```

**Gold tables → REST API → Angular UI**

```
/api/app-health                → gold.app_health_summary
/api/network-performance/kpis  → gold.packet_loss_root_cause
/api/device-health             → gold.device_health_summary
/api/top-issues                → gold.top_issues_summary
/api/version-sprawl            → gold.version_sprawl_summary
/api/data-sources              → gold.data_source_ingestion_status
```

---

## Local Stack vs Real Databricks

| This Stack (Local)                   | AWS Databricks (DISA GovCloud)         |
|--------------------------------------|----------------------------------------|
| `apache/spark:3.5.3`                 | Databricks Runtime (managed)           |
| `delta-spark 3.2.0` (open source)    | Delta Lake (managed)                   |
| MinIO (local S3-compatible)          | Amazon S3 GovCloud                     |
| JupyterLab `:8888`                   | Databricks Notebooks                   |
| `local[2]` Spark mode                | Databricks cluster (auto-scaled EC2)   |

**Code change to move to real Databricks:** one line in `spark_session.py`

---

## Prerequisites

- Docker Desktop (8 GB RAM allocated minimum)
- Ports free: 8080, 8888, 9000, 9001

---

## Quick Start

```bash
# 1. Start the stack
docker compose up -d

# 2. Wait for Jupyter (~60-90 seconds first run, installing packages)
docker compose logs -f jupyter
# Wait for: "Jupyter Server is running at: http://localhost:8888/"

# 3. Open JupyterLab
# URL:      http://localhost:8888
# Password: databricks

# 4. Open notebooks/oe_pipeline_walkthrough.ipynb
# Run all cells — generates logs and runs Bronze → Silver → Gold
```

---

## Service URLs

| Service             | URL                    | Credentials           |
|---------------------|------------------------|-----------------------|
| JupyterLab          | http://localhost:8888  | password: databricks  |
| Spark Master UI     | http://localhost:8080  | none                  |
| MinIO S3 Browser    | http://localhost:9001  | minioadmin/minioadmin |
| Spark App UI        | http://localhost:4040  | none (while job runs) |

---

## Project Structure

```
oe-ingestion-pipeline/
├── docker-compose.yml          ← Full stack definition
├── spark_session.py            ← SparkSession factory (local + Databricks)
├── generate_mock_logs.py       ← Generates realistic sys logs for all 6 sources
├── README.md
│
├── pipelines/
│   ├── run_pipeline.py         ← Master orchestrator (Bronze→Silver→Gold)
│   ├── bronze/
│   │   └── ingest_all_sources.py  ← Reads raw logs → Bronze Delta tables
│   ├── silver/
│   │   └── transform_all.py       ← Cleanses → Silver Delta tables (MERGE)
│   └── gold/
│       └── aggregate_all.py       ← Aggregates KPIs → Gold Delta tables
│
├── notebooks/
│   └── oe_pipeline_walkthrough.ipynb  ← Interactive walkthrough
│
└── sample-logs/                ← Static sample files (one per source)
    ├── aternity/   aternity_perf_20260508.jsonl
    ├── netscout/   netscout_flows_20260508.csv
    ├── intune/     intune_devices_20260508.jsonl
    ├── infoblox/   infoblox_dns_20260508.log
    ├── salesforce/ salesforce_cases_20260508.csv
    └── sciencelogic/ sciencelogic_alerts_20260508.jsonl
```

---

## Running the Pipeline Manually

From inside the Jupyter terminal (File → New → Terminal):

```bash
# Generate fresh mock logs with today's date
python /home/jovyan/generate_mock_logs.py --days 1

# Run full pipeline
python /home/jovyan/pipelines/run_pipeline.py
```

Expected output:
```
✅ BRONZE complete (~25s)
   Aternity:     2,500 rows → s3a://bronze/raw_aternity
   NetScout:     3,000 rows → s3a://bronze/raw_netscout
   Intune:         400 rows → s3a://bronze/raw_intune
   Infoblox:     8,000 rows → s3a://bronze/raw_infoblox
   Salesforce:      20 rows → s3a://bronze/raw_salesforce
   ScienceLogic: 1,397 rows → s3a://bronze/raw_sciencelogic

✅ SILVER complete (~70s)
✅ GOLD complete (~95s)
✅ PIPELINE COMPLETE in ~190s
```

---

## Known Issues & Fixes Applied

### 1. bitnami/spark removed from Docker Hub (Sep 2025)
**Fix:** Switched to `apache/spark:3.5.3`

### 2. Spark version mismatch — serialization error
**Symptom:** `InvalidClassException: org.apache.spark.scheduler.Task`
**Root cause:** `jupyter/pyspark-notebook` ships Spark 3.5.0; `apache/spark` worker is 3.5.3
**Fix:** `SPARK_MASTER=local[2]` — runs entirely inside Jupyter JVM, no version conflict

### 3. Jupyter /home/jovyan permission denied
**Fix:** `user: root` + `CHOWN_HOME=yes` + `chown -R 1000:100` before notebook launch

### 4. start-notebook.sh deprecated
**Fix:** `python3 /usr/local/bin/start-notebook.py`

### 5. pip multiline args broken in YAML
**Fix:** Single-line pip command with `|| true`

---

## Moving to Real Databricks (DISA AWS GovCloud)

**Step 1 — Get credentials from DISA cloud team:**
```bash
DATABRICKS_HOST=your-workspace.databricks.com
DATABRICKS_TOKEN=dapi-your-token
DATABRICKS_HTTP_PATH=/sql/1.0/warehouses/xxx
```

**Step 2 — Update `spark_session.py`:**
```python
# Replace get_spark() body with:
from databricks.connect import DatabricksSession
return DatabricksSession.builder.getOrCreate()
```

**Step 3 — Update S3 paths in `Paths` class:**
```python
BRONZE = "s3://disa-datalake/bronze"
SILVER = "s3://disa-datalake/silver"
GOLD   = "s3://disa-datalake/gold"
```

**All pipeline code runs unchanged.**

---

## Docker Commands

```bash
docker compose up -d          # Start all containers
docker compose down           # Stop (keeps data)
docker compose down -v        # Stop + wipe all Delta Lake data
docker compose logs -f jupyter  # Watch Jupyter startup
docker compose ps             # Check container status
```
