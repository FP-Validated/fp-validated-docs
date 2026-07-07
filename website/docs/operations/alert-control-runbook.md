---
title: Alert Control Runbook
sidebar_position: 7
last_verified: 2026-07-07
---

Alert control is GitOps-owned. Operators should change alert eligibility in the
node values file, commit it, and let the monitoring applications sync. Do not
use Alertmanager silences as the source of truth for planned maintenance unless
the GitOps path is unavailable.

## Control model

Each monitored node has three independent alert switches:

```yaml
node:
  name: aks-node-01
  alerts:
    nodeDown: 'on'
    nodeExporter: 'on'
chainExporter:
  targets:
  - chain: arbitrum
    network: mainnet
    component: rpc
    alert: 'on'
```

| Field | Scope | Effect when `off` |
| --- | --- | --- |
| `node.alerts.nodeDown` | Node existence / node-exporter target disappearance | Suppresses the node-level `ExpectedNodeExporterMissing` alert for that node. |
| `node.alerts.nodeExporter` | Host metrics such as CPU, memory, disk, and node-exporter health | Suppresses host metric alerts for that node. |
| `chainExporter.targets[].alert` | One chain or RPC scrape target | Suppresses chain/RPC alerts for that one target only. |

Chain and host metric rules positively select `alert="on"`. The node-down rule
uses the independent positive selector `node_down_alert="on"`, so turning off
host metric alerts does not accidentally turn off node-down detection.

## Planned node maintenance

Use this when a node is down or intentionally offline, and the operator wants
PagerDuty and Slack notifications to stop during repair.

1. Open the node values file in the monitoring GitOps repository.
2. Turn off node-down and host metric alerts.
3. Turn off every affected chain/RPC target on that node.
4. Commit, push, and sync the monitoring applications.
5. Confirm active alerts stop before continuing long repair work.

Example for a node with four chain targets:

```yaml
node:
  alerts:
    nodeDown: 'off'
    nodeExporter: 'off'
chainExporter:
  targets:
  - chain: initia
    alert: 'off'
  - chain: sei
    alert: 'off'
  - chain: stable
    alert: 'off'
  - chain: walrus
    alert: 'off'
```

Expected result:

- The node-down alert is not rendered for that node.
- Host metric alerts stop for that node.
- Chain/RPC alerts stop for the targets marked `alert: 'off'`.
- PagerDuty stops receiving new incidents for those alerts.
- Slack investigation and reminder cards stop because the investigator reads
  active alerts from Alertmanager.

:::warning
If only `nodeDown` is turned off, chain/RPC scrape-down alerts can still fire.
For full node maintenance, turn off `nodeDown`, `nodeExporter`, and every
affected `chainExporter.targets[].alert`.
:::

## Chain-only maintenance

Use this when a chain process, RPC service, or metrics endpoint is being worked
on but the host should still be monitored.

```yaml
node:
  alerts:
    nodeDown: 'on'
    nodeExporter: 'on'
chainExporter:
  targets:
  - chain: arbitrum
    alert: 'off'
```

Expected result:

- Arbitrum target alerts stop.
- Node-down alerts still fire if the node disappears.
- Host metric alerts still fire for CPU, memory, disk, and exporter issues.

## Host metric maintenance

Use this when host metric rules are noisy but node existence and chain targets
should still be watched.

```yaml
node:
  alerts:
    nodeDown: 'on'
    nodeExporter: 'off'
```

Expected result:

- Host metric alerts stop for that node.
- Node-down alerts still fire if the node disappears.
- Chain/RPC target alerts still follow their target-level `alert` values.

## Recovery

After repair, flip the same fields back to `on` and sync GitOps.

```yaml
node:
  alerts:
    nodeDown: 'on'
    nodeExporter: 'on'
chainExporter:
  targets:
  - chain: initia
    alert: 'on'
  - chain: sei
    alert: 'on'
  - chain: stable
    alert: 'on'
  - chain: walrus
    alert: 'on'
```

Verify that:

- Prometheus has loaded the expected node-down rule for the node.
- Chain/RPC targets have `alert="on"` again.
- `ALERTS{alertstate="firing"}` only shows real remaining problems.
- PagerDuty and Slack behavior matches the restored alert state.

## Verification queries

Use Prometheus to confirm the on/off state.

```promql
count by (node) (
  up{source=~".*node-exporter", node_down_alert="on"}
)
```

```promql
ALERTS{alertname="ExpectedNodeExporterMissing", alertstate="firing"}
```

```promql
up{source="chain-raw-scrape", node="<node>"}
```

For chain/RPC alert eligibility, inspect the target labels. Targets that are
under maintenance should not have `alert="on"`.
