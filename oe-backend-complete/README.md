# OE Backend Config — Complete File List
## What goes where in your Spring Boot project

---

## Drop-in replacements and new files

### src/main/resources/  (3 files)

| File | Action | Profile activated by |
|---|---|---|
| application.yml | REPLACE existing | Default / production |
| application-local.yml | REPLACE existing | -Dspring-boot.run.profiles=local,mock |
| application-thrift.yml | ADD new | -Dspring-boot.run.profiles=thrift |

---

### src/main/java/mil/disa/oe/config/  (2 files)

| File | Action |
|---|---|
| TableNames.java | ADD new |
| ConnectionValidationService.java | ADD new |

---

### src/main/java/mil/disa/oe/repository/  (6 files — REPLACE ALL)

All 6 repositories now inject TableNames instead of hard-coding "gold."

| File | Action |
|---|---|
| AppHealthRepository.java | REPLACE |
| NetworkPerformanceRepository.java | REPLACE |
| DeviceHealthRepository.java | REPLACE |
| TopIssuesRepository.java | REPLACE |
| VersionSprawlRepository.java | REPLACE |
| DataSourceStatusRepository.java | REPLACE |

Also DELETE the old Repositories.java multi-class file if it still exists.

---

## How to run each environment

```bash
# Option A — Mock (works right now, no pipeline needed)
mvn spring-boot:run -Dspring-boot.run.profiles=local,mock

# Option B — Thrift Server (reads real Gold tables from MinIO)
mvn spring-boot:run -Dspring-boot.run.profiles=thrift

# Production — AWS Databricks
export DATABRICKS_HOST=your-workspace.azuredatabricks.net
export DATABRICKS_TOKEN=dapi-xxxxxxxxxxxx
export DATABRICKS_HTTP_PATH=/sql/1.0/warehouses/xxxx
mvn spring-boot:run
```

---

## The one change for Unity Catalog (when DISA enables it)

In application.yml change ONE line:
  oe.datasource.gold-prefix: main.gold

All 6 repositories update automatically. No SQL changes.
