#!/bin/bash
# start-jupyter.sh
# Mounted into /usr/local/bin/before-notebook.d/ by docker-compose.
# Runs automatically before JupyterLab starts on every container boot.
set -e

echo "=========================================================="
echo "  OE Platform — installing Python dependencies..."
echo "=========================================================="

# Pin pyspark==3.5.0 to match the image version.
# Without this pin, pip ignores the conda-installed pyspark and
# downloads + builds pyspark 3.5.8 from scratch (317MB, ~5 mins).
# With the pin, pip sees 3.5.0 as already satisfied and skips it.
pip install --no-cache-dir \
    delta-spark==3.2.0 \
    boto3==1.34.0 \
    s3fs==2024.2.0 \
    pyspark==3.5.0

echo "  ✅ delta-spark, boto3, s3fs ready"
echo "=========================================================="