---
title: Walrus Storage Node Guide
sidebar_position: 1
last_verified: 2026-05-29
---

# Walrus Storage Node Guide

Walrus storage nodes deploy through `charts/chain-templates` with `protocol=walrus` and `server_type=storage`.

## Active Applications

| Network | Application | Values |
| --- | --- | --- |
| Primary | `argocd/applications/walrus/storage-01.yaml` | `variables/walrus/common-values.yaml` + `storage-01.yaml` |
| Secondary | `argocd/applications/walrus/storage-01.yaml` | `variables/walrus/common-values.yaml` + `storage-01.yaml` |

Both networks have namespace bootstrap manifests with sync-wave `-2`.

## Runtime profile

| Network | Image tag | Placement | Storage | Resources |
| --- | --- | --- | --- | --- |
| Primary | `stable-release` | `dedicated Kubernetes node` | host or PVC-backed storage | 8 CPU / 96Gi |
| Secondary | `test-release` | `dedicated Kubernetes node` | inherits PVC defaults | 4 CPU / 24Gi |

## Template contract

`charts/chain-templates/templates/walrus.yaml` renders:

- ExternalSecret for the Walrus config.
- Deployment with optional host networking.
- Cluster-internal Service.
- Optional LoadBalancer service.
- ServiceMonitor for metrics.
- PVC when storage type is `pvc`.
- hostPath mount when storage type is `host`.

The template fails when storage mode inputs are incomplete: host storage requires `hostPath`, and PVC storage requires `size`.

## Ports and exposure

Common values define storage and metrics ports (`9185` / `9184`). Do not expose storage or metrics publicly unless a chain-specific policy says so. Treat publicService as an explicit product decision, not a default.

## Preflight checklist

- [ ] Confirm setup RPC/checkpoint/metrics endpoints in common values.
- [ ] Confirm external secret remote key exists.
- [ ] Confirm hostPath or PVC storage mode is complete.
- [ ] Confirm node pinning and tolerations match the intended physical node.
- [ ] Confirm metrics scrape target appears after sync.
