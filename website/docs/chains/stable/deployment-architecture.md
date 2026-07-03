---
title: Stable Deployment Architecture
sidebar_position: 1
last_verified: 2026-05-29
---

# Stable Deployment Architecture

Stable combines a Cosmos validator, Horcrux remote signing, Stable-specific EVM endpoints, and stablevisor runtime management.

## Deployed roles

| Role | File | Placement | Notes |
| --- | --- | --- | --- |
| Validator | `variables/stable/validator-01.yaml` | `dedicated Kubernetes node` | Horcrux-enabled validator; node key sourced from the Stable validator node-secret path. |
| Horcrux signer 1 | `variables/stable/horcrux-01.yaml` | `dedicated Kubernetes node` | Per-ordinal Vault shard/ECIES. |
| Horcrux signer 2 | `variables/stable/horcrux-02.yaml` | `dedicated Kubernetes node` | Per-ordinal Vault shard/ECIES. |
| Horcrux signer 3 | `variables/stable/horcrux-03.yaml` | `dedicated Kubernetes node` | Co-located signer overlay; requires careful port review. |

## Runtime model

`variables/stable/common-values.yaml` enables stablevisor and defines:

- hostPath cutover reuse at `data directory/stable`.
- Horcrux `signer_port: 1534` and `cosigner_port: 2522`.
- chain node target service for remote signing.
- backup job intent and backup secret.
- Stable EVM RPC and WebSocket endpoints in addition to Cosmos RPC/API/gRPC.

The chart template (`charts/chain-templates/templates/stable.yaml`) renders:

- host-network validator deployment.
- Stablevisor execution path when enabled.
- P2P, RPC, API, gRPC, gRPC-web, EVM, and native Prometheus ports.
- Horcrux handshake retry logic before validator startup in remote signer mode.

## Exposure policy

Do not treat EVM RPC/WebSocket as automatically public. Document whether each endpoint is:

| Endpoint class | Default posture |
| --- | --- |
| P2P | Public only when required by the chain. |
| Cosmos RPC/API/gRPC | Private or gatewayed unless explicitly approved. |
| EVM RPC/WebSocket | Private or rate-limited gateway; never expose validator internals directly. |
| Prometheus | Private cluster/monitoring network only. |
| Horcrux signer/cosigner | Private only. |

## Cutover checklist

- [ ] Validate `common-values.yaml` stablevisor settings.
- [ ] Confirm the validator overlay is Horcrux-enabled.
- [ ] Confirm the node key Vault path exists.
- [ ] Confirm each Horcrux overlay has shard and ECIES remote refs.
- [ ] Confirm `data directory/stable` data reuse path before sync.
- [ ] Confirm backup secret and destination before migration.
- [ ] Follow the Stable migration runbook for systemd → Kubernetes cutover.
