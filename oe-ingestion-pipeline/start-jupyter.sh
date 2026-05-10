#!/bin/bash
pip install --no-cache-dir --quiet delta-spark==3.2.0 boto3==1.34.0 s3fs==2024.2.0 || true
exec jupyter lab --ip=0.0.0.0 --port=8888 --no-browser --NotebookApp.token=databricks --NotebookApp.password= --notebook-dir=/home/jovyan