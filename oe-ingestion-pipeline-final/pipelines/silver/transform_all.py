"""
pipelines/silver/transform_all.py
===================================
SILVER LAYER — Cleanse, validate, and conform all 6 Bronze sources.

Produces trusted, queryable Silver Delta tables with:
  - Null filtering and data type casting
  - Derived columns (health_status, is_supported, days_since_checkin)
  - MERGE/upsert for key-based deduplication
  - Suspicious traffic flagging (Infoblox)
"""

import sys
import os

os.environ["SPARK_MASTER"] = "local[2]"
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))

from pyspark.sql import SparkSession
from pyspark.sql.functions import *
from pyspark.sql.types import DoubleType
from delta.tables import DeltaTable
from spark_session import get_spark, Paths


def silver_app_performance(spark: SparkSession):
    """Aternity → silver.app_performance"""
    print("\n🔧 SILVER: App Performance (Aternity)...")
    df = spark.read.format("delta").load(Paths.bronze("raw_aternity"))

    silver = (df
        .filter(col("experience_score").isNotNull())
        .filter(col("experience_score").between(0, 100))
        .filter(col("response_time_ms") > 0)
        .withColumn("event_timestamp", to_timestamp(col("timestamp")))
        .withColumn("app_name",   trim(col("app_name")))
        .withColumn("user_email", lower(trim(col("user_email"))))
        .withColumn("location",   trim(col("location")))
        .withColumn("health_status",
            when(col("experience_score") < 50, "CRITICAL")
            .when(col("experience_score") < 70, "DEGRADED")
            .otherwise("HEALTHY"))
        .withColumn("is_crash",   col("crash_flag") == True)
        .withColumn("has_error",  col("error_code") != "NONE")
        .withColumn("_processed_at", current_timestamp())
        .drop("_source_file","_batch_date","_ingested_at","timestamp"))

    _upsert_or_create(spark, silver, Paths.silver("app_performance"), "session_id")
    print(f"   ✅ {silver.count():,} rows → silver.app_performance")


def silver_network_metrics(spark: SparkSession):
    """NetScout → silver.network_metrics"""
    print("\n🔧 SILVER: Network Metrics (NetScout)...")
    df = spark.read.format("delta").load(Paths.bronze("raw_netscout"))

    silver = (df
        .filter(col("packet_loss_pct").isNotNull())
        .filter(col("latency_ms") > 0)
        .withColumn("event_timestamp",  to_timestamp(col("timestamp")))
        .withColumn("segment_id",       trim(col("segment_id")))
        .withColumn("location",         trim(col("location")))
        .withColumn("packet_loss_pct",  round(col("packet_loss_pct"), 3))
        .withColumn("latency_ms",       round(col("latency_ms"), 1))
        .withColumn("health_status",
            when(col("packet_loss_pct") > 2.0, "CRITICAL")
            .when(col("packet_loss_pct") > 1.0, "DEGRADED")
            .otherwise("HEALTHY"))
        .withColumn("root_cause",
            when(col("anomaly_flag") == True, col("anomaly_type"))
            .otherwise("NONE"))
        .withColumn("_processed_at", current_timestamp())
        .drop("_source_file","_batch_date","_ingested_at","timestamp"))

    path = Paths.silver("network_metrics")
    silver.write.format("delta").mode("overwrite").option("overwriteSchema","true").save(path)
    print(f"   ✅ {silver.count():,} rows → silver.network_metrics")


def silver_device_inventory(spark: SparkSession):
    """Intune → silver.device_inventory"""
    print("\n🔧 SILVER: Device Inventory (Intune)...")
    df = spark.read.format("delta").load(Paths.bronze("raw_intune"))

    silver = (df
        .filter(col("device_id").isNotNull())
        .withColumn("event_timestamp",   to_timestamp(col("timestamp")))
        .withColumn("last_check_in_ts",  to_timestamp(col("last_check_in")))
        .withColumn("compliance_state",  upper(trim(col("compliance_state"))))
        .withColumn("os_name",           trim(col("os_name")))
        .withColumn("os_version",        trim(col("os_version")))
        .withColumn("is_os_supported",
            ~col("os_version").isin("7 SP1","8.1","XP"))
        .withColumn("is_os_latest",
            col("os_version").isin("11 23H2","17.4","14"))
        .withColumn("days_since_checkin",
            datediff(current_date(), to_date(col("last_check_in"))))
        .withColumn("checkin_risk",
            when(col("days_since_checkin") > 30, "HIGH")
            .when(col("days_since_checkin") > 7,  "MEDIUM")
            .otherwise("LOW"))
        .withColumn("_processed_at", current_timestamp())
        .drop("_source_file","_batch_date","_ingested_at","timestamp"))

    _upsert_or_create(spark, silver, Paths.silver("device_inventory"), "device_id")
    print(f"   ✅ {silver.count():,} rows → silver.device_inventory")


def silver_dns_metrics(spark: SparkSession):
    """Infoblox → silver.dns_metrics"""
    print("\n🔧 SILVER: DNS Metrics (Infoblox)...")
    df = spark.read.format("delta").load(Paths.bronze("raw_infoblox"))

    silver = (df
        .filter(col("dns_server") != "")
        .filter(col("query_domain") != "")
        .withColumn("response_ms", col("response_ms").cast(DoubleType()))
        .withColumn("is_failure",
            col("response_code").isin("NXDOMAIN","SERVFAIL","REFUSED","TIMEOUT"))
        .withColumn("is_suspicious",
            col("query_domain").rlike("(badactor|suspicious|malware|c2|botnet|attacker)"))
        .withColumn("server_health",
            when(col("response_ms") > 200, "DEGRADED")
            .when(col("response_ms") > 50,  "SLOW")
            .otherwise("HEALTHY"))
        .withColumn("_processed_at", current_timestamp())
        .drop("raw_log","_source_file","_batch_date","_ingested_at"))

    path = Paths.silver("dns_metrics")
    silver.write.format("delta").mode("overwrite").option("overwriteSchema","true").save(path)
    print(f"   ✅ {silver.count():,} rows → silver.dns_metrics")


def silver_incidents(spark: SparkSession):
    """Salesforce → silver.incidents"""
    print("\n🔧 SILVER: Incidents (Salesforce)...")
    df = spark.read.format("delta").load(Paths.bronze("raw_salesforce"))

    silver = (df
        .filter(col("case_number").isNotNull())
        .withColumn("priority",  upper(trim(col("priority"))))
        .withColumn("status",    upper(trim(col("status"))))
        .withColumn("category",  upper(trim(col("category"))))
        .withColumn("opened_ts", to_timestamp(col("opened_date"), "yyyy-MM-dd HH:mm:ss"))
        .withColumn("closed_ts", to_timestamp(col("closed_date"), "yyyy-MM-dd HH:mm:ss"))
        .withColumn("is_open",   col("status").isin("OPEN","IN_PROGRESS"))
        .withColumn("sla_threshold_minutes",
            when(col("priority") == "P1",    60)
            .when(col("priority") == "P2",   240)
            .when(col("priority") == "P3",   480)
            .otherwise(1440))
        .withColumn("_processed_at", current_timestamp())
        .drop("_source_file","_batch_date","_ingested_at"))

    _upsert_or_create(spark, silver, Paths.silver("incidents"), "case_number")
    print(f"   ✅ {silver.count():,} rows → silver.incidents")


def silver_infrastructure(spark: SparkSession):
    """ScienceLogic → silver.infrastructure_alerts"""
    print("\n🔧 SILVER: Infrastructure Alerts (ScienceLogic)...")
    df = spark.read.format("delta").load(Paths.bronze("raw_sciencelogic"))

    silver = (df
        .filter(col("alert_id").isNotNull())
        .withColumn("event_timestamp", to_timestamp(col("timestamp")))
        .withColumn("severity",        upper(trim(col("severity"))))
        .withColumn("severity_rank",
            when(col("severity") == "CRITICAL", 1)
            .when(col("severity") == "HIGH",     2)
            .when(col("severity") == "MEDIUM",   3)
            .when(col("severity") == "LOW",      4)
            .otherwise(5))
        .withColumn("is_above_threshold",
            col("metric_value") >= col("threshold_value"))
        .withColumn("threshold_pct",
            when(col("threshold_value") > 0,
                 round(col("metric_value") / col("threshold_value") * 100, 1))
            .otherwise(lit(0)))
        .withColumn("_processed_at", current_timestamp())
        .drop("_source_file","_batch_date","_ingested_at","timestamp"))

    _upsert_or_create(spark, silver, Paths.silver("infrastructure_alerts"), "alert_id")
    print(f"   ✅ {silver.count():,} rows → silver.infrastructure_alerts")


def _upsert_or_create(spark: SparkSession, df, path: str, key: str):
    """MERGE if Delta table exists, otherwise create it."""
    if DeltaTable.isDeltaTable(spark, path):
        (DeltaTable.forPath(spark, path).alias("t")
         .merge(df.alias("s"), f"t.{key} = s.{key}")
         .whenMatchedUpdateAll()
         .whenNotMatchedInsertAll()
         .execute())
    else:
        df.write.format("delta").mode("overwrite").option("overwriteSchema","true").save(path)


if __name__ == "__main__":
    spark = get_spark("Silver-OE-Transform")
    try:
        silver_app_performance(spark)
        silver_network_metrics(spark)
        silver_device_inventory(spark)
        silver_dns_metrics(spark)
        silver_incidents(spark)
        silver_infrastructure(spark)
        print("\n✅ SILVER TRANSFORM COMPLETE")
    finally:
        spark.stop()
