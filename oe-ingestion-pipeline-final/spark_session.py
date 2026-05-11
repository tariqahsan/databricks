"""
spark_session.py
================
SparkSession factory for the OE Data Intelligence Platform.

LOCAL (Docker Desktop):
    Runs in local[2] mode inside the Jupyter container.
    Reason: jupyter/pyspark-notebook has Spark 3.5.0 but the
    apache/spark worker has 3.5.3 — version mismatch causes
    Java serialization errors when using spark://spark-master:7077.
    local[2] = 2 threads inside the same JVM, no version conflict.

REAL DATABRICKS (AWS GovCloud):
    Replace get_spark() body with:
        from databricks.connect import DatabricksSession
        return DatabricksSession.builder.getOrCreate()

    And change Paths to use real S3:
        BRONZE = "s3://disa-datalake/bronze"
        SILVER = "s3://disa-datalake/silver"
        GOLD   = "s3://disa-datalake/gold"
"""

import os
from pyspark.sql import SparkSession


def get_spark(app_name: str = "OE-DataIntelligence") -> SparkSession:
    """
    Returns a configured SparkSession.

    Local Docker: uses local[2] + MinIO (S3-compatible).
    Real Databricks: swap body for DatabricksSession (one line).

    Environment variables (set in docker-compose.yml):
        AWS_ACCESS_KEY_ID       MinIO access key
        AWS_SECRET_ACCESS_KEY   MinIO secret key
        AWS_ENDPOINT_URL        MinIO endpoint (http://minio:9000)
    """
    # NOTE: Defaults to local[2] — NOT spark://spark-master:7077
    # This avoids the Spark version mismatch between Jupyter (3.5.0)
    # and the worker container (3.5.3).
    spark_master   = os.getenv("SPARK_MASTER",         "local[2]")
    minio_endpoint = os.getenv("AWS_ENDPOINT_URL",     "http://minio:9000")
    access_key     = os.getenv("AWS_ACCESS_KEY_ID",    "minioadmin")
    secret_key     = os.getenv("AWS_SECRET_ACCESS_KEY","minioadmin")

    spark = (
        SparkSession.builder
        .appName(app_name)
        .master(spark_master)

        # ── Delta Lake ─────────────────────────────────────────────
        .config("spark.sql.extensions",
                "io.delta.sql.DeltaSparkSessionExtension")
        .config("spark.sql.catalog.spark_catalog",
                "org.apache.spark.sql.delta.catalog.DeltaCatalog")
        .config("spark.jars.packages",
                "io.delta:delta-spark_2.12:3.2.0,"
                "org.apache.hadoop:hadoop-aws:3.3.4")

        # ── MinIO / S3 ─────────────────────────────────────────────
        .config("spark.hadoop.fs.s3a.endpoint",           minio_endpoint)
        .config("spark.hadoop.fs.s3a.access.key",         access_key)
        .config("spark.hadoop.fs.s3a.secret.key",         secret_key)
        .config("spark.hadoop.fs.s3a.path.style.access",  "true")
        .config("spark.hadoop.fs.s3a.impl",
                "org.apache.hadoop.fs.s3a.S3AFileSystem")
        .config("spark.hadoop.fs.s3a.aws.credentials.provider",
                "org.apache.hadoop.fs.s3a.SimpleAWSCredentialsProvider")
        .config("spark.hadoop.fs.s3a.connection.ssl.enabled", "false")

        # ── Performance ─────────────────────────────────────────────
        .config("spark.sql.shuffle.partitions", "8")
        .config("spark.driver.memory",          "2g")
        .config("spark.executor.memory",        "2g")

        .getOrCreate()
    )

    spark.sparkContext.setLogLevel("WARN")
    return spark


class Paths:
    """
    Delta Lake table paths — MinIO (local) or S3 (Databricks).

    Local:      s3a://bronze/raw_aternity
    Databricks: s3://disa-datalake/bronze/raw_aternity
    """

    # ── Medallion layers ────────────────────────────────────────────
    BRONZE = "s3a://bronze"
    SILVER = "s3a://silver"
    GOLD   = "s3a://gold"
    RAW    = "s3a://raw-logs"

    @staticmethod
    def bronze(table: str) -> str:
        """Raw ingestion — append-only Delta tables."""
        return f"{Paths.BRONZE}/{table}"

    @staticmethod
    def silver(table: str) -> str:
        """Cleansed, validated, MERGE/upsert Delta tables."""
        return f"{Paths.SILVER}/{table}"

    @staticmethod
    def gold(table: str) -> str:
        """Pre-aggregated KPI tables — queried by Spring Boot API."""
        return f"{Paths.GOLD}/{table}"

    @staticmethod
    def raw(source: str) -> str:
        """Uploaded raw log files before Bronze ingestion."""
        return f"{Paths.RAW}/{source}"
