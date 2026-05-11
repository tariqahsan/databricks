#!/usr/bin/env python3
"""
generate_mock_logs.py
=====================
Generates realistic raw system logs for all 6 OE data sources.

Run this BEFORE the ingestion pipeline to produce log files
with today's date that ingest_all_sources.py will consume.

NOTE: This file lives at the project root (not scripts/) because
      the docker-compose.yml mounts it directly to /home/jovyan/.
      Run it from inside the Jupyter terminal:
          python /home/jovyan/generate_mock_logs.py --days 1

Usage:
    python generate_mock_logs.py            # 1 day of data
    python generate_mock_logs.py --days 3   # 3 days of history

Output:
    mock-logs/aternity/   aternity_performance_YYYYMMDD.jsonl
    mock-logs/netscout/   netscout_flows_YYYYMMDD.csv
    mock-logs/intune/     intune_devices_YYYYMMDD.jsonl
    mock-logs/infoblox/   infoblox_dns_YYYYMMDD.log
    mock-logs/salesforce/ salesforce_cases_YYYYMMDD.csv
    mock-logs/sciencelogic/ sciencelogic_alerts_YYYYMMDD.jsonl
"""

import json
import csv
import random
import argparse
from datetime import datetime, timedelta
from pathlib import Path

# ── Output directory (inside Jupyter container) ───────────────────────
BASE = Path(__file__).parent / "mock-logs"

# ── Reference data ────────────────────────────────────────────────────
APPS = [
    "Microsoft Teams", "Outlook Web App", "ServiceNow", "Salesforce CRM",
    "SAP ERP", "NIPR Email", "SIPR Portal", "SharePoint Online",
    "Microsoft Office 365", "DEERS Online", "myPay (DFAS)",
    "Defense Travel System", "iPERMS", "AKO Portal", "GCSS-Army"
]

DEVICES = [
    ("DEV-001","TARIQ-LAPTOP",    "LAPTOP", "Windows","11 23H2","tariq.richardson@mail.mil","Arlington VA"),
    ("DEV-002","SYSADMIN-DT-01", "DESKTOP","Windows","10 21H2","j.smith@mail.mil",          "Fort Meade MD"),
    ("DEV-003","MOBILE-SGT-01",  "MOBILE", "iOS",    "17.4",   "sgt.johnson@mail.mil",      "Fort Bragg NC"),
    ("DEV-004","TABLET-LT-01",   "TABLET", "Android","13",     "lt.williams@mail.mil",      "Pentagon DC"),
    ("DEV-005","LAPTOP-CIV-01",  "LAPTOP", "Windows","11 23H2","m.jones@mail.mil",          "Arlington VA"),
    ("DEV-006","DESKTOP-IT-02",  "DESKTOP","Windows","11 22H2","it.support@disa.mil",       "Fort Meade MD"),
    ("DEV-007","LAPTOP-SES-01",  "LAPTOP", "Windows","11 23H2","ses.director@disa.mil",     "Arlington VA"),
    ("DEV-008","DESKTOP-OLD-01", "DESKTOP","Windows","7 SP1",  "legacy.user@mail.mil",      "Fort Belvoir VA"),
    ("DEV-009","LAPTOP-CYBER-01","LAPTOP", "Windows","11 23H2","cyber.analyst@disa.mil",    "Fort Meade MD"),
    ("DEV-010","MOBILE-GEN-02",  "MOBILE", "iOS",    "16.7",   "gen.officer@mail.mil",      "Pentagon DC"),
    ("DEV-011","LAPTOP-FIN-01",  "LAPTOP", "Windows","10 22H2","finance.clerk@mail.mil",    "Arlington VA"),
    ("DEV-012","DESKTOP-HR-01",  "DESKTOP","Windows","11 22H2","hr.specialist@mail.mil",    "Fort Meade MD"),
    ("DEV-013","LAPTOP-OPS-01",  "LAPTOP", "Windows","8.1",    "ops.analyst@mail.mil",      "Pentagon DC"),
    ("DEV-014","MOBILE-SFC-01",  "MOBILE", "Android","14",     "sfc.jones@mail.mil",        "Fort Bragg NC"),
    ("DEV-015","LAPTOP-CIO-01",  "LAPTOP", "Windows","11 23H2","cio.staff@disa.mil",        "Arlington VA"),
]

SEGMENTS = [
    ("DISA-WAN-DC-01",        "WAN",        "Washington DC"),
    ("DISA-WAN-PENTAGON",     "WAN",        "Pentagon"),
    ("DISA-WAN-MEADE-01",     "WAN",        "Fort Meade MD"),
    ("DISA-LAN-ARLINGTON-01", "LAN",        "Arlington VA"),
    ("DISA-LAN-ARLINGTON-02", "LAN",        "Arlington VA"),
    ("DISA-CLOUD-AWS-E1",     "CLOUD",      "AWS us-east-1"),
    ("DISA-CLOUD-AWS-W1",     "CLOUD",      "AWS us-west-2"),
    ("DISA-WAN-BRAGG",        "WAN",        "Fort Bragg NC"),
    ("DISA-WAN-BELVOIR",      "WAN",        "Fort Belvoir VA"),
    ("DISA-DC-CORE-01",       "DATACENTER", "Ogden UT"),
    ("DISA-DC-CORE-02",       "DATACENTER", "Columbus OH"),
]

DNS_SERVERS = [
    "dns-primary-meade.disa.mil",
    "dns-secondary-arlington.disa.mil",
    "dns-backup-belvoir.disa.mil",
    "dns-cloud-aws-east.disa.mil",
]

TEAMS = [
    "OE Network Team", "Device Management Team", "Cybersecurity Team",
    "Infrastructure Team", "DNS/DHCP Team", "Application Team"
]


def fmt(dt: datetime) -> str:
    return dt.strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"


def is_peak(dt: datetime) -> bool:
    return 8 <= dt.hour <= 18


def packet_loss_for_segment(seg_id: str, dt: datetime) -> float:
    base = {
        "DISA-WAN-DC-01": 3.2, "DISA-WAN-PENTAGON": 2.4,
        "DISA-WAN-MEADE-01": 1.8, "DISA-LAN-ARLINGTON-01": 1.2,
        "DISA-LAN-ARLINGTON-02": 0.9, "DISA-CLOUD-AWS-E1": 0.8,
        "DISA-CLOUD-AWS-W1": 0.7, "DISA-WAN-BRAGG": 0.6,
        "DISA-WAN-BELVOIR": 0.5, "DISA-DC-CORE-01": 0.2,
        "DISA-DC-CORE-02": 0.2,
    }.get(seg_id, 0.3)
    multiplier = 1.4 if is_peak(dt) else 0.6
    return round(base * multiplier * random.uniform(0.7, 1.3), 3)


# ─────────────────────────────────────────────────────────────────────
# 1. ATERNITY — App Performance (JSONL)
# ─────────────────────────────────────────────────────────────────────
def generate_aternity(days: int, now: datetime):
    out = BASE / "aternity"
    out.mkdir(parents=True, exist_ok=True)

    app_profiles = {
        "Microsoft Teams":     {"base_score": 42, "base_rt": 1800, "crash_rate": 0.04},
        "Outlook Web App":     {"base_score": 48, "base_rt": 2100, "crash_rate": 0.03},
        "ServiceNow":          {"base_score": 60, "base_rt": 900,  "crash_rate": 0.01},
        "Salesforce CRM":      {"base_score": 64, "base_rt": 750,  "crash_rate": 0.01},
        "SAP ERP":             {"base_score": 66, "base_rt": 680,  "crash_rate": 0.01},
        "NIPR Email":          {"base_score": 72, "base_rt": 420,  "crash_rate": 0.004},
        "SharePoint Online":   {"base_score": 84, "base_rt": 270,  "crash_rate": 0.001},
        "Microsoft Office 365":{"base_score": 94, "base_rt": 168,  "crash_rate": 0.0002},
        "DEERS Online":        {"base_score": 90, "base_rt": 200,  "crash_rate": 0.0005},
        "myPay (DFAS)":        {"base_score": 87, "base_rt": 212,  "crash_rate": 0.0003},
        "Defense Travel System":{"base_score":88, "base_rt": 220,  "crash_rate": 0.0003},
        "GCSS-Army":           {"base_score": 92, "base_rt": 185,  "crash_rate": 0.0002},
    }

    error_codes = {
        "Microsoft Teams":   ["TEAMS_ERR_4001","TEAMS_ERR_4002","TEAMS_CALL_DROP","NONE"],
        "Outlook Web App":   ["OWA_SYNC_FAIL","OWA_TIMEOUT","OWA_AUTH_ERR","NONE"],
        "ServiceNow":        ["SN_DB_TIMEOUT","SN_POOL_EXHAUSTED","NONE"],
        "SAP ERP":           ["SAP_RFC_FAIL","SAP_LOCK_TIMEOUT","NONE"],
    }

    records = []
    for _ in range(int(days * 2500)):
        dt   = now - timedelta(seconds=random.randint(0, int(days*86400)))
        app  = random.choice(list(app_profiles.keys()))
        dev  = random.choice(DEVICES)
        prof = app_profiles[app]

        peak_factor = 1.6 if is_peak(dt) and prof["base_score"] < 70 else 1.0
        rt    = int(prof["base_rt"] * peak_factor * random.uniform(0.6, 1.8))
        score = max(0, min(100, prof["base_score"]
                           - (peak_factor-1)*15
                           + random.gauss(0, 5)))
        crash = random.random() < prof["crash_rate"] * peak_factor
        errs  = error_codes.get(app, ["NONE","APP_GENERIC_ERR"])
        err   = random.choice(errs) if crash else "NONE"

        records.append({
            "timestamp":        fmt(dt),
            "app_name":         app,
            "user_id":          dev[6].split("@")[0] if False else dev[5].split("@")[0],
            "user_email":       dev[5],
            "device_id":        dev[0],
            "device_name":      dev[1],
            "session_id":       f"SES-{random.randint(100000,999999)}",
            "response_time_ms": rt,
            "page_load_ms":     int(rt * random.uniform(0.4, 0.8)),
            "experience_score": round(score, 1),
            "crash_flag":       crash,
            "error_code":       err,
            "client_os":        dev[3] + " " + dev[4],
            "location":         dev[6],
            "network_segment":  random.choice([s[0] for s in SEGMENTS]),
            "data_source":      "ATERNITY",
        })

    records.sort(key=lambda r: r["timestamp"])
    fname = out / f"aternity_performance_{now.strftime('%Y%m%d')}.jsonl"
    with open(fname, "w") as f:
        for r in records:
            f.write(json.dumps(r) + "\n")
    print(f"  ✅ Aternity: {len(records):,} records")


# ─────────────────────────────────────────────────────────────────────
# 2. NETSCOUT — Network Flows (CSV)
# ─────────────────────────────────────────────────────────────────────
def generate_netscout(days: int, now: datetime):
    out = BASE / "netscout"
    out.mkdir(parents=True, exist_ok=True)

    anomaly_types = {
        "DISA-WAN-DC-01":        "CONGESTION",
        "DISA-WAN-PENTAGON":     "HARDWARE_DEGRADATION",
        "DISA-WAN-MEADE-01":     "LINK_SATURATION",
        "DISA-LAN-ARLINGTON-01": "DUPLEX_MISMATCH",
        "DISA-CLOUD-AWS-E1":     "MTU_MISMATCH",
        "DISA-WAN-BRAGG":        "BGP_INSTABILITY",
    }

    rows = [["timestamp","segment_id","segment_type","location",
             "src_ip","dst_ip","protocol","bytes_in","bytes_out",
             "packet_loss_pct","latency_ms","jitter_ms",
             "bandwidth_util_pct","anomaly_flag","anomaly_type",
             "data_source"]]

    for _ in range(int(days * 3000)):
        dt  = now - timedelta(seconds=random.randint(0, int(days*86400)))
        seg = random.choice(SEGMENTS)
        sid, stype, loc = seg
        loss    = packet_loss_for_segment(sid, dt)
        latency = round(random.uniform(8, 90) * (1 + loss/2), 1)
        jitter  = round(latency * random.uniform(0.05, 0.25), 2)
        bw_util = min(round(random.uniform(20, 60) + (loss * 10), 1), 99.9)
        anomaly = loss > 1.5 or bw_util > 80
        atype   = anomaly_types.get(sid, "NORMAL") if anomaly else "NONE"
        prefix  = sid.split("-")[2] if len(sid.split("-")) > 2 else "10.0"

        rows.append([
            fmt(dt), sid, stype, loc,
            f"10.{random.randint(1,254)}.{random.randint(1,254)}.{random.randint(1,254)}",
            f"10.{random.randint(1,254)}.{random.randint(1,254)}.{random.randint(1,254)}",
            random.choice(["TCP","UDP","ICMP","HTTPS","RTP"]),
            random.randint(1000, 10_000_000),
            random.randint(500,  5_000_000),
            loss, latency, jitter, bw_util,
            anomaly, atype, "NETSCOUT"
        ])

    rows[1:] = sorted(rows[1:], key=lambda r: r[0])
    fname = out / f"netscout_flows_{now.strftime('%Y%m%d')}.csv"
    with open(fname, "w", newline="") as f:
        csv.writer(f).writerows(rows)
    print(f"  ✅ NetScout: {len(rows)-1:,} records")


# ─────────────────────────────────────────────────────────────────────
# 3. INTUNE — Device Management (JSONL)
# ─────────────────────────────────────────────────────────────────────
def generate_intune(days: int, now: datetime):
    out = BASE / "intune"
    out.mkdir(parents=True, exist_ok=True)

    # Old OS versions are always non-compliant (STIG violation)
    non_compliant_os = {"7 SP1", "8.1", "16.7", "13"}

    patches = {
        "11 23H2":"KB5036980","11 22H2":"KB5036979","10 22H2":"KB5036892",
        "10 21H2":"KB5036891","7 SP1":"KB2534111","8.1":"KB2919355",
        "17.4":"17.4.1","16.7":"16.7.8","14":"14.1","13":"13.0.0",
    }

    records = []
    for _ in range(int(days * 400)):
        dt  = now - timedelta(seconds=random.randint(0, int(days*86400)))
        dev = random.choice(DEVICES)
        did, dname, dtype, os_name, os_ver, user, loc = dev

        old_os     = os_ver in non_compliant_os
        compliance = "NON_COMPLIANT" if old_os else (
            "NON_COMPLIANT" if random.random() < 0.12 else "COMPLIANT"
        )
        health    = round(random.uniform(10, 40) if old_os
                          else random.uniform(65, 99), 1)
        encrypted = not old_os and compliance == "COMPLIANT"
        last_checkin = (
            now - timedelta(days=random.randint(8, 60))
            if compliance == "NON_COMPLIANT" and random.random() < 0.5
            else dt
        )

        records.append({
            "timestamp":                 fmt(dt),
            "device_id":                 did,
            "device_name":               dname,
            "device_type":               dtype,
            "os_name":                   os_name,
            "os_version":                os_ver,
            "compliance_state":          compliance,
            "last_check_in":             fmt(last_checkin),
            "assigned_user":             user,
            "location":                  loc,
            "encryption_enabled":        encrypted,
            "firewall_enabled":          compliance == "COMPLIANT",
            "antivirus_enabled":         compliance == "COMPLIANT",
            "antivirus_definition_date": (
                now - timedelta(days=0 if compliance == "COMPLIANT"
                                else random.randint(30, 180))
            ).strftime("%Y-%m-%d"),
            "health_score":              health,
            "management_agent":          "INTUNE" if os_ver not in non_compliant_os
                                         else "GPO",
            "enrollment_status":         "ENROLLED" if compliance == "COMPLIANT"
                                         else "ENROLLED_NON_COMPLIANT",
            "patch_level":               patches.get(os_ver, "UNKNOWN"),
            "jailbroken":                False,
            "data_source":               "INTUNE",
        })

    records.sort(key=lambda r: r["timestamp"])
    fname = out / f"intune_devices_{now.strftime('%Y%m%d')}.jsonl"
    with open(fname, "w") as f:
        for r in records:
            f.write(json.dumps(r) + "\n")
    print(f"  ✅ Intune: {len(records):,} records")


# ─────────────────────────────────────────────────────────────────────
# 4. INFOBLOX — DNS Query Logs (Syslog RFC 5424)
# ─────────────────────────────────────────────────────────────────────
def generate_infoblox(days: int, now: datetime):
    out = BASE / "infoblox"
    out.mkdir(parents=True, exist_ok=True)

    domains = [
        "teams.microsoft.com","outlook.office365.com","sharepoint.com",
        "login.microsoftonline.com","disa.mil","mail.mil","pentagon.mil",
        "army.mil","navy.mil","af.mil","usmc.mil","health.mil",
        "servicenow.com","salesforce.com","sap.com",
        "s3.amazonaws.com","s3.us-gov-west-1.amazonaws.com",
        "ec2.us-gov-east-1.amazonaws.com",
        "invalid-host.badactor.xyz",        # suspicious
        "malware-c2.suspicious.net",        # C2 traffic → REFUSED
        "nonexistent.mil",                  # → NXDOMAIN
        "typo.sharepointonline.com",        # → NXDOMAIN
    ]
    query_types = ["A","AAAA","MX","CNAME","TXT","PTR","SRV"]

    lines = []
    for _ in range(int(days * 8000)):
        dt     = now - timedelta(seconds=random.randint(0, int(days*86400)))
        server = random.choice(DNS_SERVERS)
        domain = random.choice(domains)

        # Primary server is degraded — high latency and failure rate
        is_primary = "primary" in server
        base_ms    = 380.0 if is_primary else random.uniform(1, 15)
        resp_ms    = round(base_ms * random.uniform(0.8, 1.4), 2)

        if "invalid" in domain or "suspicious" in domain or "malware" in domain:
            rcode = random.choice(["NXDOMAIN", "REFUSED"])
        elif "nonexistent" in domain or "typo" in domain:
            rcode = "NXDOMAIN"
        elif is_primary and random.random() < 0.08:
            rcode = random.choice(["SERVFAIL", "TIMEOUT"])
        else:
            rcode = "NOERROR"

        client = (f"10.{random.randint(1,254)}"
                  f".{random.randint(1,254)}"
                  f".{random.randint(1,254)}")
        ts_syslog = dt.strftime("%b %d %H:%M:%S")

        line = (f"{ts_syslog} {server} named[1234]: "
                f"client {client}#53: "
                f"query: {domain} IN {random.choice(query_types)} "
                f"response: {rcode} ({resp_ms}ms)")
        lines.append((fmt(dt), line))

    lines.sort(key=lambda x: x[0])
    fname = out / f"infoblox_dns_{now.strftime('%Y%m%d')}.log"
    with open(fname, "w") as f:
        for _, line in lines:
            f.write(line + "\n")
    print(f"  ✅ Infoblox: {len(lines):,} records")


# ─────────────────────────────────────────────────────────────────────
# 5. SALESFORCE — Incident Tickets (CSV)
# ─────────────────────────────────────────────────────────────────────
def generate_salesforce(days: int, now: datetime):
    out = BASE / "salesforce"
    out.mkdir(parents=True, exist_ok=True)

    issues = [
        ("Microsoft Teams voice/video failure — 3200 users affected",
         "APPLICATION","P1","High packet loss on DISA-WAN-DC-01 causing RTP drops",3200),
        ("DISA-WAN-DC-01 packet loss at 3.84% — congestion confirmed",
         "NETWORK","P1","CONGESTION: Peak hour traffic saturating 1Gbps uplink at 91%",0),
        ("Pentagon WAN hardware degradation — ASR 1001-X fault",
         "NETWORK","P2","ASR 1001-X hardware fault — error counters elevated 400%",0),
        ("1284 devices not checked in to Intune MDM over 7 days",
         "DEVICE","P2","VPN profile blocking TCP 443 to IntuneManagement.microsoft.com",1284),
        ("Infoblox primary DNS elevated latency 380ms",
         "NETWORK","P2","DNS forwarder misconfiguration after patch Tuesday",0),
        ("2418 devices running unsupported OS — STIG violation",
         "SECURITY","P2","Legacy hardware cannot upgrade to Win10/11",2418),
        ("ServiceNow DB connection pool exhaustion during month-end",
         "APPLICATION","P3","Month-end batch jobs exhausting connection pool",1250),
        ("SAP ERP month-end batch failures — lock contention",
         "APPLICATION","P3","Lock timeout on accounting tables BKPF/BSEG",2800),
        ("VPN tunnel drops during peak hours — IKEv2 failures",
         "NETWORK","P3","IKEv2 SA lifetime too short — renegotiation storm",480),
        ("MFA failures for PIV/CAC users — Pentagon building",
         "SECURITY","P2","Gemalto IDPrime firmware incompatible with Win11 22H2",380),
        ("SharePoint search indexing 4-hour delay",
         "APPLICATION","P4","Search crawler throttled by low disk I/O",3600),
        ("Antivirus definition updates failing on 200 devices",
         "SECURITY","P3","McAfee ePO server certificate expired",200),
        ("NIPR email delivery delay — 30 min queue backup",
         "COMMUNICATION","P3","SMTP relay misconfiguration after firewall update",5200),
        ("GCSS-Army inventory module unavailable",
         "APPLICATION","P2","Database failover did not complete successfully",1600),
        ("Splunk SIEM alert storm — 40K low-priority events",
         "SECURITY","P4","Overly broad regex in correlation rule CORR-4421",320),
    ]

    sla_threshold = {"P1": 60, "P2": 240, "P3": 480, "P4": 1440}

    rows = [["case_number","subject","description","priority","status",
             "category","opened_date","closed_date","assigned_team",
             "affected_devices","affected_users","root_cause",
             "sla_breached","mttr_minutes","is_recurring",
             "occurrence_count","source_system","data_source"]]

    for i, (subj, cat, pri, rc, affected) in enumerate(issues):
        opened = now - timedelta(hours=random.randint(1, int(days*24)))
        status = ("OPEN" if pri in ("P1","P2") and random.random() < 0.7
                  else "IN_PROGRESS" if random.random() < 0.5
                  else "RESOLVED")
        mttr   = None
        closed = None
        if status == "RESOLVED":
            mttr   = random.randint(60, 480)
            closed = opened + timedelta(minutes=mttr)

        rows.append([
            f"INC-2026-0{8800+i:04d}", subj,
            f"Issue reported: {subj}", pri, status, cat,
            opened.strftime("%Y-%m-%d %H:%M:%S"),
            closed.strftime("%Y-%m-%d %H:%M:%S") if closed else "",
            random.choice(TEAMS), 0, affected, rc,
            (mttr or 9999) > sla_threshold.get(pri, 9999),
            mttr or "",
            random.random() < 0.3,
            random.randint(1, 8) if random.random() < 0.3 else 1,
            "SALESFORCE", "SALESFORCE"
        ])

    fname = out / f"salesforce_cases_{now.strftime('%Y%m%d')}.csv"
    with open(fname, "w", newline="") as f:
        csv.writer(f).writerows(rows)
    print(f"  ✅ Salesforce: {len(rows)-1:,} records")


# ─────────────────────────────────────────────────────────────────────
# 6. SCIENCELOGIC — Infrastructure Alerts (JSONL)
# ─────────────────────────────────────────────────────────────────────
def generate_sciencelogic(days: int, now: datetime):
    out = BASE / "sciencelogic"
    out.mkdir(parents=True, exist_ok=True)

    alert_templates = [
        ("DISA-WAN-DC-01-RTR","198.18.10.1","ROUTER",
         "Interface Gi0/1 packet loss exceeded 3% threshold",
         "CRITICAL","network_interface","packet_loss_pct",3.84,1.0),
        ("DISA-WAN-PENTAGON-RTR","198.18.20.1","ROUTER",
         "CPU utilization exceeded 90% — hardware issue suspected",
         "CRITICAL","system_cpu","cpu_utilization_pct",94.2,85.0),
        ("DISA-WAN-MEADE-RTR","198.18.30.1","ROUTER",
         "Interface bandwidth at 94% — link saturation",
         "HIGH","network_interface","bandwidth_util_pct",94.1,80.0),
        ("DISA-LAN-ARLINGTON-SW1","10.20.1.1","SWITCH",
         "Duplex mismatch on uplink Gi1/0/48",
         "HIGH","network_interface","error_count",8412,100),
        ("DISA-DC-APP-SRV-01","10.100.1.10","SERVER",
         "Teams media gateway: RTP drop rate at 8.2%",
         "CRITICAL","application","rtp_drop_rate_pct",8.2,2.0),
        ("DISA-DC-SQL-01","10.100.2.10","DATABASE",
         "ServiceNow DB connection pool at 98% capacity",
         "HIGH","database","connection_pool_pct",98.0,80.0),
        ("DISA-DC-MAIL-01","10.100.3.10","SERVER",
         "Exchange SMTP queue: 8421 messages — delivery delay",
         "HIGH","application","smtp_queue_depth",8421,1000),
        ("DISA-DC-DNS-PRIM","10.200.1.10","DNS_SERVER",
         "DNS response time elevated: 380ms (threshold: 50ms)",
         "HIGH","dns","avg_response_ms",380,50),
        ("DISA-DC-VPN-01","10.100.4.10","VPN_GATEWAY",
         "IKEv2 SA renegotiation failures: 284 in last hour",
         "MEDIUM","vpn","sa_failure_count",284,50),
        ("DISA-FW-PERIMETER-01","198.18.1.1","FIREWALL",
         "Blocked connection from suspicious IP 45.33.32.156",
         "MEDIUM","security","blocked_connections",1284,100),
        ("DISA-IDS-SENSOR-01","10.100.0.5","IDS",
         "Signature match: C2 beacon traffic detected",
         "HIGH","security","ids_alert_count",3,1),
        ("DISA-DC-NAS-01","10.100.7.10","STORAGE",
         "NAS /data/apps at 94% capacity — growth 2GB/day",
         "MEDIUM","storage","disk_utilization_pct",94.0,85.0),
        ("DISA-DC-SAP-01","10.100.5.10","APPLICATION",
         "SAP work process utilization at 97%",
         "HIGH","application","work_process_pct",97.0,80.0),
    ]

    records = []
    for _ in range(int(days * 1500)):
        dt   = now - timedelta(seconds=random.randint(0, int(days*86400)))
        tmpl = random.choice(alert_templates)
        (dname, dip, dtype, msg, sev, comp,
         metric, mval, thresh) = tmpl

        actual = round(mval * random.uniform(0.85, 1.15), 2)
        if actual < thresh and random.random() > 0.3:
            continue  # skip most non-alert noise

        records.append({
            "alert_id":        f"SLEM-{random.randint(100000,999999)}",
            "timestamp":       fmt(dt),
            "device_name":     dname,
            "device_ip":       dip,
            "device_type":     dtype,
            "alert_message":   msg,
            "severity":        sev if actual >= thresh else "INFO",
            "component":       comp,
            "metric_name":     metric,
            "metric_value":    actual,
            "threshold_value": thresh,
            "acknowledged":    random.random() < 0.6,
            "location":        random.choice([s[2] for s in SEGMENTS]),
            "assigned_team":   random.choice(TEAMS),
            "ticket_id":       (f"INC-2026-{random.randint(8800,8900)}"
                               if random.random() < 0.4 else None),
            "data_source":     "SCIENCELOGIC",
        })

    records.sort(key=lambda r: r["timestamp"])
    fname = out / f"sciencelogic_alerts_{now.strftime('%Y%m%d')}.jsonl"
    with open(fname, "w") as f:
        for r in records:
            f.write(json.dumps(r) + "\n")
    print(f"  ✅ ScienceLogic: {len(records):,} records")


# ─────────────────────────────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Generate OE mock sys log files for all 6 data sources"
    )
    parser.add_argument("--days", type=int, default=1,
                        help="Days of history to generate (default: 1)")
    args = parser.parse_args()

    now = datetime.now()
    print(f"\n🔄 Generating {args.days} day(s) of mock logs...\n")

    generate_aternity(args.days, now)
    generate_netscout(args.days, now)
    generate_intune(args.days, now)
    generate_infoblox(args.days, now)
    generate_salesforce(args.days, now)
    generate_sciencelogic(args.days, now)

    total = sum(
        len(list((BASE/d).glob("*.*")))
        for d in ["aternity","netscout","intune",
                  "infoblox","salesforce","sciencelogic"]
    )
    print(f"\n✅ Done! {total} log files written to mock-logs/")
    print("   Run the ingestion pipeline next:")
    print("   python pipelines/run_pipeline.py")
