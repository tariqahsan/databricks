"""
silver/transform_all.py  (v2 — Real Schema Edition)
SILVER LAYER — Cleanse and conform all 6 real-schema bronze sources.

Bronze → Silver mapping:
  raw_netcool           → silver/netcool_events
  raw_dxnetops          → silver/device_metrics
  raw_elastiflow        → silver/network_flows
  raw_netscout_app      → silver/app_performance
  raw_netscout_throughput → silver/network_throughput
  raw_datanx            → silver/device_inventory
"""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))

from pyspark.sql import SparkSession
from pyspark.sql.functions import *
from pyspark.sql.types import *
from delta.tables import DeltaTable
from spark_session import get_spark, Paths


# ── NETCOOL → silver.netcool_events ─────────────────────────────────
def silver_netcool(spark: SparkSession):
    print("\n🔧 SILVER: NETCOOL events...")
    df = spark.read.format("delta").load(Paths.bronze("raw_netcool"))

    silver = df \
        .filter(col("Severity").isNotNull()) \
        .filter(col("`@timestamp`").isNotNull()) \
        .withColumn("event_timestamp",
            to_timestamp(col("`@timestamp`"))) \
        .withColumn("node",
            coalesce(col("Node"), col("host.hostname"))) \
        .withColumn("location",
            coalesce(col("Location"), col("host.location.site.name"))) \
        .withColumn("theater",
            coalesce(col("GMS_Theater"), col("host.location.site.theater"))) \
        .withColumn("ops_center",
            col("GMS_OperationsCenter")) \
        .withColumn("quad_code",
            col("GMS_QCode")) \
        .withColumn("alert_group",    col("AlertGroup")) \
        .withColumn("event_id",       col("EventId")) \
        .withColumn("alert_key",      col("AlertKey")) \
        .withColumn("summary",        col("Summary")) \
        .withColumn("severity_num",   col("Severity").cast(IntegerType())) \
        .withColumn("severity_label",
            when(col("Severity") >= 5, "CRITICAL")
            .when(col("Severity") >= 4, "MAJOR")
            .when(col("Severity") >= 3, "MINOR")
            .when(col("Severity") >= 2, "WARNING")
            .otherwise("INFORMATIONAL")) \
        .withColumn("tally",          col("Tally").cast(LongType())) \
        .withColumn("acknowledged",   col("Acknowledged") == 1) \
        .withColumn("service",        col("Service")) \
        .withColumn("node_ip",        col("NodeAlias")) \
        .withColumn("remote_ip",      col("RemoteNodeAlias")) \
        .withColumn("geo_lat",        col("host.geo.lat")) \
        .withColumn("geo_lon",        col("host.geo.lon")) \
        .withColumn("first_occurrence",
            to_timestamp((col("FirstOccurrence") / 1000).cast(LongType()))) \
        .withColumn("last_occurrence",
            to_timestamp((col("LastOccurrence") / 1000).cast(LongType()))) \
        .withColumn("is_active",
            col("NetcoolEventAction").isin("insert", "update")) \
        .withColumn("_processed_at",  current_timestamp()) \
        .select("event_timestamp","node","location","theater","ops_center",
                "quad_code","alert_group","event_id","alert_key","summary",
                "severity_num","severity_label","tally","acknowledged",
                "service","node_ip","remote_ip","geo_lat","geo_lon",
                "first_occurrence","last_occurrence","is_active","_processed_at")

    _upsert_or_create(spark, silver, Paths.silver("netcool_events"), "alert_key")
    print(f"   ✅ {silver.count():,} rows → silver.netcool_events")


# ── DXNETOPS → silver.device_metrics ────────────────────────────────
def silver_dxnetops(spark: SparkSession):
    print("\n🔧 SILVER: DXNETOPS device metrics...")
    df = spark.read.format("delta").load(Paths.bronze("raw_dxnetops"))

    silver = df \
        .filter(col("`@timestamp`").isNotNull()) \
        .withColumn("event_timestamp",
            to_timestamp(col("`@timestamp`"))) \
        .withColumn("cycle_timestamp",
            to_timestamp(col("cycleTimestamp"))) \
        .withColumn("device_name",
            col("host.hostname")) \
        .withColumn("device_ip",
            col("host.ip")) \
        .withColumn("quad_code",
            col("host.quadcode")) \
        .withColumn("site_name",
            col("host.location.site_name")) \
        .withColumn("theater",
            col("host.location.theater")) \
        .withColumn("country",
            col("host.location.country")) \
        .withColumn("geo_lat",
            col("host.geo_location.lat")) \
        .withColumn("geo_lon",
            col("host.geo_location.lon")) \
        .withColumn("metric_family",       col("metricFamily")) \
        .withColumn("metric_family_display",col("metricFamilyDisplayName")) \
        .withColumn("component_name",      col("componentName")) \
        .withColumn("equip_type",          col("equipt_type")) \
        .withColumn("dcm_id",              col("dcmID")) \
        .withColumn("poll_rate_ms",        col("pollRateMS").cast(LongType())) \
        .withColumn("utilization",
            coalesce(
                col("metrics.Utilization"),
                col("metrics.CPUUtilizationLastMin")
            ).cast(DoubleType())) \
        .withColumn("health_status",
            when(col("utilization") >= 90, "CRITICAL")
            .when(col("utilization") >= 80, "DEGRADED")
            .otherwise("HEALTHY")) \
        .withColumn("_processed_at", current_timestamp()) \
        .select("event_timestamp","cycle_timestamp","device_name","device_ip",
                "quad_code","site_name","theater","country","geo_lat","geo_lon",
                "metric_family","metric_family_display","component_name",
                "equip_type","dcm_id","poll_rate_ms","utilization",
                "health_status","_processed_at")

    path = Paths.silver("device_metrics")
    silver.write.format("delta").mode("overwrite") \
        .option("overwriteSchema", "true").save(path)
    print(f"   ✅ {silver.count():,} rows → silver.device_metrics")


# ── ELASTIFLOW → silver.network_flows ───────────────────────────────
def silver_elastiflow(spark: SparkSession):
    print("\n🔧 SILVER: ElastiFlow network flows...")
    df = spark.read.format("delta").load(Paths.bronze("raw_elastiflow"))

    silver = df \
        .filter(col("`event.created`").isNotNull()) \
        .withColumn("event_timestamp",
            to_timestamp((col("`event.created`") / 1000).cast(LongType()))) \
        .withColumn("host_name",       col("`host.name`")) \
        .withColumn("host_ip",         col("`host.ip`")) \
        .withColumn("src_ip",          col("`source.ip`")) \
        .withColumn("dst_ip",          col("`destination.ip`")) \
        .withColumn("src_port",        col("`source.port`").cast(IntegerType())) \
        .withColumn("dst_port",        col("`destination.port`").cast(IntegerType())) \
        .withColumn("network_bytes",   col("`network.bytes`").cast(LongType())) \
        .withColumn("network_packets", col("`network.packets`").cast(LongType())) \
        .withColumn("transport",       col("`network.transport`")) \
        .withColumn("network_type",    col("`network.type`")) \
        .withColumn("direction",       col("`network.direction`")) \
        .withColumn("locality",        col("`flow.locality`")) \
        .withColumn("template_id",     col("`flow.template.id`").cast(IntegerType())) \
        .withColumn("flow_version",    col("`flow.export.version.name`")) \
        .withColumn("event_reason",    col("`event.reason`")) \
        .withColumn("is_public",       col("`flow.locality`") == "public") \
        .withColumn("is_large_flow",   col("`network.bytes`") > 1_000_000) \
        .withColumn("ingress_iface",   col("`observer.ingress.interface.id`").cast(IntegerType())) \
        .withColumn("egress_iface",    col("`observer.egress.interface.id`").cast(IntegerType())) \
        .withColumn("_processed_at",   current_timestamp()) \
        .select("event_timestamp","host_name","host_ip","src_ip","dst_ip",
                "src_port","dst_port","network_bytes","network_packets",
                "transport","network_type","direction","locality","template_id",
                "flow_version","event_reason","is_public","is_large_flow",
                "ingress_iface","egress_iface","_processed_at")

    path = Paths.silver("network_flows")
    silver.write.format("delta").mode("overwrite") \
        .option("overwriteSchema", "true").save(path)
    print(f"   ✅ {silver.count():,} rows → silver.network_flows")


# ── NETSCOUT APP → silver.app_performance ───────────────────────────
def silver_netscout_app(spark: SparkSession):
    print("\n🔧 SILVER: Netscout App performance...")
    df = spark.read.format("delta").load(Paths.bronze("raw_netscout_app"))

    silver = df \
        .filter(col("application_name").isNotNull()) \
        .filter(col("timestamp").isNotNull()) \
        .withColumn("event_timestamp",
            to_timestamp(col("timestamp"), "yyyy-MM-dd HH:mm:ss.SSSSSS z")) \
        .withColumn("application_name",   trim(col("application_name"))) \
        .withColumn("application_group",  trim(col("application_group"))) \
        .withColumn("device_alias",       col("device_alias")) \
        .withColumn("interface_alias",    col("device_interface_alias")) \
        .withColumn("client_ip",          col("client_host_ip_address")) \
        .withColumn("server_ip",          col("server_host_ip_address")) \
        .withColumn("server_port",        col("server_port").cast(IntegerType())) \
        .withColumn("vlan_id",            col("vlan_id").cast(IntegerType())) \
        .withColumn("successful_transactions",
            coalesce(col("successful_transactions"), lit(0)).cast(LongType())) \
        .withColumn("failed_transactions",
            coalesce(col("failed_transactions"), lit(0)).cast(LongType())) \
        .withColumn("timeouts",
            coalesce(col("timeouts"), lit(0)).cast(LongType())) \
        .withColumn("peak_response_time_ms",
            coalesce(col("peak_response_time"), lit(0)).cast(LongType())) \
        .withColumn("total_response_time_ms",
            coalesce(col("total_response_time"), lit(0)).cast(LongType())) \
        .withColumn("avg_response_time_ms",
            when(col("successful_transactions") > 0,
                 col("total_response_time") / col("successful_transactions"))
            .otherwise(lit(0)).cast(DoubleType())) \
        .withColumn("error_rate",
            when((col("successful_transactions") + col("failed_transactions")) > 0,
                 col("failed_transactions") * 100.0 /
                 (col("successful_transactions") + col("failed_transactions")))
            .otherwise(lit(0.0))) \
        .withColumn("timeout_rate",
            when(col("successful_transactions") > 0,
                 col("timeouts") * 100.0 / col("successful_transactions"))
            .otherwise(lit(0.0))) \
        .withColumn("experience_score",
            greatest(lit(0.0),
                least(lit(100.0),
                    lit(100.0)
                    - (col("error_rate") * 2)
                    - (col("timeout_rate") * 3)
                    - (when(col("avg_response_time_ms") > 2000, lit(30.0))
                       .when(col("avg_response_time_ms") > 1000, lit(15.0))
                       .when(col("avg_response_time_ms") > 500,  lit(5.0))
                       .otherwise(lit(0.0)))))) \
        .withColumn("health_status",
            when(col("experience_score") < 50, "CRITICAL")
            .when(col("experience_score") < 70, "DEGRADED")
            .otherwise("HEALTHY")) \
        .withColumn("_processed_at", current_timestamp()) \
        .select("event_timestamp","application_name","application_group",
                "device_alias","interface_alias","client_ip","server_ip",
                "server_port","vlan_id","successful_transactions",
                "failed_transactions","timeouts","peak_response_time_ms",
                "total_response_time_ms","avg_response_time_ms",
                "error_rate","timeout_rate","experience_score",
                "health_status","_processed_at")

    path = Paths.silver("app_performance")
    silver.write.format("delta").mode("overwrite") \
        .option("overwriteSchema", "true").save(path)
    print(f"   ✅ {silver.count():,} rows → silver.app_performance")


# ── NETSCOUT THROUGHPUT → silver.network_throughput ─────────────────
def silver_netscout_throughput(spark: SparkSession):
    print("\n🔧 SILVER: Netscout Throughput...")
    df = spark.read.format("delta").load(Paths.bronze("raw_netscout_throughput"))

    silver = df \
        .filter(col("device_alias").isNotNull()) \
        .withColumn("event_timestamp",
            to_timestamp(col("timestamp"), "yyyy-MM-dd HH:mm:ss.SSSSSS z")) \
        .withColumn("device_alias",          col("device_alias")) \
        .withColumn("interface_alias",       col("device_interface_alias")) \
        .withColumn("application",           col("application")) \
        .withColumn("application_group",     col("application_group")) \
        .withColumn("vlan_id",               col("vlan_id").cast(IntegerType())) \
        .withColumn("octets_in",             col("octets_in").cast(LongType())) \
        .withColumn("octets_out",            col("octets_out").cast(LongType())) \
        .withColumn("packets_in",            col("packets_in").cast(LongType())) \
        .withColumn("packets_out",           col("packets_out").cast(LongType())) \
        .withColumn("peak_bytes_out",        col("peak_bytes_out").cast(LongType())) \
        .withColumn("total_bytes",
            col("octets_in") + col("octets_out")) \
        .withColumn("total_packets",
            col("packets_in") + col("packets_out")) \
        .withColumn("is_congested",
            col("peak_bytes_out") > 5_000_000) \
        .withColumn("_processed_at", current_timestamp()) \
        .select("event_timestamp","device_alias","interface_alias",
                "application","application_group","vlan_id",
                "octets_in","octets_out","packets_in","packets_out",
                "peak_bytes_out","total_bytes","total_packets",
                "is_congested","_processed_at")

    path = Paths.silver("network_throughput")
    silver.write.format("delta").mode("overwrite") \
        .option("overwriteSchema", "true").save(path)
    print(f"   ✅ {silver.count():,} rows → silver.network_throughput")


# ── DATANX → silver.device_inventory ────────────────────────────────
def silver_datanx(spark: SparkSession):
    print("\n🔧 SILVER: DataNX device inventory...")
    df = spark.read.format("delta").load(Paths.bronze("raw_datanx"))

    silver = df \
        .filter(col("DEVICE_NAME").isNotNull()) \
        .withColumn("device_name",    trim(col("DEVICE_NAME"))) \
        .withColumn("element",        trim(col("ELEMENT"))) \
        .withColumn("admin_status",   upper(trim(col("`ADMIN-STATUS`")))) \
        .withColumn("op_status",
            upper(trim(coalesce(col("`OP-STATUS`"), lit("N/A"))))) \
        .withColumn("data_source",    col("data_source")) \
        .withColumn("last_update",
            to_date(col("`LAST-UPDATE`").cast(StringType()), "yyyyMMdd")) \
        .withColumn("days_since_update",
            datediff(current_date(), col("last_update"))) \
        .withColumn("is_up",          col("admin_status") == "UP") \
        .withColumn("is_operational",
            coalesce(col("op_status") == "O", lit(True))) \
        .withColumn("version",
            coalesce(col("VERSION"), lit("UNKNOWN"))) \
        .withColumn("ip_address",
            coalesce(col("`IP-ADDRESS`"), lit(None))) \
        .withColumn("node_type",
            coalesce(col("`NODE-TYPE`"), lit("N/A"))) \
        .withColumn("bandwidth",
            coalesce(col("BANDWIDTH").cast(DoubleType()), lit(0.0))) \
        .withColumn("part_number",
            coalesce(col("PARTNUM"), lit(None))) \
        .withColumn("description",
            coalesce(col("DESCRIPTION"), lit(None))) \
        .withColumn("serial_number",
            coalesce(col("SERIALNUM"), lit(None))) \
        .withColumn("hw_rev",
            coalesce(col("HWREV"), lit(None))) \
        .withColumn("fw_rev",
            coalesce(col("FWREV"), lit(None))) \
        .withColumn("health_score",
            when(~col("is_up"), lit(10.0))
            .when(col("days_since_update") > 180, lit(60.0))
            .when(col("days_since_update") > 90,  lit(75.0))
            .otherwise(lit(95.0))) \
        .withColumn("_processed_at", current_timestamp()) \
        .select("device_name","element","admin_status","op_status",
                "data_source","last_update","days_since_update",
                "is_up","is_operational","version","ip_address","node_type",
                "bandwidth","part_number","description","serial_number",
                "hw_rev","fw_rev","health_score","_processed_at")

    path = Paths.silver("device_inventory")
    silver.write.format("delta").mode("overwrite") \
        .option("overwriteSchema", "true").save(path)
    print(f"   ✅ {silver.count():,} rows → silver.device_inventory")


def _upsert_or_create(spark, df, path, key):
    df = df.dropDuplicates([key])  # prevent MERGE ambiguity
    if DeltaTable.isDeltaTable(spark, path):
        DeltaTable.forPath(spark, path).alias("t") \
            .merge(df.alias("s"), f"t.`{key}` = s.`{key}`") \
            .whenMatchedUpdateAll() \
            .whenNotMatchedInsertAll() \
            .execute()
    else:
        df.write.format("delta").mode("overwrite") \
          .option("overwriteSchema", "true").save(path)


if __name__ == "__main__":
    spark = get_spark("Silver-OE-Transform-v2")
    try:
        silver_netcool(spark)
        silver_dxnetops(spark)
        silver_elastiflow(spark)
        silver_netscout_app(spark)
        silver_netscout_throughput(spark)
        silver_datanx(spark)
        print("\n✅ SILVER TRANSFORM COMPLETE")
    finally:
        spark.stop()