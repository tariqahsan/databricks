# OE Data Intelligence Platform — Quick Start

End-to-end setup from a fresh `git clone` to data in MinIO.
Estimated time: **10–15 minutes** (mostly waiting for Docker pulls).

## Prerequisites

- Docker Desktop installed and running
- Git

---

## Step 1 — Clone and start the stack

```bash
git clone <repo-url> oe-ingestion-pipeline
cd oe-ingestion-pipeline

docker compose up -d
```

This starts 5 containers:
| Container | Purpose |
|---|---|
| `oe-spark-master` | Spark cluster coordinator |
| `oe-spark-worker-1` | Spark executor |
| `oe-spark-thrift` | SQL Warehouse (Spring Boot connects here) |
| `oe-minio` | S3-compatible object store (Delta Lake storage) |
| `oe-jupyter` | JupyterLab + pipeline runner |

Wait ~60 seconds for all services to become healthy:

```bash
docker compose ps   # all should show "healthy" or "running"
```

---

## Step 2 — Open JupyterLab

Go to: **http://localhost:8888**
Token: **databricks**

Open a **Terminal** tab (File → New → Terminal).

> The terminal opens directly in `/home/jovyan/project` — your project root.

---

## Step 3 — Generate mock data

```bash
python scripts/generate_mock_logs.py --days 3
```

This generates ~25,000 records across 6 sources into `mock-logs/`:
- `netcool/` — network events
- `dxnetops/` — device CPU metrics
- `elastiflow/` — IPFIX network flows
- `netscout_app/` — application performance
- `netscout_throughput/` — bandwidth throughput
- `datanx/` — network inventory

---

## Step 4 — Run the full pipeline

```bash
python run_pipeline.py
```

This executes Bronze → Silver → Gold across all 6 sources.
Takes ~3–5 minutes on first run (Spark downloads Delta Lake JARs).

Expected output:
```
==================================================
  OE DATA INTELLIGENCE PLATFORM — FULL MEDALLION PIPELINE
==================================================

  🥉  BRONZE — Raw Log Ingestion
  ...
  🥈  SILVER — Cleanse & Transform
  ...
  🥇  GOLD — Product KPI Aggregation
  ...
  ✅  PIPELINE COMPLETE in 187.3s
```

---

## Step 5 — Verify data in MinIO

Go to: **http://localhost:9001**
Login: `minioadmin` / `minioadmin`

Check these buckets:
- `bronze/` → 6 raw Delta tables (`raw_netcool`, `raw_dxnetops`, etc.)
- `silver/` → 6 cleansed Delta tables
- `gold/` → 8 KPI tables ready for the Spring Boot API

---

## Step 6 — Start the Spring Boot API (optional)

In the `oe-data-intelligence-platform/backend/` directory:

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=thrift
```

API endpoints:
```
http://localhost:8080/api/app-health
http://localhost:8080/api/network-performance
http://localhost:8080/api/device-health
http://localhost:8080/api/top-issues
http://localhost:8080/api/version-sprawl
http://localhost:8080/api/data-sources
http://localhost:8080/actuator/health
```

---

## Re-running the pipeline

To refresh data on subsequent days:

```bash
# In JupyterLab terminal
python scripts/generate_mock_logs.py --days 1
python run_pipeline.py
```

---

## Troubleshooting

**`ModuleNotFoundError: No module named 'delta'`**
delta-spark didn't install on startup. Run manually:
```bash
pip install delta-spark==3.2.0 boto3==1.34.0 s3fs==2024.2.0
```

**`ModuleNotFoundError: No module named 'spark_session'`**
PYTHONPATH not set. Check docker-compose.yml has:
```yaml
- PYTHONPATH=/home/jovyan/project:/home/jovyan/project/src
```
Then restart: `docker compose up -d jupyter`

**Pipeline takes too long**
Spark is downloading JARs on first run (~500MB). Subsequent runs are fast.
Check progress at: http://localhost:4040 (Spark UI)

**MinIO buckets empty after pipeline**
Confirm spark_session.py paths point to `s3a://bronze`, `s3a://silver`, `s3a://gold`.
Check MinIO logs: `docker compose logs minio`