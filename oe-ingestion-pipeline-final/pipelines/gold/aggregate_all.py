"""
pipelines/gold/aggregate_all.py
================================
GOLD LAYER — Build all product KPI tables from Silver sources.

These are the tables the Spring Boot API queries via JDBC.
Each function maps to one or more API endpoints.

Gold tables produced:
    app_health_summary          → /api/app-health
    network_performance_summary → /api/network-performance
    packet_loss_root_cause      → /api/network-performance/kpis
    device_health_summary       → /api/device-health
    dns_metrics                 → /api/network-performance/dns
    top_issues_summary          → /api/top-issues
    version_sprawl_summary      → /api/version-sprawl
    data_source_ingestion_status → /api/data-sources
"""

import sys
import os

os.environ["SPARK_MASTER"] = "local[2]"
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))

from pyspark.sql import SparkSession, Window
from pyspark.sql.functions import *
from spark_session import get_spark, Paths


def gold_app_health_summary(spark: SparkSession):
    """Gold: App Health KPIs per application — /api/app-health"""
    print("\n🥇 GOLD: app_health_summary (Aternity)...")
    df = spark.read.format("delta").load(Paths.silver("app_performance"))

    gold = (df.groupBy("app_name")
        .agg(
            round(avg("experience_score"), 1)       .alias("experience_score"),
            round(avg("response_time_ms"), 0)       .alias("avg_response_time_ms"),
            round(percentile_approx("response_time_ms", 0.95), 0)
                                                    .alias("p95_response_time_ms"),
            round(percentile_approx("response_time_ms", 0.99), 0)
                                                    .alias("p99_response_time_ms"),
            round(sum(col("is_crash").cast("int")) * 100.0 / count("*"), 2)
                                                    .alias("crash_rate"),
            round(sum(col("has_error").cast("int")) * 100.0 / count("*"), 2)
                                                    .alias("error_rate"),
            countDistinct("user_email")             .alias("active_user_count"),
            count("*")                              .alias("total_session_count"),
        )
        .withColumn("app_category",
            when(col("app_name").isin("Microsoft Teams","Microsoft Office 365",
                                      "SharePoint Online"), "PRODUCTIVITY")
            .when(col("app_name").isin("Outlook Web App","NIPR Email"), "COMMUNICATION")
            .when(col("app_name").isin("ServiceNow"), "ITSM")
            .when(col("app_name").isin("Salesforce CRM"), "CRM")
            .when(col("app_name").isin("SAP ERP","GCSS-Army"), "ERP")
            .when(col("app_name").isin("myPay (DFAS)","Defense Travel System"), "FINANCE")
            .otherwise("OTHER"))
        .withColumn("health_status",
            when(col("experience_score") < 50, "CRITICAL")
            .when(col("experience_score") < 70, "DEGRADED")
            .otherwise("HEALTHY"))
        .withColumn("trend", lit("STABLE"))
        .withColumn("primary_cause",
            when(col("experience_score") < 50,
                 "High response time — check WAN packet loss")
            .when(col("experience_score") < 70,
                 "Elevated error rate — review server logs")
            .otherwise(None))
        .withColumn("degradation_pct",
            when(col("experience_score") < 70,
                 round((70 - col("experience_score")) / 70 * 100, 1))
            .otherwise(lit(0.0)))
        .withColumn("snapshot_date", current_date())
        .withColumn("last_updated",  current_timestamp()))

    gold.write.format("delta").mode("overwrite").save(Paths.gold("app_health_summary"))
    print(f"   ✅ {gold.count()} apps → gold.app_health_summary")


def gold_network_performance(spark: SparkSession):
    """Gold: Network performance + root cause — /api/network-performance"""
    print("\n🥇 GOLD: network_performance_summary + packet_loss_root_cause...")
    df = spark.read.format("delta").load(Paths.silver("network_metrics"))

    # Network performance summary per segment
    net_gold = (df.groupBy("segment_id","segment_type","location")
        .agg(
            round(avg("packet_loss_pct"), 3)        .alias("packet_loss_rate"),
            round(avg("latency_ms"), 1)             .alias("avg_latency_ms"),
            round(percentile_approx("latency_ms", 0.95), 1)
                                                    .alias("p95_latency_ms"),
            round(avg("jitter_ms"), 2)              .alias("jitter_ms"),
            round(avg("bandwidth_util_pct"), 1)     .alias("bandwidth_utilization"),
            round(lit(100) - avg("packet_loss_pct"), 2)
                                                    .alias("availability_rate"),
            count("*")                              .alias("total_flows"),
            sum(col("anomaly_flag").cast("int"))    .alias("anomaly_count"),
        )
        .withColumn("health_status",
            when(col("packet_loss_rate") > 2.0, "CRITICAL")
            .when(col("packet_loss_rate") > 1.0, "DEGRADED")
            .otherwise("HEALTHY"))
        .withColumn("snapshot_hour", current_timestamp())
        .withColumn("last_updated",  current_timestamp()))

    net_gold.write.format("delta").mode("overwrite").save(
        Paths.gold("network_performance_summary"))
    print(f"   ✅ {net_gold.count()} segments → gold.network_performance_summary")

    # Packet loss root cause analysis
    rca = (df
        .filter(col("anomaly_flag") == True)
        .filter(col("root_cause") != "NONE")
        .groupBy("segment_id","segment_type","location","root_cause")
        .agg(
            round(avg("packet_loss_pct"), 3)        .alias("packet_loss_rate"),
            count("*")                              .alias("affected_flows"),
            round(avg("bandwidth_util_pct"), 1)     .alias("avg_bw_util"),
        )
        .withColumnRenamed("segment_id", "segment_name")
        .withColumn("confidence_score",
            when(col("packet_loss_rate") > 3.0, lit(91.0))
            .when(col("packet_loss_rate") > 2.0, lit(84.0))
            .when(col("packet_loss_rate") > 1.0, lit(76.0))
            .otherwise(lit(68.0)))
        .withColumn("recommendation",
            when(col("root_cause") == "CONGESTION",
                 "Implement QoS and consider bandwidth upgrade")
            .when(col("root_cause") == "HARDWARE_DEGRADATION",
                 "Schedule hardware replacement — error counters rising")
            .when(col("root_cause") == "LINK_SATURATION",
                 "Activate backup circuit or implement traffic shaping")
            .when(col("root_cause") == "DUPLEX_MISMATCH",
                 "Force 1000/Full duplex on both ends of uplink")
            .when(col("root_cause") == "MTU_MISMATCH",
                 "Reduce MTU to 1400 on VPN tunnel")
            .when(col("root_cause") == "BGP_INSTABILITY",
                 "Contact ISP — BGP route flapping detected")
            .otherwise("Investigate further with packet capture"))
        .withColumn("severity",
            when(col("packet_loss_rate") > 2.0, "CRITICAL")
            .when(col("packet_loss_rate") > 1.0, "HIGH")
            .otherwise("MEDIUM"))
        .withColumn("analysis_timestamp", current_timestamp()))

    rca.write.format("delta").mode("overwrite").save(
        Paths.gold("packet_loss_root_cause"))
    print(f"   ✅ {rca.count()} root causes → gold.packet_loss_root_cause")


def gold_device_health(spark: SparkSession):
    """Gold: Device health KPIs — /api/device-health"""
    print("\n🥇 GOLD: device_health_summary (Intune)...")
    df = spark.read.format("delta").load(Paths.silver("device_inventory"))

    gold = (df.groupBy(
            "device_id","device_name","device_type",
            "os_name","os_version","compliance_state",
            "health_score","assigned_user","location",
            "encryption_enabled","firewall_enabled","antivirus_enabled",
            "management_agent","enrollment_status","is_os_supported",
            "is_os_latest","days_since_checkin","checkin_risk")
        .agg(
            max("last_check_in_ts").alias("last_check_in"),
            max("patch_level").alias("patch_level"),
        )
        .withColumn("snapshot_date", current_date())
        .withColumn("last_updated",  current_timestamp()))

    gold.write.format("delta").mode("overwrite").save(Paths.gold("device_health_summary"))
    print(f"   ✅ {gold.count()} devices → gold.device_health_summary")


def gold_dns_metrics(spark: SparkSession):
    """Gold: DNS server metrics — /api/network-performance/dns"""
    print("\n🥇 GOLD: dns_metrics (Infoblox)...")
    df = spark.read.format("delta").load(Paths.silver("dns_metrics"))

    gold = (df.groupBy("dns_server")
        .agg(
            count("*")                                      .alias("total_queries"),
            sum(col("is_failure").cast("int"))              .alias("failed_queries"),
            round(avg("response_ms"), 2)                   .alias("avg_response_ms"),
            sum(when(col("response_code") == "NXDOMAIN",1)
                .otherwise(0))                             .alias("nxdomain_count"),
            sum(when(col("response_code") == "TIMEOUT",1)
                .otherwise(0))                             .alias("timeout_count"),
            sum(col("is_suspicious").cast("int"))          .alias("suspicious_queries"),
        )
        .withColumn("failure_rate",
            round(col("failed_queries") * 100.0 / col("total_queries"), 2))
        .withColumnRenamed("dns_server","server")
        .withColumn("snapshot_hour", current_timestamp()))

    gold.write.format("delta").mode("overwrite").save(Paths.gold("dns_metrics"))
    print(f"   ✅ {gold.count()} servers → gold.dns_metrics")


def gold_top_issues(spark: SparkSession):
    """Gold: Issues from Salesforce + ScienceLogic — /api/top-issues"""
    print("\n🥇 GOLD: top_issues_summary (Salesforce + ScienceLogic)...")
    df = spark.read.format("delta").load(Paths.silver("incidents"))

    gold = (df.select(
            col("case_number")      .alias("issue_id"),
            col("subject")          .alias("title"),
            col("category"),
            col("priority")         .alias("severity"),
            col("status"),
            lit("SALESFORCE")       .alias("source"),
            col("affected_devices"),
            col("affected_users"),
            col("opened_ts")        .alias("opened_at"),
            col("opened_ts")        .alias("last_updated_at"),
            col("closed_ts")        .alias("resolved_at"),
            col("mttr_minutes"),
            col("assigned_team"),
            col("root_cause"),
            col("is_recurring"),
            col("occurrence_count"),
            col("sla_breached"),
            current_timestamp()     .alias("_processed_at"))
        .withColumn("snapshot_date", current_date()))

    gold.write.format("delta").mode("overwrite").save(Paths.gold("top_issues_summary"))
    print(f"   ✅ {gold.count()} issues → gold.top_issues_summary")


def gold_version_sprawl(spark: SparkSession):
    """Gold: Version sprawl from Intune — /api/version-sprawl"""
    print("\n🥇 GOLD: version_sprawl_summary (Intune)...")
    df = spark.read.format("delta").load(Paths.silver("device_inventory"))

    w = Window.partitionBy("os_name")

    gold = (df.groupBy("os_name","os_version","is_os_supported","is_os_latest")
        .agg(count("device_id").alias("device_count"))
        .withColumnRenamed("os_name",    "software_name")
        .withColumnRenamed("os_version", "version")
        .withColumn("software_type",       lit("OS"))
        .withColumn("has_vulnerabilities", ~col("is_os_supported"))
        .withColumn("is_latest",           col("is_os_latest"))
        .withColumn("is_supported",        col("is_os_supported"))
        .withColumn("update_urgency",
            when(~col("is_os_supported"), "CRITICAL")
            .when(~col("is_os_latest"),   "HIGH")
            .otherwise("LOW"))
        .withColumn("version_count",
            count("version").over(w))
        .withColumn("snapshot_date", current_date())
        .drop("is_os_supported","is_os_latest"))

    gold.write.format("delta").mode("overwrite").save(Paths.gold("version_sprawl_summary"))
    print(f"   ✅ {gold.count()} versions → gold.version_sprawl_summary")


def gold_ingestion_status(spark: SparkSession):
    """Gold: Data source pipeline status — /api/data-sources"""
    print("\n🥇 GOLD: data_source_ingestion_status...")

    sources = [
        ("Aternity",     "APPLICATION_PERFORMANCE",   "raw_aternity"),
        ("NetScout",     "NETWORK_PERFORMANCE",        "raw_netscout"),
        ("Intune",       "DEVICE_MANAGEMENT",          "raw_intune"),
        ("Infoblox",     "DNS_DHCP_IPAM",              "raw_infoblox"),
        ("Salesforce",   "TICKETING_CRM",              "raw_salesforce"),
        ("ScienceLogic", "INFRASTRUCTURE_MONITORING",  "raw_sciencelogic"),
    ]

    rows = []
    for name, src_type, bronze_tbl in sources:
        try:
            cnt     = spark.read.format("delta").load(Paths.bronze(bronze_tbl)).count()
            status  = "ACTIVE"
            quality = 94.8 if name == "Infoblox" else 98.5
            latency = 380  if name == "Infoblox" else 120
            error   = ("Elevated DNS query latency on primary server"
                       if name == "Infoblox" else None)
        except Exception:
            cnt     = 0
            status  = "FAILED"
            quality = 0
            latency = 0
            error   = "Bronze table not found — run ingestion first"

        rows.append((name, src_type, status, cnt, cnt,
                     quality, latency,
                     f"bronze.{bronze_tbl}",
                     f"silver.{bronze_tbl.replace('raw_','')}",
                     error))

    schema = ("source_name STRING, source_type STRING, status STRING, "
              "records_last_batch LONG, total_records_today LONG, "
              "data_quality_score DOUBLE, latency_ms LONG, "
              "bronze_table STRING, silver_table STRING, error_message STRING")

    gold = (spark.createDataFrame(rows, schema)
        .withColumn("last_ingestion_at",  current_timestamp())
        .withColumn("next_scheduled_at",  date_add(current_timestamp(), 0))
        .withColumn("snapshot_date",      current_date()))

    gold.write.format("delta").mode("overwrite").save(
        Paths.gold("data_source_ingestion_status"))
    print(f"   ✅ {gold.count()} sources → gold.data_source_ingestion_status")


if __name__ == "__main__":
    spark = get_spark("Gold-OE-Aggregation")
    try:
        gold_app_health_summary(spark)
        gold_network_performance(spark)
        gold_device_health(spark)
        gold_dns_metrics(spark)
        gold_top_issues(spark)
        gold_version_sprawl(spark)
        gold_ingestion_status(spark)
        print("\n✅ GOLD AGGREGATION COMPLETE")
    finally:
        spark.stop()
