"""
bronze/ingest_all_sources.py  (v2 — Real Schema Edition)
BRONZE LAYER — Ingest all 6 real-schema sources into Delta tables.

Sources → Bronze tables:
  netcool_events_*.jsonl       → bronze/raw_netcool
  dxnetops_metrics_*.jsonl     → bronze/raw_dxnetops
  elastiflow_flows_*.jsonl     → bronze/raw_elastiflow
  netscout_app_*.jsonl         → bronze/raw_netscout_app
  netscout_throughput_*.jsonl  → bronze/raw_netscout_throughput
  datanx_inventory_*.jsonl     → bronze/raw_datanx
"""
import pathlib
from pyspark.sql import SparkSession
from pyspark.sql.functions import current_timestamp, lit, input_file_name
from spark_session import Paths
from datetime import datetime

TODAY = datetime.now().strftime("%Y%m%d")

# ── Dynamic path: resolves to <project-root>/mock-logs ────────────────
# Works regardless of where the script is invoked from.
# __file__ → pipelines/bronze/ingest_all_sources.py
# .parent  → pipelines/bronze
# .parent  → pipelines
# .parent  → <project-root>
LOG_BASE = str(pathlib.Path(__file__).resolve().parent.parent.parent / "mock-logs")


def _read_jsonl(spark: SparkSession, path: str):
    """Read a JSONL file with schema inference and audit columns."""
    return (
        spark.read
             .option("multiLine", "false")
             .json(path)
             .withColumn("_ingested_at", current_timestamp())
             .withColumn("_source_file", input_file_name())
             .withColumn("_batch_date",  lit(TODAY))
    )


def ingest_netcool(spark: SparkSession):
    print("\n BRONZE: NETCOOL (Network Events)...")
    df = _read_jsonl(spark, f"{LOG_BASE}/netcool/netcool_events_{TODAY}.jsonl")
    path = Paths.bronze("raw_netcool")
    df.write.format("delta").mode("append").option("mergeSchema", "true").save(path)
    print(f"    {df.count():,} rows → {path}")


def ingest_dxnetops(spark: SparkSession):
    print("\n BRONZE: DXNETOPS (Device Metrics)...")
    df = _read_jsonl(spark, f"{LOG_BASE}/dxnetops/dxnetops_metrics_{TODAY}.jsonl")
    path = Paths.bronze("raw_dxnetops")
    df.write.format("delta").mode("append").option("mergeSchema", "true").save(path)
    print(f"    {df.count():,} rows → {path}")


def ingest_elastiflow(spark: SparkSession):
    print("\n BRONZE: ElastiFlow (IPFIX Network Flows)...")
    df = _read_jsonl(spark, f"{LOG_BASE}/elastiflow/elastiflow_flows_{TODAY}.jsonl")
    path = Paths.bronze("raw_elastiflow")
    df.write.format("delta").mode("append").option("mergeSchema", "true").save(path)
    print(f"    {df.count():,} rows → {path}")


def ingest_netscout_app(spark: SparkSession):
    print("\n BRONZE: Netscout App (Application Performance)...")
    df = _read_jsonl(spark, f"{LOG_BASE}/netscout_app/netscout_app_{TODAY}.jsonl")
    path = Paths.bronze("raw_netscout_app")
    df.write.format("delta").mode("append").option("mergeSchema", "true").save(path)
    print(f"    {df.count():,} rows → {path}")


def ingest_netscout_throughput(spark: SparkSession):
    print("\n BRONZE: Netscout Throughput (Bandwidth)...")
    df = _read_jsonl(spark, f"{LOG_BASE}/netscout_throughput/netscout_throughput_{TODAY}.jsonl")
    path = Paths.bronze("raw_netscout_throughput")
    df.write.format("delta").mode("append").option("mergeSchema", "true").save(path)
    print(f"    {df.count():,} rows → {path}")


def ingest_datanx(spark: SparkSession):
    print("\n BRONZE: DataNX (Network Inventory)...")
    df = _read_jsonl(spark, f"{LOG_BASE}/datanx/datanx_inventory_{TODAY}.jsonl")
    path = Paths.bronze("raw_datanx")
    df.write.format("delta").mode("append").option("mergeSchema", "true").save(path)
    print(f"    {df.count():,} rows → {path}")


if __name__ == "__main__":
    from spark_session import get_spark
    spark = get_spark("Bronze-OE-Ingestion-v2")
    try:
        ingest_netcool(spark)
        ingest_dxnetops(spark)
        ingest_elastiflow(spark)
        ingest_netscout_app(spark)
        ingest_netscout_throughput(spark)
        ingest_datanx(spark)
        print("\n BRONZE INGESTION COMPLETE")
    finally:
        spark.stop()