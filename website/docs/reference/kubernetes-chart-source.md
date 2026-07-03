---
title: Kubernetes Chart Source
sidebar_position: 9
last_verified: 2026-05-29
---

# Kubernetes Chart Source

This site is intended to provide source-code patterns that an institutional operator can adapt for Docker and Kubernetes-based chain operations. The public chart is intentionally generic and sanitized: it captures FP Validated's operating patterns without publishing private node placement, private storage paths, exact secret paths, or production endpoints.

## Source layout

```text
charts/blockchain-node/
  Chart.yaml
  values.yaml
  templates/
    statefulset.yaml
    service.yaml
    configmap.yaml
    externalsecret.yaml
    servicemonitor.yaml
  examples/
    ethereum-values.yaml
    sei-values.yaml
    walrus-values.yaml
```

## What the chart supports

| Capability | Purpose |
| --- | --- |
| StatefulSet runtime | Stable identity and persistent storage for full nodes, validators, or storage services. |
| Internal Service | Cluster-private RPC/API/metrics access. |
| Optional public Service | Explicit public surface for P2P or storage protocols only after policy review. |
| ConfigMap mounting | Chain configuration files without baking config into images. |
| PVC / existing claim / hostPath modes | Supports portable defaults plus advanced operator-controlled storage. |
| ExternalSecret | Runtime secret delivery without committing secret values to Git. |
| Local signer mount | Optional secret mount for chains that require local signer material. |
| Upgrade manager init container | Hook for chain-specific upgrade preparation. |
| ServiceMonitor | Prometheus Operator integration for node and chain metrics. |
| Hardened defaults | Non-root user, no privilege escalation, dropped Linux capabilities. |

## Public-safe values model

```yaml
chain:
  name: sei
  family: cosmos-evm
  profile: validator

image:
  repository: ghcr.io/example/sei-node
  tag: stable

persistence:
  type: pvc
  size: 2Ti

serviceMonitor:
  enabled: true
```

Use example files as starting points. Replace image names, ports, resources, and config with chain-specific values.

## Secret policy

The public chart demonstrates ExternalSecret wiring, but the public repository must not include production secret paths. Use placeholder remote keys in examples and bind real keys only in private deployment repositories.

## Deployment policy

1. Render manifests locally.
2. Review public/private port posture.
3. Confirm required secret classes exist.
4. Deploy through GitOps.
5. Verify Kubernetes health and chain health.
6. Expose developer interfaces only through approved gateway or service policy.

## Example render commands

```bash
helm template ethereum charts/blockchain-node -f charts/blockchain-node/examples/ethereum-values.yaml
helm template sei charts/blockchain-node -f charts/blockchain-node/examples/sei-values.yaml
helm template walrus charts/blockchain-node -f charts/blockchain-node/examples/walrus-values.yaml
```
