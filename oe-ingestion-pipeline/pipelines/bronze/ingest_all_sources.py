"""
bronze/ingest_all_sources.py
BRONZE LAYER — Ingest all 6 raw log sources into Delta tables.
Run AFTER generate_mock_logs.py has created the log files.
"""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))

from pyspark.sql import SparkSession
from pyspark.sql.functions import current_timestamp, lit, input_file_name
from pyspark.sql.types import *
from spark_session import get_spark, Paths
from datetime import datetime

TODAY = datetime.now().strftime("%Y%m%d")
LOG_BASE = "/home/jovyan/mock-logs"


def ingest_aternity(spark: SparkSession):
    """Aternity — JSONL app performance logs."""
    print("\n📥 BRONZE: Aternity (App Performance)...")
    schema = StructType([
        StructField("timestamp",        StringType(),  True),
        StructField("app_name",         StringType(),  True),
        StructField("user_id",          StringType(),  True),
        StructField("user_email",       StringType(),  True),
        StructField("device_id",        StringType(),  True),
        StructField("device_name",      StringType(),  True),
        StructField("session_id",       StringType(),  True),
        StructField("response_time_ms", IntegerType(), True),
        StructField("page_load_ms",     IntegerType(), True),
        StructField("experience_score", DoubleType(),  True),
        StructField("crash_flag",       BooleanType(), True),
        StructField("error_code",       StringType(),  True),
        StructField("client_os",        StringType(),  True),
        StructField("location",         StringType(),  True),
        StructField("network_segment",  StringType(),  True),
        StructField("data_source",      StringType(),  True),
    ])
    df = spark.read.schema(schema).json(
        f"{LOG_BASE}/aternity/aternity_performance_{TODAY}.jsonl"
    ).withColumn("_ingested_at",  current_timestamp()) \
     .withColumn("_source_file",  input_file_name()) \
     .withColumn("_batch_date",   lit(TODAY))

    path = Paths.bronze("raw_aternity")
    df.write.format("delta").mode("append") \
      .option("mergeSchema","true").save(path)
    print(f"   ✅ {df.count():,} rows → {path}")


def ingest_netscout(spark: SparkSession):
    """NetScout — CSV network flow logs."""
    print("\n📥 BRONZE: NetScout (Network Flows)...")
    schema = StructType([
        StructField("timestamp",           StringType(), True),
        StructField("segment_id",          StringType(), True),
        StructField("segment_type",        StringType(), True),
        StructField("location",            StringType(), True),
        StructField("src_ip",              StringType(), True),
        StructField("dst_ip",              StringType(), True),
        StructField("protocol",            StringType(), True),
        StructField("bytes_in",            LongType(),   True),
        StructField("bytes_out",           LongType(),   True),
        StructField("packet_loss_pct",     DoubleType(), True),
        StructField("latency_ms",          DoubleType(), True),
        StructField("jitter_ms",           DoubleType(), True),
        StructField("bandwidth_util_pct",  DoubleType(), True),
        StructField("anomaly_flag",        BooleanType(),True),
        StructField("anomaly_type",        StringType(), True),
        StructField("data_source",         StringType(), True),
    ])
    df = spark.read.schema(schema) \
        .option("header","true") \
        .csv(f"{LOG_BASE}/netscout/netscout_flows_{TODAY}.csv") \
        .withColumn("_ingested_at", current_timestamp()) \
        .withColumn("_source_file", input_file_name()) \
        .withColumn("_batch_date",  lit(TODAY))

    path = Paths.bronze("raw_netscout")
    df.write.format("delta").mode("append") \
      .option("mergeSchema","true").save(path)
    print(f"   ✅ {df.count():,} rows → {path}")


def ingest_intune(spark: SparkSession):
    """Intune — JSONL device management snapshots."""
    print("\n📥 BRONZE: Intune (Device Management)...")
    schema = StructType([
        StructField("timestamp",                 StringType(),  True),
        StructField("device_id",                 StringType(),  True),
        StructField("device_name",               StringType(),  True),
        StructField("device_type",               StringType(),  True),
        StructField("os_name",                   StringType(),  True),
        StructField("os_version",                StringType(),  True),
        StructField("compliance_state",          StringType(),  True),
        StructField("last_check_in",             StringType(),  True),
        StructField("assigned_user",             StringType(),  True),
        StructField("location",                  StringType(),  True),
        StructField("encryption_enabled",        BooleanType(), True),
        StructField("firewall_enabled",          BooleanType(), True),
        StructField("antivirus_enabled",         BooleanType(), True),
        StructField("antivirus_definition_date", StringType(),  True),
        StructField("health_score",              DoubleType(),  True),
        StructField("management_agent",          StringType(),  True),
        StructField("enrollment_status",         StringType(),  True),
        StructField("patch_level",               StringType(),  True),
        StructField("jailbroken",                BooleanType(), True),
        StructField("data_source",               StringType(),  True),
    ])
    df = spark.read.schema(schema).json(
        f"{LOG_BASE}/intune/intune_devices_{TODAY}.jsonl"
    ).withColumn("_ingested_at", current_timestamp()) \
     .withColumn("_source_file", input_file_name()) \
     .withColumn("_batch_date",  lit(TODAY))

    path = Paths.bronze("raw_intune")
    df.write.format("delta").mode("append") \
      .option("mergeSchema","true").save(path)
    print(f"   ✅ {df.count():,} rows → {path}")


def ingest_infoblox(spark: SparkSession):
    """Infoblox — Parse syslog DNS query logs."""
    print("\n📥 BRONZE: Infoblox (DNS Logs)...")
    # Read raw syslog lines then parse with regex
    from pyspark.sql.functions import regexp_extract, col

    raw_df = spark.read.text(
        f"{LOG_BASE}/infoblox/infoblox_dns_{TODAY}.log"
    )
    # Pattern: "Jan 01 12:00:00 server named[1234]: client IP#53: query: DOMAIN IN TYPE response: CODE (Xms)"
    PATTERN = r"(\w+ \d+ \d+:\d+:\d+) (\S+) named\[\d+\]: client (\S+)#\d+: query: (\S+) IN (\S+) response: (\S+) \((\S+)ms\)"

    df = raw_df.select(
        regexp_extract("value", PATTERN, 1).alias("syslog_timestamp"),
        regexp_extract("value", PATTERN, 2).alias("dns_server"),
        regexp_extract("value", PATTERN, 3).alias("client_ip"),
        regexp_extract("value", PATTERN, 4).alias("query_domain"),
        regexp_extract("value", PATTERN, 5).alias("query_type"),
        regexp_extract("value", PATTERN, 6).alias("response_code"),
        regexp_extract("value", PATTERN, 7).cast(DoubleType()).alias("response_ms"),
        col("value").alias("raw_log")
    ).filter(col("dns_server") != "") \
     .withColumn("_ingested_at", current_timestamp()) \
     .withColumn("_source_file", input_file_name()) \
     .withColumn("_batch_date",  lit(TODAY)) \
     .withColumn("data_source",  lit("INFOBLOX"))

    path = Paths.bronze("raw_infoblox")
    df.write.format("delta").mode("append") \
      .option("mergeSchema","true").save(path)
    print(f"   ✅ {df.count():,} rows → {path}")


def ingest_salesforce(spark: SparkSession):
    """Salesforce — CSV ticket/case export."""
    print("\n📥 BRONZE: Salesforce (Cases/Tickets)...")
    schema = StructType([
        StructField("case_number",       StringType(),  True),
        StructField("subject",           StringType(),  True),
        StructField("description",       StringType(),  True),
        StructField("priority",          StringType(),  True),
        StructField("status",            StringType(),  True),
        StructField("category",          StringType(),  True),
        StructField("opened_date",       StringType(),  True),
        StructField("closed_date",       StringType(),  True),
        StructField("assigned_team",     StringType(),  True),
        StructField("affected_devices",  IntegerType(), True),
        StructField("affected_users",    IntegerType(), True),
        StructField("root_cause",        StringType(),  True),
        StructField("sla_breached",      BooleanType(), True),
        StructField("mttr_minutes",      IntegerType(), True),
        StructField("is_recurring",      BooleanType(), True),
        StructField("occurrence_count",  IntegerType(), True),
        StructField("source_system",     StringType(),  True),
        StructField("data_source",       StringType(),  True),
    ])
    df = spark.read.schema(schema) \
        .option("header","true") \
        .option("multiLine","true") \
        .csv(f"{LOG_BASE}/salesforce/salesforce_cases_{TODAY}.csv") \
        .withColumn("_ingested_at", current_timestamp()) \
        .withColumn("_source_file", input_file_name()) \
        .withColumn("_batch_date",  lit(TODAY))

    path = Paths.bronze("raw_salesforce")
    df.write.format("delta").mode("append") \
      .option("mergeSchema","true").save(path)
    print(f"   ✅ {df.count():,} rows → {path}")


def ingest_sciencelogic(spark: SparkSession):
    """ScienceLogic — JSONL infrastructure alert logs."""
    print("\n📥 BRONZE: ScienceLogic (Infrastructure Alerts)...")
    schema = StructType([
        StructField("alert_id",        StringType(), True),
        StructField("timestamp",       StringType(), True),
        StructField("device_name",     StringType(), True),
        StructField("device_ip",       StringType(), True),
        StructField("device_type",     StringType(), True),
        StructField("alert_message",   StringType(), True),
        StructField("severity",        StringType(), True),
        StructField("component",       StringType(), True),
        StructField("metric_name",     StringType(), True),
        StructField("metric_value",    DoubleType(), True),
        StructField("threshold_value", DoubleType(), True),
        StructField("acknowledged",    BooleanType(),True),
        StructField("location",        StringType(), True),
        StructField("assigned_team",   StringType(), True),
        StructField("ticket_id",       StringType(), True),
        StructField("data_source",     StringType(), True),
    ])
    df = spark.read.schema(schema).json(
        f"{LOG_BASE}/sciencelogic/sciencelogic_alerts_{TODAY}.jsonl"
    ).withColumn("_ingested_at", current_timestamp()) \
     .withColumn("_source_file", input_file_name()) \
     .withColumn("_batch_date",  lit(TODAY))

    path = Paths.bronze("raw_sciencelogic")
    df.write.format("delta").mode("append") \
      .option("mergeSchema","true").save(path)
    print(f"   ✅ {df.count():,} rows → {path}")


if __name__ == "__main__":
    spark = get_spark("Bronze-OE-Ingestion")
    try:
        ingest_aternity(spark)
        ingest_netscout(spark)
        ingest_intune(spark)
        ingest_infoblox(spark)
        ingest_salesforce(spark)
        ingest_sciencelogic(spark)
        print("\n✅ BRONZE INGESTION COMPLETE")
    finally:
        spark.stop()
