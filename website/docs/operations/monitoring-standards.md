---
title: Monitoring Standards
sidebar_position: 2
last_verified: 2026-05-28
---

Monitoring must show whether a node is alive, in consensus with the network, useful to clients, and safe to operate. Every production deployment should export Prometheus metrics and have Grafana dashboards for chain health, RPC health, and host resources.

## Golden signals

| Signal | What to measure | Why it matters |
| --- | --- | --- |
| Availability | Process up, health endpoint, RPC smoke success | A running process is not enough; the service must answer real requests. |
| Latency | RPC p50/p95/p99, consensus API response time, disk latency | Latency rises before outright failures on overloaded nodes. |
| Traffic | RPC request rate, WebSocket/subscription count, peer traffic | Baseline traffic distinguishes user demand from abuse or replay storms. |
| Errors | RPC error rate, HTTP 5xx, rejected subscriptions, client panic count | Error spikes reveal bad deploys, upstream bugs, and client misuse. |
| Saturation | CPU, memory, file descriptors, disk usage, disk I/O, network I/O | Saturation predicts missed slots, sync stalls, and slow RPC responses. |

## Chain node signals

| Metric | Alert direction | Notes |
| --- | --- | --- |
| Sync lag | Alert when local height/checkpoint/slot lags network reference beyond the chain SLO | Compare to at least one trusted external reference or a healthy peer in the fleet. |
| Peer count | Alert when below the minimum for the node role | Low peers can isolate a node even when the process is healthy. |
| RPC latency | Alert on p95 and p99, not just averages | Track by method where labels are available. |
| RPC error rate | Alert on 5xx and chain-specific execution errors separately | Separate user validation errors from node failures. |
| Disk growth | Alert before volume exhaustion | Archive and indexer nodes need separate capacity curves. |
| Reorg/fork indicators | Alert when exposed by the client | Treat repeated reorgs or equivocation indicators as incident inputs. |

:::tip Dashboard design
Build dashboards from the operator question outward: "Is the fleet healthy?", "Is this node synced?", "Are users seeing RPC failures?", and "Which resource is saturated?" Avoid dashboards that only list raw exporter metrics.
:::

## Prometheus and Grafana baseline

Every node should provide:

- A private metrics endpoint reachable only by Prometheus.
- Labels for chain, network, node role, runtime, region, and instance.
- Recording rules for sync lag, RPC latency buckets, RPC error ratio, and peer count.
- Grafana panels for node state, RPC health, host resources, and recent deploy markers.

```yaml
groups:
  - name: node-rpc
    rules:
      - record: fp:rpc_error_ratio:5m
        expr: sum(rate(rpc_requests_total{status=~"5.."}[5m])) by (chain, instance) / sum(rate(rpc_requests_total[5m])) by (chain, instance)
      - alert: RpcErrorRateHigh
        expr: fp:rpc_error_ratio:5m > 0.05
        for: 10m
        labels:
          severity: page
        annotations:
          summary: RPC error rate is above 5% for {{ $labels.chain }} {{ $labels.instance }}
```

## Alert quality rules

| Rule | Requirement |
| --- | --- |
| Page only on user or chain risk | A page must require immediate human action. Everything else is ticket or dashboard. |
| Include the runbook link | Alerts should link to `/operations/common-runbooks` or a chain-specific operations page. |
| Use sustained windows | Avoid paging on one scrape failure unless it represents endpoint outage. |
| Test silence and routing | Maintenance windows must silence expected alerts without hiding unrelated failures. |

## Minimum smoke tests

Monitoring should include active probes in addition to passive metrics:

```bash
# JSON-RPC style probe example.
curl -fsS "$RPC_URL" \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"web3_clientVersion","params":[]}' >/dev/null
```

Use chain-specific smoke methods from the developer interface pages, then feed the result into Prometheus blackbox exporter or an equivalent synthetic monitor.
