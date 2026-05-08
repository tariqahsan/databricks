"""
run_pipeline.py
Master pipeline runner — executes full Bronze → Silver → Gold for all 6 sources.

Usage (from inside Jupyter or terminal in the Docker container):
    python pipelines/run_pipeline.py

Or step by step:
    python scripts/generate_mock_logs.py --days 3
    python pipelines/run_pipeline.py
"""
import sys, os, time, subprocess
sys.path.insert(0, os.path.dirname(__file__))

from spark_session import get_spark

from pipelines.bronze.ingest_all_sources import (
    ingest_aternity, ingest_netscout, ingest_intune,
    ingest_infoblox, ingest_salesforce, ingest_sciencelogic
)
from pipelines.silver.transform_all import (
    silver_app_performance, silver_network_metrics,
    silver_device_inventory, silver_dns_metrics,
    silver_incidents, silver_infrastructure
)
from pipelines.gold.aggregate_all import (
    gold_app_health_summary, gold_network_performance,
    gold_device_health, gold_dns_metrics,
    gold_top_issues, gold_version_sprawl, gold_ingestion_status
)


def run():
    print("=" * 65)
    print("  OE DATA INTELLIGENCE PLATFORM — FULL MEDALLION PIPELINE")
    print("  Sources: Aternity · NetScout · Intune · Infoblox ·")
    print("           Salesforce · ScienceLogic")
    print("=" * 65)

    spark = get_spark("OE-Full-Pipeline")
    total_start = time.time()

    try:
        # ── BRONZE ───────────────────────────────────────────────────
        print("\n" + "─" * 50)
        print("  🥉  BRONZE — Raw Log Ingestion")
        print("─" * 50)
        t = time.time()
        ingest_aternity(spark)
        ingest_netscout(spark)
        ingest_intune(spark)
        ingest_infoblox(spark)
        ingest_salesforce(spark)
        ingest_sciencelogic(spark)
        print(f"\n  ⏱  Bronze complete in {time.time()-t:.1f}s")

        # ── SILVER ───────────────────────────────────────────────────
        print("\n" + "─" * 50)
        print("  🥈  SILVER — Cleanse & Transform")
        print("─" * 50)
        t = time.time()
        silver_app_performance(spark)
        silver_network_metrics(spark)
        silver_device_inventory(spark)
        silver_dns_metrics(spark)
        silver_incidents(spark)
        silver_infrastructure(spark)
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
  Gold tables ready for API queries:
    gold/app_health_summary        → /api/app-health
    gold/network_performance_summary → /api/network-performance
    gold/packet_loss_root_cause    → /api/network-performance/kpis
    gold/device_health_summary     → /api/device-health
    gold/dns_metrics               → /api/network-performance/dns
    gold/top_issues_summary        → /api/top-issues
    gold/version_sprawl_summary    → /api/version-sprawl
    gold/data_source_ingestion_status → /api/data-sources
        """)

    except Exception as e:
        print(f"\n❌ PIPELINE FAILED: {e}")
        raise
    finally:
        spark.stop()


if __name__ == "__main__":
    run()
