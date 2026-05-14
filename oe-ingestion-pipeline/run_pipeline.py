"""
run_pipeline.py  (v2 — Real Schema Edition)
Master pipeline runner — executes full Bronze → Silver → Gold for all 6 sources.

Usage (from inside Jupyter or terminal in the Docker container):
    python run_pipeline.py

Or step by step:
    python scripts/generate_mock_logs.py --days 3
    python run_pipeline.py

Sources:
    NETCOOL     · DXNETOPS    · ElastiFlow
    Netscout App · Netscout Throughput · DataNX
"""
import sys, os, time
sys.path.insert(0, os.path.dirname(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "src"))

from spark_session import get_spark

from pipelines.bronze.ingest_all_sources import (
    ingest_netcool, ingest_dxnetops, ingest_elastiflow,
    ingest_netscout_app, ingest_netscout_throughput, ingest_datanx
)
from pipelines.silver.transform_all import (
    silver_netcool, silver_dxnetops, silver_elastiflow,
    silver_netscout_app, silver_netscout_throughput, silver_datanx
)
from pipelines.gold.aggregate_all import (
    gold_app_health_summary, gold_network_performance,
    gold_device_health, gold_dns_metrics,
    gold_top_issues, gold_version_sprawl, gold_ingestion_status
)


def run():
    print("=" * 65)
    print("  OE DATA INTELLIGENCE PLATFORM — FULL MEDALLION PIPELINE")
    print("  Sources: NETCOOL · DXNETOPS · ElastiFlow ·")
    print("           Netscout App · Netscout Throughput · DataNX")
    print("=" * 65)

    spark = get_spark("OE-Full-Pipeline")
    total_start = time.time()

    try:
        # ── BRONZE ───────────────────────────────────────────────────
        print("\n" + "─" * 50)
        print("  🥉  BRONZE — Raw Log Ingestion")
        print("─" * 50)
        t = time.time()
        ingest_netcool(spark)
        ingest_dxnetops(spark)
        ingest_elastiflow(spark)
        ingest_netscout_app(spark)
        ingest_netscout_throughput(spark)
        ingest_datanx(spark)
        print(f"\n  ⏱  Bronze complete in {time.time()-t:.1f}s")

        # ── SILVER ───────────────────────────────────────────────────
        print("\n" + "─" * 50)
        print("  🥈  SILVER — Cleanse & Transform")
        print("─" * 50)
        t = time.time()
        silver_netcool(spark)
        silver_dxnetops(spark)
        silver_elastiflow(spark)
        silver_netscout_app(spark)
        silver_netscout_throughput(spark)
        silver_datanx(spark)
        print(f"\n  ⏱  Silver complete in {time.time()-t:.1f}s")

        # ── GOLD ─────────────────────────────────────────────────────
        print("\n" + "─" * 50)
        print("  🥇  GOLD — Product KPI Aggregation")
        print("─" * 50)
        t = time.time()
        gold_app_health_summary(spark)
        gold_network_performance(spark)
        gold_device_health(spark)
        gold_dns_metrics(spark)
        gold_top_issues(spark)
        gold_version_sprawl(spark)
        gold_ingestion_status(spark)
        print(f"\n  ⏱  Gold complete in {time.time()-t:.1f}s")

        # ── SUMMARY ──────────────────────────────────────────────────
        elapsed = time.time() - total_start
        print("\n" + "=" * 65)
        print(f"  ✅  PIPELINE COMPLETE in {elapsed:.1f}s")
        print("=" * 65)
        print("""
  Gold tables ready for Spring Boot API:
    gold/app_health_summary           → /api/app-health
    gold/network_performance_summary  → /api/network-performance
    gold/packet_loss_root_cause       → /api/network-performance/kpis
    gold/device_health_summary        → /api/device-health
    gold/dns_metrics                  → /api/network-performance/dns
    gold/top_issues_summary           → /api/top-issues
    gold/version_sprawl_summary       → /api/version-sprawl
    gold/data_source_ingestion_status → /api/data-sources
        """)

    except Exception as e:
        print(f"\n❌ PIPELINE FAILED: {e}")
        raise
    finally:
        spark.stop()


if __name__ == "__main__":
    run()