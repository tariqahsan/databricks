"""
gold/aggregate_all.py  (v2 — Real Schema Edition)
GOLD LAYER — Build all product KPI tables from Silver sources.

Gold table names are UNCHANGED — Spring Boot API depends on these:
  gold/app_health_summary           → /api/app-health
  gold/network_performance_summary  → /api/network-performance
  gold/packet_loss_root_cause       → /api/network-performance/kpis
  gold/device_health_summary        → /api/device-health
  gold/dns_metrics                  → /api/network-performance/dns
  gold/top_issues_summary           → /api/top-issues
  gold/version_sprawl_summary       → /api/version-sprawl
  gold/data_source_ingestion_status → /api/data-sources

Silver source → Gold table:
  silver/app_performance      → app_health_summary
  silver/network_flows
  + silver/network_throughput → network_performance_summary
                                packet_loss_root_cause
                                dns_metrics (interface-level)
  silver/device_inventory     → device_health_summary
                                version_sprawl_summary
  silver/netcool_events       → top_issues_summary
  silver/device_metrics       → enriches device_health_summary
"""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))

from pyspark.sql import SparkSession
from pyspark.sql.functions import *
from pyspark.sql.window import Window
from spark_session import get_spark, Paths


# ── 1. APP HEALTH SUMMARY (from Netscout App) ───────────────────────
def gold_app_health_summary(spark: SparkSession):
    """
    Source: silver.app_performance (Netscout App)
    Target: gold.app_health_summary → /api/app-health
    """
    print("\n🥇 GOLD: app_health_summary (Netscout App)...")
    df = spark.read.format("delta").load(Paths.silver("app_performance"))

    gold = df.groupBy("application_name", "application_group") \
        .agg(
            round(avg("experience_score"), 1)           .alias("experience_score"),
            round(avg("avg_response_time_ms"), 0)       .alias("avg_response_time_ms"),
            round(percentile_approx("avg_response_time_ms", 0.95), 0)
                                                        .alias("p95_response_time_ms"),
            round(percentile_approx("avg_response_time_ms", 0.99), 0)
                                                        .alias("p99_response_time_ms"),
            round(avg("error_rate"), 2)                 .alias("error_rate"),
            round(avg("timeout_rate"), 2)               .alias("crash_rate"),
            count("*")                                  .alias("total_session_count"),
            sum("successful_transactions")              .alias("active_user_count"),
        ) \
        .withColumnRenamed("application_name",  "app_name") \
        .withColumnRenamed("application_group", "app_category") \
        .withColumn("health_status",
            when(col("experience_score") < 50, "CRITICAL")
            .when(col("experience_score") < 70, "DEGRADED")
            .otherwise("HEALTHY")) \
        .withColumn("trend", lit("STABLE")) \
        .withColumn("primary_cause",
            when(col("crash_rate") > 5,
                 "High timeout rate — check WAN packet loss or server overload")
            .when(col("error_rate") > 10,
                 "Elevated transaction failures — review application server logs")
            .when(col("avg_response_time_ms") > 1500,
                 "High response time — network latency or server resource contention")
            .otherwise(None)) \
        .withColumn("degradation_pct",
            when(col("experience_score") < 70,
                 round((70 - col("experience_score")) / 70 * 100, 1))
            .otherwise(lit(0.0))) \
        .withColumn("snapshot_date", current_date()) \
        .withColumn("last_updated",  current_timestamp())

    path = Paths.gold("app_health_summary")
    gold.write.format("delta").mode("overwrite").option("overwriteSchema", "true").save(path)
    print(f"   ✅ {gold.count()} apps → gold.app_health_summary")


# ── 2. NETWORK PERFORMANCE SUMMARY (ElastiFlow + Netscout Throughput) ──
def gold_network_performance(spark: SparkSession):
    """
    Source: silver.network_flows (ElastiFlow) +
            silver.network_throughput (Netscout)
    Target: gold.network_performance_summary + gold.packet_loss_root_cause
    """
    print("\n🥇 GOLD: network_performance_summary + packet_loss_root_cause...")

    flows  = spark.read.format("delta").load(Paths.silver("network_flows"))
    thput  = spark.read.format("delta").load(Paths.silver("network_throughput"))

    # ── Network performance per host/interface ───────────────────────
    flow_agg = flows.groupBy("host_name", "host_ip", "direction") \
        .agg(
            sum("network_bytes")          .alias("total_bytes"),
            sum("network_packets")        .alias("total_packets"),
            count("*")                    .alias("total_flows"),
            sum(col("is_large_flow").cast("long")).alias("large_flow_count"),
            countDistinct("src_ip")       .alias("unique_src_count"),
        ) \
        .withColumn("avg_bytes_per_flow",
            round(col("total_bytes") / col("total_flows"), 0)) \
        .withColumn("segment_id",   col("host_name")) \
        .withColumn("segment_type", lit("WAN")) \
        .withColumn("location",     col("host_ip"))

    tput_agg = thput.groupBy("device_alias", "interface_alias") \
        .agg(
            sum("octets_out")    .alias("bytes_out"),
            sum("octets_in")     .alias("bytes_in"),
            sum("packets_out")   .alias("pkts_out"),
            sum("packets_in")    .alias("pkts_in"),
            max("peak_bytes_out").alias("peak_bytes_out"),
            sum(col("is_congested").cast("long")).alias("congestion_events"),
            count("*")           .alias("sample_count"),
        ) \
        .withColumn("bandwidth_utilization",
            round(col("bytes_out") * 100.0 /
                  greatest(col("bytes_out") + col("bytes_in"), lit(1)), 1)) \
        .withColumn("packet_loss_rate",
            round(col("congestion_events") * 1.0 / col("sample_count") * 5, 3)) \
        .withColumn("health_status",
            when(col("packet_loss_rate") > 2.0, "CRITICAL")
            .when(col("packet_loss_rate") > 1.0, "DEGRADED")
            .otherwise("HEALTHY")) \
        .withColumn("segment_id",   col("device_alias")) \
        .withColumn("segment_type", lit("INTERFACE")) \
        .withColumn("location",     col("interface_alias")) \
        .withColumn("avg_latency_ms",
            when(col("peak_bytes_out") > 5_000_000, lit(45.0))
            .when(col("peak_bytes_out") > 1_000_000, lit(20.0))
            .otherwise(lit(8.0))) \
        .withColumn("p95_latency_ms",  col("avg_latency_ms") * lit(2.5)) \
        .withColumn("jitter_ms",       col("avg_latency_ms") * lit(0.15)) \
        .withColumn("availability_rate",
            lit(100.0) - col("packet_loss_rate")) \
        .withColumn("anomaly_count",   col("congestion_events")) \
        .withColumn("total_flows",     col("sample_count")) \
        .withColumn("snapshot_hour",   current_timestamp()) \
        .withColumn("last_updated",    current_timestamp())

    net_gold = tput_agg.select(
        "segment_id", "segment_type", "location",
        "packet_loss_rate", "avg_latency_ms", "p95_latency_ms",
        "jitter_ms", "bandwidth_utilization", "availability_rate",
        "total_flows", "anomaly_count", "health_status",
        "snapshot_hour", "last_updated"
    )

    net_path = Paths.gold("network_performance_summary")
    net_gold.write.format("delta").mode("overwrite").save(net_path)
    print(f"   ✅ {net_gold.count()} segments → gold.network_performance_summary")

    # ── Packet loss root cause (congested interfaces) ────────────────
    rca = tput_agg.filter(col("congestion_events") > 0) \
        .withColumn("segment_name",    col("segment_id")) \
        .withColumn("root_cause",
            when(col("bandwidth_utilization") > 90, "LINK_SATURATION")
            .when(col("congestion_events") > 20,    "CONGESTION")
            .otherwise("HARDWARE_DEGRADATION")) \
        .withColumn("packet_loss_rate",
            col("packet_loss_rate")) \
        .withColumn("affected_flows",  col("congestion_events")) \
        .withColumn("avg_bw_util",     col("bandwidth_utilization")) \
        .withColumn("confidence_score",
            when(col("packet_loss_rate") > 3.0, lit(91.0))
            .when(col("packet_loss_rate") > 2.0, lit(84.0))
            .when(col("packet_loss_rate") > 1.0, lit(76.0))
            .otherwise(lit(68.0))) \
        .withColumn("recommendation",
            when(col("root_cause") == "LINK_SATURATION",
                 "Activate backup circuit or implement traffic shaping")
            .when(col("root_cause") == "CONGESTION",
                 "Implement QoS policy and consider bandwidth upgrade")
            .otherwise("Schedule hardware diagnostic — error counters rising")) \
        .withColumn("severity",
            when(col("packet_loss_rate") > 2.0, "CRITICAL")
            .when(col("packet_loss_rate") > 1.0, "HIGH")
            .otherwise("MEDIUM")) \
        .withColumn("analysis_timestamp", current_timestamp()) \
        .select("segment_name","segment_type","location","root_cause",
                "packet_loss_rate","affected_flows","avg_bw_util",
                "confidence_score","recommendation","severity","analysis_timestamp")

    rca_path = Paths.gold("packet_loss_root_cause")
    rca.write.format("delta").mode("overwrite").save(rca_path)
    print(f"   ✅ {rca.count()} root causes → gold.packet_loss_root_cause")


# ── 3. DEVICE HEALTH SUMMARY (DataNX + DXNETOPS) ───────────────────
def gold_device_health(spark: SparkSession):
    """
    Source: silver.device_inventory (DataNX systems)
            silver.device_metrics (DXNETOPS — enrichment)
    Target: gold.device_health_summary → /api/device-health
    """
    print("\n🥇 GOLD: device_health_summary (DataNX + DXNETOPS)...")
    inv = spark.read.format("delta").load(Paths.silver("device_inventory"))

    # Aggregate per device (system-level records only)
    systems = inv.filter(col("data_source") == "DATANX_SYSTEM") \
        .groupBy("device_name", "version", "node_type", "ip_address") \
        .agg(
            max("admin_status")       .alias("admin_status"),
            max("health_score")       .alias("health_score"),
            max("last_update")        .alias("last_check_in"),
            max("days_since_update")  .alias("days_since_checkin"),
        )

    # Try to enrich with DXNETOPS utilization
    try:
        metrics = spark.read.format("delta").load(Paths.silver("device_metrics"))
        util_agg = metrics.groupBy("device_name") \
            .agg(
                round(avg("utilization"), 1).alias("avg_cpu_util"),
                max("site_name")             .alias("location"),
                max("theater")               .alias("theater"),
                max("quad_code")             .alias("quad_code"),
            )
        gold_df = systems.join(util_agg, "device_name", "left")
    except Exception:
        gold_df = systems \
            .withColumn("avg_cpu_util", lit(None).cast("double")) \
            .withColumn("location",     lit("UNKNOWN")) \
            .withColumn("theater",      lit("UNKNOWN")) \
            .withColumn("quad_code",    lit("UNKNOWN"))

    gold = gold_df \
        .withColumn("device_id",   col("device_name")) \
        .withColumn("device_type", upper(col("node_type"))) \
        .withColumn("os_name",     lit("NETWORK-OS")) \
        .withColumn("os_version",  col("version")) \
        .withColumn("compliance_state",
            when(col("admin_status") == "UP", "COMPLIANT")
            .otherwise("NON_COMPLIANT")) \
        .withColumn("encryption_enabled",  lit(True)) \
        .withColumn("firewall_enabled",    lit(True)) \
        .withColumn("antivirus_enabled",   lit(False)) \
        .withColumn("management_agent",    lit("DXNETOPS")) \
        .withColumn("enrollment_status",   lit("ENROLLED")) \
        .withColumn("assigned_user",       lit("NETWORK-OPS")) \
        .withColumn("is_os_supported",     lit(True)) \
        .withColumn("is_os_latest",        lit(False)) \
        .withColumn("checkin_risk",
            when(col("days_since_checkin") > 30, "HIGH")
            .when(col("days_since_checkin") > 7,  "MEDIUM")
            .otherwise("LOW")) \
        .withColumn("patch_level",
            concat(lit("OS-"), col("version"))) \
        .withColumn("snapshot_date",  current_date()) \
        .withColumn("last_updated",   current_timestamp())

    path = Paths.gold("device_health_summary")
    gold.write.format("delta").mode("overwrite").option("overwriteSchema", "true").save(path)
    print(f"   ✅ {gold.count()} devices → gold.device_health_summary")


# ── 4. DNS METRICS (interface-level from Netscout Throughput) ───────
def gold_dns_metrics(spark: SparkSession):
    """
    Source: silver.network_throughput (Netscout)
    Target: gold.dns_metrics → /api/network-performance/dns
    Note:   Repurposed as interface/sensor health metrics
            since real DNS source (Infoblox) is replaced by DataNX.
    """
    print("\n🥇 GOLD: dns_metrics (Netscout interface health)...")
    df = spark.read.format("delta").load(Paths.silver("network_throughput"))

    gold = df.groupBy("device_alias") \
        .agg(
            count("*")                      .alias("total_queries"),
            sum(col("is_congested").cast("long")).alias("failed_queries"),
            round(avg(
                col("peak_bytes_out") / greatest(col("packets_out"), lit(1))
            ), 2)                           .alias("avg_response_ms"),
            sum(when(col("is_congested"), 1).otherwise(0))
                                            .alias("nxdomain_count"),
            lit(0).cast("long")             .alias("timeout_count"),
            lit(0).cast("long")             .alias("suspicious_queries"),
        ) \
        .withColumn("failure_rate",
            round(col("failed_queries") * 100.0 / col("total_queries"), 2)) \
        .withColumnRenamed("device_alias", "server") \
        .withColumn("snapshot_hour", current_timestamp())

    path = Paths.gold("dns_metrics")
    gold.write.format("delta").mode("overwrite").option("overwriteSchema", "true").save(path)
    print(f"   ✅ {gold.count()} sensors → gold.dns_metrics")


# ── 5. TOP ISSUES SUMMARY (NETCOOL) ─────────────────────────────────
def gold_top_issues(spark: SparkSession):
    """
    Source: silver.netcool_events
    Target: gold.top_issues_summary → /api/top-issues
    """
    print("\n🥇 GOLD: top_issues_summary (NETCOOL)...")
    df = spark.read.format("delta").load(Paths.silver("netcool_events"))

    gold = df.filter(col("severity_num") >= 3) \
        .groupBy("alert_key","node","location","theater",
                 "alert_group","event_id","summary","severity_label",
                 "service","ops_center","quad_code") \
        .agg(
            max("event_timestamp")     .alias("last_updated_at"),
            min("first_occurrence")    .alias("opened_at"),
            sum("tally")               .alias("occurrence_count"),
            max("tally")               .alias("tally_max"),
            max(col("acknowledged").cast("int")).alias("acknowledged_int"),
            count("*")                 .alias("update_count"),
        ) \
        .withColumn("issue_id",    col("alert_key")) \
        .withColumn("title",       col("summary")) \
        .withColumn("category",
            when(col("alert_group").contains("SECURITY"), "SECURITY")
            .when(col("alert_group").contains("THRESHOLD"), "NETWORK")
            .otherwise("NETWORK")) \
        .withColumn("severity",
            when(col("severity_label") == "CRITICAL", "P1")
            .when(col("severity_label") == "MAJOR",   "P2")
            .when(col("severity_label") == "MINOR",   "P3")
            .otherwise("P4")) \
        .withColumn("status",
            when(col("acknowledged_int") == 1, "IN_PROGRESS")
            .otherwise("OPEN")) \
        .withColumn("source",           lit("NETCOOL")) \
        .withColumn("affected_devices", col("update_count")) \
        .withColumn("affected_users",   lit(0)) \
        .withColumn("resolved_at",      lit(None).cast("timestamp")) \
        .withColumn("mttr_minutes",     lit(None).cast("long")) \
        .withColumn("assigned_team",    lit("OE Network Team")) \
        .withColumn("root_cause",       col("event_id")) \
        .withColumn("is_recurring",     col("occurrence_count") > 1) \
        .withColumn("sla_breached",
            col("severity") == "P1") \
        .withColumn("snapshot_date",    current_date()) \
        .withColumn("_processed_at",    current_timestamp()) \
        .select("issue_id","title","category","severity","status","source",
                "affected_devices","affected_users","opened_at",
                "last_updated_at","resolved_at","mttr_minutes",
                "assigned_team","root_cause","is_recurring",
                "occurrence_count","sla_breached","snapshot_date")

    path = Paths.gold("top_issues_summary")
    gold.write.format("delta").mode("overwrite").option("overwriteSchema", "true").save(path)
    print(f"   ✅ {gold.count()} issues → gold.top_issues_summary")


# ── 6. VERSION SPRAWL (DataNX inventory) ────────────────────────────
def gold_version_sprawl(spark: SparkSession):
    """
    Source: silver.device_inventory (DataNX hardware inventory)
    Target: gold.version_sprawl_summary → /api/version-sprawl
    """
    print("\n🥇 GOLD: version_sprawl_summary (DataNX inventory)...")
    df = spark.read.format("delta").load(Paths.silver("device_inventory"))

    # OS/firmware version sprawl from system records
    systems = df.filter(col("data_source") == "DATANX_SYSTEM") \
        .filter(col("version").isNotNull())

    hw_inv = df.filter(col("data_source") == "DATANX_INVENTORY") \
        .filter(col("description").isNotNull())

    # OS versions
    os_versions = systems.groupBy("version") \
        .agg(count("device_name").alias("device_count")) \
        .withColumnRenamed("version", "version_val") \
        .withColumn("software_name",  lit("Network-OS")) \
        .withColumn("software_type",  lit("FIRMWARE")) \
        .withColumn("version",        col("version_val"))

    # Hardware model sprawl
    hw_versions = hw_inv.groupBy("description", "hw_rev") \
        .agg(count("device_name").alias("device_count")) \
        .withColumn("software_name",  col("description")) \
        .withColumn("software_type",  lit("HARDWARE")) \
        .withColumn("version",
            concat(lit("HW-"), coalesce(col("hw_rev"), lit("X0"))))

    from pyspark.sql import functions as F

    os_combined = os_versions.select(
        "software_name","version","software_type","device_count")
    hw_combined = hw_versions.select(
        "software_name","version","software_type","device_count")

    combined = os_combined.union(hw_combined)

    # Count versions per software_name for sprawl metric
    version_count_win = Window.partitionBy("software_name")

    gold = combined \
        .withColumn("version_count",
            count("version").over(version_count_win)) \
        .withColumn("is_latest",          lit(False)) \
        .withColumn("is_supported",       lit(True)) \
        .withColumn("has_vulnerabilities",lit(False)) \
        .withColumn("update_urgency",
            when(col("version_count") > 5, "HIGH")
            .when(col("version_count") > 2, "MEDIUM")
            .otherwise("LOW")) \
        .withColumn("snapshot_date", current_date())

    path = Paths.gold("version_sprawl_summary")
    gold.write.format("delta").mode("overwrite").option("overwriteSchema", "true").save(path)
    print(f"   ✅ {gold.count()} versions → gold.version_sprawl_summary")


# ── 7. DATA SOURCE INGESTION STATUS ─────────────────────────────────
def gold_ingestion_status(spark: SparkSession):
    """
    Computes health status for each bronze source.
    Target: gold.data_source_ingestion_status → /api/data-sources
    """
    print("\n🥇 GOLD: data_source_ingestion_status...")

    sources = [
        ("NETCOOL",             "NETWORK_EVENT_MANAGEMENT",   "raw_netcool"),
        ("DXNETOPS",            "DEVICE_PERFORMANCE",          "raw_dxnetops"),
        ("ElastiFlow",          "NETWORK_FLOW_ANALYSIS",       "raw_elastiflow"),
        ("Netscout App",        "APPLICATION_PERFORMANCE",     "raw_netscout_app"),
        ("Netscout Throughput", "NETWORK_THROUGHPUT",          "raw_netscout_throughput"),
        ("DataNX",              "NETWORK_INVENTORY",           "raw_datanx"),
    ]

    rows = []
    for name, src_type, bronze_tbl in sources:
        try:
            cnt    = spark.read.format("delta").load(Paths.bronze(bronze_tbl)).count()
            status = "ACTIVE"
            quality= 98.5
            latency= 120
            error  = None
        except Exception as e:
            cnt    = 0
            status = "FAILED"
            quality= 0.0
            latency= 0
            error  = f"Bronze table not found — run ingestion first: {str(e)[:80]}"

        rows.append((name, src_type, status,
                     cnt, cnt, quality, latency,
                     f"bronze.{bronze_tbl}",
                     f"silver.{bronze_tbl.replace('raw_','')}", error))

    schema = ("source_name STRING, source_type STRING, status STRING, "
              "records_last_batch LONG, total_records_today LONG, "
              "data_quality_score DOUBLE, latency_ms LONG, "
              "bronze_table STRING, silver_table STRING, error_message STRING")

    gold = spark.createDataFrame(rows, schema) \
        .withColumn("last_ingestion_at", current_timestamp()) \
        .withColumn("next_scheduled_at", date_add(current_timestamp(), 0)) \
        .withColumn("snapshot_date",     current_date())

    path = Paths.gold("data_source_ingestion_status")
    gold.write.format("delta").mode("overwrite").option("overwriteSchema", "true").save(path)
    print(f"   ✅ {gold.count()} sources → gold.data_source_ingestion_status")


if __name__ == "__main__":
    spark = get_spark("Gold-OE-Aggregation-v2")
    try:
        gold_app_health_summary(spark)
        gold_network_performance(spark)
        gold_device_health(spark)
        gold_dns_metrics(spark)
        gold_top_issues(spark)
        gold_version_sprawl(spark)
        gold_ingestion_status(spark)
        print("\n✅ GOLD AGGREGATION COMPLETE")
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
    finally:
        spark.stop()