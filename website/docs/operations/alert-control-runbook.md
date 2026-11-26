---
title: Alert Control Runbook
sidebar_position: 7
last_verified: 2026-11-26
---

Alert control is done in Git. To stop or resume alerts for a target, change its
alert switch, commit, and let the monitoring applications sync. Alertmanager
silences are a fallback for when the Git path is too slow, not the record of
planned maintenance.

## Control model

A target can alert only if its series carry the label `alert="on"`. Rules select
that label explicitly, so a target without it is still scraped and still shows on
dashboards, but it cannot fire. See
[Monitoring Architecture](/fp-validated-infra/monitoring-architecture#alert-eligibility).

Where the switch lives depends on how the target is collected.

### Workloads with their own ServiceMonitor

Chain workloads in the workload cluster ship a ServiceMonitor in their Helm
chart. The switch is a value in the workload's values file:

```yaml
serviceMonitor:
  enabled: true
  alert: 'on'
```

Set `alert: 'off'` to keep the scrape and stop the alerts. Sync the workload's
ArgoCD Application for the change to take effect.

### Hosts in the static node inventory

Hosts tracked in the monitoring repository have one values file per node with
three independent switches:

```yaml
node:
  name: example-node-01
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

Chain and host metric rules select `alert="on"`. The node-down rule selects a
separate label, `node_down_alert="on"`, so turning off host metric alerts does
not turn off node-down detection.

The rest of this page uses the node inventory fields. The same steps apply to a
workload ServiceMonitor with its single `alert` value.

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
- Slack alert and reminder cards stop, because Guard builds them from the
  alerts that are active in Alertmanager.

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

After repair, set the same fields back to `on`, commit, and sync.

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

## Retiring a target

`alert: 'off'` removes only the `alert="on"` label. The scrape continues, and the
generic `TargetDown` rule from kube-prometheus-stack looks at every scrape target
whatever its labels. When a workload is removed for good, stop the scrape as
well: set `enabled: false` on the target, or remove its ServiceMonitor.

## Silences

When a Git change is too slow, create an Alertmanager silence through
[FP Validated Guard](/fp-validated-infra/fp-validated-guard). A silence needs at
least one exact matcher, a reason, and an end time, and it is recorded under the
requester's identity. Do not silence a target that is down before the cause is
known, and remove the silence once the Git change has synced.

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
