#!/usr/bin/env python3
"""
generate_mock_logs.py  (v2 — Real Schema Edition)
Generates realistic raw logs matching the ACTUAL source schemas:
  1. NETCOOL      — network event/alert JSON
  2. DXNETOPS     — device CPU/performance metrics JSON
  3. ElastiFlow   — IPFIX network flow records JSON
  4. Netscout App — application performance JSON
  5. Netscout Throughput — bandwidth throughput JSON
  6. DataNX       — network inventory JSON (system, port, inventory)

Gold tables produced (unchanged — Spring Boot API depends on these names):
  gold/app_health_summary
  gold/network_performance_summary
  gold/packet_loss_root_cause
  gold/device_health_summary
  gold/dns_metrics
  gold/top_issues_summary
  gold/version_sprawl_summary
  gold/data_source_ingestion_status

Usage:
    python scripts/generate_mock_logs.py
    python scripts/generate_mock_logs.py --days 3
"""

import json, csv, random, argparse
from datetime import datetime, timedelta
from pathlib import Path

BASE = Path(__file__).parent.parent / "mock-logs"
NOW  = datetime.utcnow()
TODAY = NOW.strftime("%Y%m%d")


def fmt(dt: datetime) -> str:
    return dt.strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"

def rand_dt(days: int) -> datetime:
    return NOW - timedelta(seconds=random.randint(0, int(days * 86400)))

def rand_ip(private=True):
    if private:
        return f"10.{random.randint(1,254)}.{random.randint(1,254)}.{random.randint(1,254)}"
    return f"{random.randint(33,99)}.{random.randint(0,255)}.{random.randint(0,255)}.{random.randint(1,254)}"

def rand_mac():
    return ":".join(f"{random.randint(0,255):02x}" for _ in range(6))


# ── Static reference data ────────────────────────────────────────────

THEATERS = [
    ("CENTRAL", "TNC-CENT", "CAAS", "AL ASAD AIR BASE",   33.78, 42.44),
    ("PACIFIC", "TNC-PAC",  "PFTB", "FORT BUCKNER",       26.33, 127.80),
    ("EUROPE",  "TNC-EUR",  "RAMN", "RAMSTEIN AB",         49.43, 7.60),
    ("CONUS",   "TNC-CONT", "BLTM", "FORT MEADE",         39.10, -76.77),
    ("PACIFIC", "TNC-PAC",  "YOKT", "YOKOTA AB",          35.74, 139.34),
    ("CENTRAL", "TNC-CENT", "KBGM", "BAGRAM",             34.94, 69.26),
]

NODES = [
    "ufscaas02a", "ufscaas03b", "uwrhpmdxn-col01", "utfpftb450",
    "ujepcpz040", "ujewfew040", "ujepyks030", "ujbwpjz020",
    "ujepfst030", "ujewcol030", "ujewpax030", "ujecald030",
    "ujewdru040", "unpwpnt011", "unpwnis005", "unpwnis006",
    "ummwsco930", "uvrwsna030", "umswmac120", "urdwpnt020",
]

DEVICE_TYPES = ["umm", "urc", "utf", "uje", "unp"]

APPLICATIONS = [
    ("Microsoft Teams",        "COLLABORATION",  "RAVPN",   0.12),
    ("Outlook Web App",        "EMAIL",          "NIPR",    0.09),
    ("ServiceNow",             "ITSM",           "NIPR",    0.06),
    ("SharePoint Online",      "COLLABORATION",  "NIPR",    0.05),
    ("Salesforce CRM",         "CRM",            "NIPR",    0.04),
    ("SAP ERP",                "ERP",            "NIPR",    0.08),
    ("NIPR Email",             "EMAIL",          "NIPR",    0.05),
    ("myPay (DFAS)",           "FINANCE",        "NIPR",    0.03),
    ("Defense Travel System",  "FINANCE",        "NIPR",    0.03),
    ("GCSS-Army",              "ERP",            "SIPR",    0.06),
    ("DEERS Online",           "HR",             "NIPR",    0.04),
    ("Audio",                  "UC",             "RAVPN",   0.10),
    ("DTLS",                   "SECURITY",       "RAVPN",   0.07),
    ("Apple",                  "INTERNET",       "INTERNET",0.05),
    ("Google",                 "INTERNET",       "INTERNET",0.04),
]

INTERFACES = [
    "NIS-IAP_to_DJI (ISP)_40G-1",
    "NIS-IAP_to_DJI (ISP)_40G-2",
    "NIS-IAP_to_DJI (NIPR)_40G-1",
    "NIS-IAP_to_DJI (NIPR)_40G-2",
    "PNT-IAP_to_DJI (ISP)_40G-1",
    "IAP_Uplink_10G-1",
    "WAN_Circuit_1G",
    "MPLS_Core_100G",
]

SENSORS = [
    "UNPWPNT011:::B860-B960::UIAWPNT010::AE1-210::UIGWPNT010::AE1::",
    "UNPWNIS005:::BFN4-BHN4::UIAWNIS010::AE1-210::UIGWNIS010::AE1::",
    "UNPWNIS006:::BFN4-BHN4::UIAWNIS010::AE1-200::UIGWNIS010::AE1::",
    "UNPWNIS007:::BFN4-BHN4::UIAWNIS010::AE1-300::UIGWNIS010::AE1::",
    "UNPWPNT012:::C860-C960::UIAWPNT012::AE1-210::UIGWPNT012::AE1::",
]

ALERT_GROUPS = [
    ("ITNM Monitor",     "NmosPingFail",      5, "Device DOWN or UNREACHABLE. This device is no longer responding to PING requests."),
    ("ITNM Monitor",     "NmosLinkDown",      4, "Interface link down — carrier loss detected on monitored port."),
    ("ITNM Monitor",     "NmosCPUHigh",       3, "CPU utilization exceeded 85% threshold on network device."),
    ("ITNM Monitor",     "NmosMemoryHigh",    3, "Memory utilization exceeded 90% threshold on network device."),
    ("ITNM Monitor",     "NmosBGPDown",       5, "BGP peer session down — routing table may be incomplete."),
    ("ITNM Monitor",     "NmosLinkFlap",      4, "Interface flapping detected — link went up/down 5 times in 10 minutes."),
    ("THRESHOLD",        "BandwidthHigh",     3, "Interface bandwidth utilization exceeded 80% — potential congestion."),
    ("THRESHOLD",        "PacketLossHigh",    4, "Packet loss rate exceeded 2% threshold on WAN link."),
    ("THRESHOLD",        "LatencyHigh",       3, "Round-trip latency exceeded 150ms on monitored path."),
    ("SECURITY",         "UnauthorizedAccess",4, "Unauthorized access attempt detected — multiple failed auth events."),
    ("SECURITY",         "AnomalousDNS",      3, "Suspicious DNS query pattern detected — possible C2 beacon."),
]

HARDWARE_PARTS = [
    ("800-25216-06", "CE-100T-8",  "WMUCA4PFAB"),
    ("800-17168-02", "WS-X6748-GE-TX", "CNMYA5PFAA"),
    ("800-28030-01", "ASR1001-X",  "FPMMA6PEAB"),
    ("800-33886-01", "N9K-C9396PX","CMUEA5PFAB"),
    ("800-40482-01", "ISR4451-X",  "BPMYA6PFAA"),
    ("800-12024-01", "C3750G-48PS","CNUYA5PEAB"),
]

CCSD_LABELS = ["6NV9","6SJ8","6TK9","7AB1","7CD2","8EF3","8GH4","9IJ5"]

VLANS = [100, 200, 210, 300, 400, 500, 600, 700]

CODECS = ["Opus", "G.711", "G.729", "G.722", "SILK"]

METRIC_FAMILIES = [
    ("NormalizedCPUInfo",    "CPU",         "cpuUsageMonitoringInterval", "Utilization", "CPUUtilizationLastMin"),
    ("NormalizedMemoryInfo", "Memory",      "memUsageMonitoringInterval", "Utilization", "MemoryUtilizationLastMin"),
    ("NormalizedInterfaceInfo","Interface", "ifSpeed",                    "Utilization", "InterfaceUtilizationLastMin"),
]

NETSCOUT_APPS = [
    ("Microsoft Teams", "COLLABORATION", "NIPR"),
    ("Audio",           "MULTIMEDIA",    "RAVPN"),
    ("DTLS",            "RAVPN",         "RAVPN"),
    ("Apple",           "Internet",      "Internet"),
    ("Microsoft",       "Internet",      "Internet"),
    ("Google",          "Internet",      "Internet"),
    ("Zoom",            "MULTIMEDIA",    "NIPR"),
    ("SharePoint",      "COLLABORATION", "NIPR"),
    ("SAP",             "ERP",           "NIPR"),
    ("Salesforce",      "CRM",           "NIPR"),
]

NETSCOUT_SITES = [
    "EBI-Intercept-164", "EBI_SIP-DIP-017", "TNC-Core-01",
    "TNC-Edge-02",       "DISA-Cloud-East", "DISA-Cloud-West",
    "Pentagon-Core",     "FtMeade-Core",
]

FLOW_HOSTS = [
    ("UJBWPJZ020", "33.20.2.154"),
    ("UJEWDRU040", "33.20.2.85"),
    ("UJEPCPZ040", "33.20.130.149"),
    ("UJEWFEW040", "33.20.2.253"),
    ("UJEWCOL030", "33.20.0.12"),
    ("UJEWPAX030", "33.20.0.194"),
    ("UJEPFST030", "33.20.128.181"),
    ("UJEPYOK040", "33.20.130.136"),
    ("UJECALD030", "33.20.224.241"),
    ("UJEPYKS030", "33.20.128.152"),
]


# ════════════════════════════════════════════════════════════════════
# 1. NETCOOL — Network Event / Alert JSON
#    → gold.top_issues_summary
# ════════════════════════════════════════════════════════════════════
def generate_netcool(days: int):
    out = BASE / "netcool"
    out.mkdir(parents=True, exist_ok=True)

    records = []
    for i in range(int(days * 800)):
        dt      = rand_dt(days)
        theater = random.choice(THEATERS)
        node    = random.choice(NODES)
        alert   = random.choice(ALERT_GROUPS)
        ag, eid, sev, summary = alert
        th_name, oc, qc, loc, lat, lon = theater

        first_occ = dt - timedelta(minutes=random.randint(0, 1440))
        tally     = random.randint(1, 60000)
        serial    = random.randint(1_000_000_000, 2_999_999_999)
        node_ip   = rand_ip()
        remote_ip = rand_ip(private=False)

        rec = {
            "@timestamp":            fmt(dt),
            "@version":              "1",
            "Acknowledged":          random.randint(0, 1),
            "Agent":                 "ncp_poller",
            "AlertGroup":            ag,
            "AlertKey":              f"{node}.eur.dcn.disn.mil->{eid}{oc}",
            "CEAEventScore":         0,
            "Class":                 8000,
            "EquipId":               "FS",
            "EventId":               eid,
            "ExpireTime":            43200,
            "FirstOccurrence":       int(first_occ.timestamp() * 1000),
            "Flash":                 0,
            "GMS_OperationsArea":    "IP",
            "GMS_OperationsCenter":  oc,
            "GMS_QCode":             qc,
            "GMS_SecurityCommunity": f"{oc}_{qc}",
            "GMS_Theater":           th_name,
            "Identifier":            f"{node}.eur.dcn.disn.mil->{eid}1{oc}",
            "LastOccurrence":        int(dt.timestamp() * 1000),
            "LocalNodeAlias":        f"{node}.eur.dcn.disn.mil",
            "Location":              loc,
            "Manager":               "ITNM",
            "MasterSerial":          serial,
            "NetcoolEventAction":    random.choice(["insert", "update"]),
            "NmosCauseType":         random.randint(0, 3),
            "NmosDomainName":        f"{oc}01",
            "Node":                  node,
            "NodeAlias":             node_ip,
            "RemoteNodeAlias":       remote_ip,
            "Severity":              sev,
            "StateChange":           int(dt.timestamp() * 1000),
            "Summary":               summary,
            "Tally":                 tally,
            "Type":                  1,
            "SuppressEscl":          0,
            "SelectedForServiceNow": random.randint(0, 1),
            "Service":               "DCN",
            "host": {
                "geo":      {"lat": lat + random.uniform(-0.1, 0.1),
                             "lon": lon + random.uniform(-0.1, 0.1)},
                "hostname": node.upper(),
                "ip":       node_ip,
                "location": {"quad_code": qc, "site": {"name": loc, "theater": th_name}},
            },
            "event": {
                "severity":   sev,
                "alarm": {
                    "summary": summary,
                    "serial":  serial,
                    "alert":   {"group": ag, "key": f"{node}->{eid}"},
                },
                "timestamp": {
                    "last_occurence": fmt(dt),
                    "state_change":   fmt(dt),
                },
                "timestamp_created": fmt(first_occ),
            },
            "netcool": {
                "alarm": {"tally": tally},
                "event": {"id": eid},
                "manager": "ITNM",
            },
        }
        records.append(rec)

    records.sort(key=lambda r: r["@timestamp"])
    path = out / f"netcool_events_{TODAY}.jsonl"
    with open(path, "w") as f:
        for r in records:
            f.write(json.dumps(r) + "\n")
    print(f"  ✅ NETCOOL: {len(records):,} records → {path}")


# ════════════════════════════════════════════════════════════════════
# 2. DXNETOPS — Device CPU / Performance Metrics JSON
#    → gold.device_health_summary (metrics enrichment)
# ════════════════════════════════════════════════════════════════════
def generate_dxnetops(days: int):
    out = BASE / "dxnetops"
    out.mkdir(parents=True, exist_ok=True)

    records = []
    poll_group_ids = [6068, 6069, 6070, 7001, 7002]

    for _ in range(int(days * 2000)):
        dt       = rand_dt(days)
        cycle_dt = dt.replace(second=0, microsecond=0)
        # round to 5-min boundary
        cycle_dt = cycle_dt - timedelta(minutes=cycle_dt.minute % 5)
        theater  = random.choice(THEATERS)
        th_name, oc, qc, loc, lat, lon = theater
        node     = random.choice(NODES)
        mf_tpl   = random.choice(METRIC_FAMILIES)
        mf_name, mf_display, metric1, metric2, metric3 = mf_tpl
        util     = random.randint(2, 98)

        records.append({
            "pollGroupID":              random.choice(poll_group_ids),
            "readTimestamp":            fmt(dt),
            "readTimestampMS":          int(dt.timestamp() * 1000),
            "cycleTimestamp":           cycle_dt.strftime("%Y-%m-%dT%H:%M:%S.000Z"),
            "cycleTimestampMS":         int(cycle_dt.timestamp() * 1000),
            "km":                       "true",
            "metricFamilyDisplayName":  mf_display,
            "metricFamily":             mf_name,
            "dcmID":                    f"{node}-col{random.randint(1,4):02d}",
            "skip":                     False,
            "pollRateMS":               300000,
            "itemID":                   random.randint(1_000_000, 9_999_999),
            "deviceItemID":             random.randint(1_000_000, 9_999_999),
            "equipt_type":              random.choice(DEVICE_TYPES).upper(),
            "tenantID":                 1,
            "componentName":            f"{mf_display} {random.randint(0,31)}",
            "ifDescr":                  f"interface Revised Cisco {mf_display} {random.randint(0,31)}",
            "topic_name":               "disa-pm-ls-dxnetops-metric-export",
            "@timestamp":               fmt(dt),
            "@version":                 "1",
            "host": {
                "hostname":    node.upper(),
                "ip":          rand_ip(),
                "quadcode":    qc,
                "tricode":     qc[1:4] if len(qc) >= 4 else qc,
                "geo_location": {"lon": lon + random.uniform(-0.05, 0.05),
                                 "lat": lat + random.uniform(-0.05, 0.05)},
                "location": {
                    "country":       th_name,
                    "theater":       th_name[0],
                    "quad_code":     qc,
                    "site_name":     loc,
                    "site_short_name": loc.replace(" ", ""),
                    "device_name":   f"U{th_name[0]}E{qc[1:]}010",
                },
            },
            "metrics": {
                metric1:  0,
                metric2:  util,
                metric3:  util,
                f"{metric2}Average5Seconds": max(0, util - random.randint(0, 5)),
            },
        })

    records.sort(key=lambda r: r["@timestamp"])
    path = out / f"dxnetops_metrics_{TODAY}.jsonl"
    with open(path, "w") as f:
        for r in records:
            f.write(json.dumps(r) + "\n")
    print(f"  ✅ DXNETOPS: {len(records):,} records → {path}")


# ════════════════════════════════════════════════════════════════════
# 3. ELASTIFLOW — IPFIX Network Flow Records JSON
#    → gold.network_performance_summary + packet_loss_root_cause
# ════════════════════════════════════════════════════════════════════
def generate_elastiflow(days: int):
    out = BASE / "elastiflow"
    out.mkdir(parents=True, exist_ok=True)

    templates = [256, 257, 258, 259, 260, 261, 262, 263, 266, 268, 313, 338]
    transports = ["tcp", "udp", "icmp", "hopopt", "sctp"]
    directions = ["ingress", "egress", "unknown (255)"]
    reasons    = ["Idle Timeout", "Active Timeout", "End of Flow"]
    locales    = ["public", "private"]

    records = []
    for _ in range(int(days * 3000)):
        dt        = rand_dt(days)
        host_name, host_ip = random.choice(FLOW_HOSTS)
        template  = random.choice(templates)
        transport = random.choice(transports)
        pkts      = random.randint(1, 5000) * 1000 if random.random() < 0.3 else random.randint(1, 100)
        nbytes    = pkts * random.randint(60, 1500)
        is_public = random.random() > 0.4
        locality  = "public" if is_public else "private"
        as_label  = "PUBLIC" if is_public else "PRIVATE"
        src_ip    = rand_ip(private=not is_public)
        dst_ip    = rand_ip(private=not is_public)
        src_port  = random.randint(1024, 65535)
        dst_port  = random.choice([80, 443, 53, 22, 8080, 10003, 500, 4500])
        ingested  = int(dt.timestamp() * 1000)
        created   = int(dt.timestamp() * 1000)
        start_dt  = dt - timedelta(seconds=random.randint(1, 300))
        end_ms    = int(dt.timestamp() * 1000)

        rec = {
            "event.category":           "network",
            "host.ip":                  host_ip,
            "host.name":                host_name,
            "agent.type":               "elastiflow-unified-collector",
            "agent.version":            "7.16.0",
            "event.module":             "flow",
            "event.kind":               "event",
            "event.type":               "connection",
            "event.outcome":            "unknown",
            "event.dataset":            "ipfix",
            "flow.export.version.name": "IPFIX",
            "flow.export.version.ver":  10,
            "flow.template.id":         template,
            "record.type":              "flow",
            "ecs.version":              "8.0.0",
            "event.ingested":           ingested,
            "event.created":            created,
            "event.start":              fmt(start_dt),
            "event.end":                end_ms,
            "event.reason":             random.choice(reasons),
            "network.bytes":            nbytes,
            "network.packets":          pkts,
            "source.bytes":             nbytes,
            "source.packets":           pkts,
            "network.transport":        transport,
            "network.type":             random.choice(["ipv4", "ipv6"]),
            "network.direction":        random.choice(directions),
            "source.ip":                src_ip,
            "destination.ip":           dst_ip,
            "source.port":              src_port,
            "destination.port":         dst_port,
            "flow.locality":            locality,
            "flow.src.as.label":        as_label,
            "flow.dst.as.label":        as_label,
            "as.label":                 [as_label],
            "flow.export.l4.port.id":   random.randint(14000, 62000),
            "flow.meter.observ.domain.id": random.randint(2000, 999999),
            "flow.meter.packet_select.interval.packets": random.choice([1, 1000]),
            "observer.ingress.interface.id": random.randint(500, 1999),
            "observer.egress.interface.id":  random.randint(500, 1999),
            "observer.ingress.interface.name": f"index: {random.randint(500,1999)}",
            "observer.egress.interface.name":  f"index: {random.randint(500,1999)}",
            "source.as.number":         0,
            "destination.as.number":    0,
            "ip.version.ver":           4,
            "ip.frag.id":               0,
        }

        # Add TCP flags for TCP flows
        if transport == "tcp":
            rec["tcp.flags.bits"] = random.choice([2, 16, 18, 24])
            rec["tcp.flags.tags"] = random.choice([["SYN"], ["ACK"], ["SYN", "ACK"], ["PSH", "ACK"]])
            rec["l4.session.established"] = "true" if rec["tcp.flags.bits"] in [16, 18, 24] else "false"

        records.append(rec)

    path = out / f"elastiflow_flows_{TODAY}.jsonl"
    with open(path, "w") as f:
        for r in records:
            f.write(json.dumps(r) + "\n")
    print(f"  ✅ ElastiFlow: {len(records):,} records → {path}")


# ════════════════════════════════════════════════════════════════════
# 4. NETSCOUT APP — Application Performance JSON
#    → gold.app_health_summary
# ════════════════════════════════════════════════════════════════════
def generate_netscout_app(days: int):
    out = BASE / "netscout_app"
    out.mkdir(parents=True, exist_ok=True)

    records = []
    for _ in range(int(days * 1500)):
        dt      = rand_dt(days)
        # Round to 5-min boundary
        ts_dt   = dt.replace(second=0, microsecond=0)
        ts_dt   = ts_dt - timedelta(minutes=ts_dt.minute % 5)
        app_tpl = random.choice(NETSCOUT_APPS)
        app_name, app_group, app_proto = app_tpl
        sensor  = random.choice(SENSORS)
        alias   = sensor.split(":::")[0][:5]
        iface   = random.choice(INTERFACES)
        vlan    = random.choice(VLANS)
        client_ip = rand_ip()
        server_ip = rand_ip(private=False)
        server_port = random.choice([80, 443, 8443, 8080])

        # Degrade certain apps during peak hours
        is_peak = 8 <= dt.hour <= 18
        is_degraded = app_name in ("Microsoft Teams", "Zoom", "Audio") and is_peak
        timeouts = random.randint(5, 80) if is_degraded else random.randint(0, 3)
        rt_ms    = random.randint(800, 3000) if is_degraded else random.randint(10, 400)
        failed   = random.randint(2, 20) if is_degraded else random.randint(0, 2)

        records.append({
            "timestamp":            ts_dt.strftime("%Y-%m-%d %H:%M:%S.000000 UTC"),
            "client_host_ip_address": client_ip,
            "server_host_ip_address": server_ip,
            "server_port":           server_port,
            "client_site":           random.choice(NETSCOUT_SITES),
            "client_community":      random.choice(["NIPR", "SIPR", "RAVPN"]),
            "server_site":           random.choice(NETSCOUT_SITES),
            "server_community":      random.choice(["NIPR", "SIPR"]),
            "vlan_id":               vlan,
            "vlan_alias":            "",
            "application_name":      app_name,
            "application_group":     app_group,
            "ai_sensor_name":        sensor,
            "device_alias":          alias,
            "device_interface_alias": iface,
            "transaction_status":    random.choice(["success", "failure", None]),
            "message_name":          "Data",
            "response_code":         random.choice([200, 404, 503, None]),
            "retries":               random.randint(0, 5),
            "peak_response_time":    rt_ms * 2,
            "total_response_time":   rt_ms * random.randint(10, 200),
            "successful_transactions": random.randint(50, 5000),
            "failed_transactions":   failed,
            "failed_connections":    random.randint(0, failed),
            "timeouts":              timeouts,
            "agedout_sessions":      random.randint(0, 10),
            "active_sessions":       random.randint(5, 500),
            "new_sessions":          random.randint(1, 100),
            "max_active_sessions":   random.randint(100, 2000),
            "response_time_bucket_1": max(0, rt_ms - 100),
            "response_time_bucket_3": rt_ms,
            "response_time_bucket_5": rt_ms + 200,
            "to_server_packets":     random.randint(10, 5000),
            "from_server_packets":   random.randint(10, 5000),
            "to_server_octets":      random.randint(1000, 5_000_000),
            "from_server_octets":    random.randint(1000, 5_000_000),
            "syn_count":             random.randint(1, 100),
            "syn_ack_count":         random.randint(1, 100),
            "server_client_retries_count": random.randint(0, 50),
            "client_server_retries_count": random.randint(0, 50),
        })

    records.sort(key=lambda r: r["timestamp"])
    path = out / f"netscout_app_{TODAY}.jsonl"
    with open(path, "w") as f:
        for r in records:
            f.write(json.dumps(r) + "\n")
    print(f"  ✅ Netscout App: {len(records):,} records → {path}")


# ════════════════════════════════════════════════════════════════════
# 5. NETSCOUT THROUGHPUT — Bandwidth Throughput JSON
#    → gold.network_performance_summary
# ════════════════════════════════════════════════════════════════════
def generate_netscout_throughput(days: int):
    out = BASE / "netscout_throughput"
    out.mkdir(parents=True, exist_ok=True)

    records = []
    for _ in range(int(days * 1200)):
        dt     = rand_dt(days)
        ts_dt  = dt.replace(second=0, microsecond=0)
        ts_dt  = ts_dt - timedelta(minutes=ts_dt.minute % 5)
        sensor = random.choice(SENSORS)
        alias  = sensor.split(":::")[0][:5]
        iface  = random.choice(INTERFACES)
        vlan   = random.choice(VLANS)
        app_tpl = random.choice(NETSCOUT_APPS)
        app_name, app_group, _ = app_tpl

        # Simulate congested interfaces
        is_congested = "ISP_40G-1" in iface and 8 <= dt.hour <= 18
        pkts_out = random.randint(500, 5000) if is_congested else random.randint(10, 500)
        oct_out  = pkts_out * random.randint(200, 1500)
        peak_out = int(oct_out * random.uniform(1.2, 2.5))

        records.append({
            "timestamp":              ts_dt.strftime("%Y-%m-%d %H:%M:%S.000000 UTC"),
            "device":                 sensor,
            "device_alias":           alias,
            "device_interface_alias": iface,
            "application":            app_name,
            "application_group":      app_group,
            "vlan_id":                vlan,
            "vlan_alias":             "",
            "client_site":            random.choice(NETSCOUT_SITES),
            "server_site":            random.choice(NETSCOUT_SITES),
            "octets_in":              random.randint(0, oct_out // 2),
            "octets_out":             oct_out,
            "packets_in":             random.randint(0, pkts_out // 2),
            "packets_out":            pkts_out,
            "peak_bytes_in":          random.randint(0, peak_out // 4),
            "peak_bytes_out":         peak_out,
            "peak_packets_in":        0,
            "peak_packets_out":       0,
            "peak_time_in_measure":   0,
            "peak_time_out_measure":  random.randint(100, 900),
        })

    records.sort(key=lambda r: r["timestamp"])
    path = out / f"netscout_throughput_{TODAY}.jsonl"
    with open(path, "w") as f:
        for r in records:
            f.write(json.dumps(r) + "\n")
    print(f"  ✅ Netscout Throughput: {len(records):,} records → {path}")


# ════════════════════════════════════════════════════════════════════
# 6. DATANX — Network Inventory JSON (system + port + inventory)
#    → gold.device_health_summary + version_sprawl_summary
# ════════════════════════════════════════════════════════════════════
def generate_datanx(days: int):
    out = BASE / "datanx"
    out.mkdir(parents=True, exist_ok=True)

    # System records
    systems = []
    for i, node in enumerate(NODES):
        dt   = rand_dt(days)
        part = random.choice(HARDWARE_PARTS)
        pnum, model, clei = part
        systems.append({
            "DEVICE_NAME":  node.upper(),
            "ELEMENT":      "System-1",
            "IP-ADDRESS":   rand_ip(),
            "VERSION":      random.choice(["3.42A","3.51B","4.01C","12.4(24)T","15.6(3)M","17.9.4a"]),
            "NODE-TYPE":    random.choice(DEVICE_TYPES),
            "ADMIN-STATUS": random.choice(["UP", "UP", "UP", "DOWN"]),
            "LAST-UPDATE":  dt.strftime("%Y%m%d"),
            "il5-uuid":     f"{random.randint(10000000,99999999):08x}-"
                            f"{random.randint(1000,9999):04x}-"
                            f"{random.randint(1000,9999):04x}-"
                            f"{random.randint(1000,9999):04x}-"
                            f"{random.randint(100000000000,999999999999):012x}",
            "il5-timestamp": int(dt.timestamp() * 1000),
            "data_source":  "DATANX_SYSTEM",
        })

    # Port records
    ports = []
    for node in NODES:
        num_ports = random.randint(2, 8)
        for p in range(num_ports):
            dt   = rand_dt(days)
            vlan = random.choice(VLANS)
            bw   = random.choice(["1000000.00","10000000.00","40000000.00","100000000.00"])
            ports.append({
                "DEVICE_NAME":    node.upper(),
                "ELEMENT":        f"interface GigabitEthernet{p//4}/{p%4}/{random.randint(0,47)}",
                "BANDWIDTH":      bw,
                "IP-ADDRESS":     rand_ip(),
                "PARENT":         "System-1",
                "ADMIN-STATUS":   random.choice(["UP","UP","UP","DOWN"]),
                "OP-STATUS":      random.choice(["O","O","O","M"]),
                "VRF":            random.choice(["default","MGMT","N/A"]),
                "VLAN":           str(vlan),
                "SERVICE-TYPE":   random.choice(["NET","MGT","SVC","N/A"]),
                "LAST-UPDATE":    dt.strftime("%Y%m%d"),
                "DIRECTION":      random.choice(["IN","OUT","BOTH","N/A"]),
                "il5-uuid":       f"{random.randint(10000000,99999999):08x}-"
                                  f"{random.randint(1000,9999):04x}-"
                                  f"{random.randint(1000,9999):04x}-"
                                  f"{random.randint(1000,9999):04x}-"
                                  f"{random.randint(100000000000,999999999999):012x}",
                "il5-timestamp":  int(dt.timestamp() * 1000),
                "data_source":    "DATANX_PORT",
            })

    # Inventory (hardware slots/modules)
    inventory = []
    for node in NODES:
        num_slots = random.randint(2, 16)
        for slot in range(num_slots):
            dt   = rand_dt(days)
            part = random.choice(HARDWARE_PARTS)
            pnum, model, clei = part
            inventory.append({
                "DEVICE_NAME":    node.upper(),
                "ELEMENT":        f"SLOT-{slot}",
                "PARTNUM":        pnum,
                "ADMIN-STATUS":   random.choice(["UP","UP","UP","DOWN"]),
                "CLEI":           clei,
                "PARTID":         f"{random.randint(0,99):02d}",
                "SERIALNUM":      f"CAT{random.randint(1000,9999):04d}{''.join(random.choices('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',k=4))}",
                "VERSION":        f"V{random.randint(0,9):02d}",
                "FWREV":          str(random.randint(100,200)),
                "HWREV":          random.choice(["A0","B0","C0","D0"]),
                "DESCRIPTION":    model,
                "MODEL":          f"N/A",
                "PROTECT-STATUS": random.choice(["ACT","STBY","N/A"]),
                "PARENT":         "System-1",
                "LAST-UPDATE":    dt.strftime("%Y%m%d"),
                "il5-uuid":       f"{random.randint(10000000,99999999):08x}-"
                                  f"{random.randint(1000,9999):04x}-"
                                  f"{random.randint(1000,9999):04x}-"
                                  f"{random.randint(1000,9999):04x}-"
                                  f"{random.randint(100000000000,999999999999):012x}",
                "il5-timestamp":  int(dt.timestamp() * 1000),
                "data_source":    "DATANX_INVENTORY",
            })

    all_records = systems + ports + inventory
    random.shuffle(all_records)

    path = out / f"datanx_inventory_{TODAY}.jsonl"
    with open(path, "w") as f:
        for r in all_records:
            f.write(json.dumps(r) + "\n")
    print(f"  ✅ DataNX: {len(systems)} systems + {len(ports)} ports + {len(inventory)} inventory → {path}")


# ═══════════════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════════════
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate OE mock logs (real schemas)")
    parser.add_argument("--days", type=int, default=1,
                        help="Days of history to generate (default: 1)")
    args = parser.parse_args()

    print(f"\n🔄  Generating {args.days} day(s) of mock logs (real schemas)...\n")
    generate_netcool(args.days)
    generate_dxnetops(args.days)
    generate_elastiflow(args.days)
    generate_netscout_app(args.days)
    generate_netscout_throughput(args.days)
    generate_datanx(args.days)

    print(f"\n✅  Done — files written to mock-logs/")
    print("   Run the ingestion pipeline next:")
    print("   python pipelines/run_pipeline.py")