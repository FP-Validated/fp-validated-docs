---
title: ArgoCD and Values Pattern
sidebar_position: 1
last_verified: 2026-05-29
---

# ArgoCD and Values Pattern

This page documents the deployment contract used by `chain deployment repository`. It is the model to reuse when adding a production chain guide to this docs site.

## Source of truth

`chain deployment repository` separates deployment intent into three layers:

| Layer | Location | Purpose |
| --- | --- | --- |
| ArgoCD Application | `argocd/applications/<chain>/<node>.yaml` | Declares the deployable unit, namespace, chart path, Helm parameters, and ordered value files. |
| Common values | `variables/<chain>/common-values.yaml` | Chain-level defaults: protocol, network, image, ports, storage, secret store, bootstrap URLs, resource profile. |
| Node overlay | `variables/<chain>/<node>.yaml` | Node identity, node placement, role, storage override, Vault key paths, endpoint overrides. |

The active tree uses explicit child Applications instead of one implicit generator. Examples include Walrus storage apps, Canton production validator app, and Cosmos-style validator/Horcrux apps.

## Deployment flow

1. Create or update `variables/<chain>/common-values.yaml`.
2. Create one node overlay per deployable role.
3. Add one explicit ArgoCD Application per role/node.
4. Keep namespaces as explicit bootstrap resources where the chain uses namespace sync waves.
5. Render/validate before sync; never rely on ArgoCD as the first renderer.
6. Sync manually for validator/signing workloads. Do not enable automated failover for signing roles.

## Values layering rule

The Application must load common values first and the node overlay second:

```yaml
valueFiles:
  - ../../../variables/<chain>/common-values.yaml
  - ../../../variables/<chain>/<node>.yaml
```

This makes chain defaults reviewable and keeps node-specific risk localized.

## Operator checklist

- [ ] Application path points at the expected chart: `charts/chain-templates`, `charts/ethereum-common`, or `charts/splice-validator` composition.
- [ ] `protocol`, `network`, `server_type`, `name`, and `namespace` match the folder and node overlay.
- [ ] Node pinning is explicit for validator/storage/signing workloads.
- [ ] Vault remote keys are present before sync.
- [ ] Host-network ports are checked against the port registry before rollout.
- [ ] Manual sync order is documented for multi-role chains.
