---
title: Sei Deployment Architecture
sidebar_position: 1
last_verified: 2026-11-26
---

# Sei Deployment Architecture

The Sei mainnet validator runs as a single host-network workload from the shared `chain-templates` chart. It signs with a local signer. The chart rejects a threshold signer configuration for Sei.

## Deployed roles

| Role | Values file | Notes |
| --- | --- | --- |
| Sync-only node | `variables/sei-mainnet/fullnode-01.yaml` | Same node name and volume as the validator. No validator key. Used to sync before activation. |
| Active validator | `variables/sei-mainnet/active.yaml` | `signerMode: local`, `validatorRole: active`. Mounts the node key, the validator key, and the last signed state from Vault. |

Both files layer on `variables/sei-mainnet/common-values.yaml`. Only one of them is referenced by the Application at a time. See [Sync-only node and signing node](/chains/shared-kubernetes/argocd-and-values-pattern#sync-only-node-and-signing-node).

## Common values

- Chain ID: `pacific-1`.
- Runtime image: the official `sei` image at a pinned version (v6.7.4 at the time of writing).
- Upgrade plans: each on-chain upgrade is listed with its binary source, and the binary is staged before the upgrade height.
- Storage: an existing volume claim. The chart does not create the volume.
- Ports: a fixed offset block for Sei.

## Network behavior

The validator uses host networking, so every enabled endpoint is reachable on the node's address.

| Endpoint | State |
| --- | --- |
| P2P | Enabled. |
| Native Prometheus metrics | Enabled, scraped inside the cluster. |
| RPC | Disabled as a Service. The process listens on loopback only. |
| REST API, gRPC, gRPC-web | Disabled. gRPC keeps a loopback bind so that enabling it later does not expose it. |
| EVM HTTP and WebSocket | Disabled on the validator. |

## Signer state

With a local signer, the last signed height, round, and step are part of the validator's identity. When the validator moves to another host:

1. The old instance is stopped and confirmed gone.
2. Its final signer state is written to Vault.
3. The new instance starts with `signerStateHandoff` reading that state, and compares it with the chain height before it signs.

The chart does not overwrite newer state on disk with older state from Vault.

## Preflight checklist

- [ ] Render the chart with the common file and the intended node file.
- [ ] Confirm which node file the Application references, and that it is the intended role.
- [ ] Confirm the node key, validator key, and signer state exist in Vault.
- [ ] Confirm no other instance of this validator is running anywhere.
- [ ] Confirm the P2P port is free on the node and open in the firewall.
- [ ] Confirm the volume claim is bound.
