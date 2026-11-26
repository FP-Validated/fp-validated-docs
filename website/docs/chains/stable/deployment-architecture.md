---
title: Stable Deployment Architecture
sidebar_position: 1
last_verified: 2026-11-26
---

# Stable Deployment Architecture

Stable runs as a Cosmos validator with a threshold signer of three cosigners, of which two must sign. The node binary is managed by stablevisor, and the node also serves Stable's EVM endpoints.

## Deployed roles

| Role | Values file | Notes |
| --- | --- | --- |
| Validator | `variables/stable-mainnet/validator-01.yaml` | Signs through the threshold signer. Holds the node key only. |
| Cosigner 1 to 3 | `variables/stable-mainnet/horcrux-01.yaml` to `horcrux-03.yaml` | Each holds one key share and its transport key, delivered from Vault. |

All four layer on `variables/stable-mainnet/common-values.yaml`, and each is its own ArgoCD Application. Testnet has the same layout under `variables/stable-testnet/`.

The cosigners currently run on the same host as the validator. That placement is temporary. It keeps the key from existing in one piece, but it adds no host-level fault tolerance.

## Runtime model

The common values file defines:

- stablevisor, with a pinned version and binary source.
- Upgrade plans for the node binary.
- The cosigner list. Its order is fixed, because the position of a cosigner determines its share ID.
- Data on a host path that is reused across redeployments.
- Stable's EVM RPC and WebSocket addresses, bound to loopback.

The chart renders:

- A host-network validator that waits for the signer before it starts.
- Host-network cosigner pods that expose only the cosigner port to each other.
- P2P, RPC, gRPC, and native Prometheus metrics as enabled endpoints, none of them marked public. REST, gRPC-web, and the EVM Services are off.

## Exposure policy

Do not treat EVM RPC/WebSocket as automatically public. Document whether each endpoint is:

| Endpoint class | Default posture |
| --- | --- |
| P2P | Public only when required by the chain. |
| Cosmos RPC/API/gRPC | Private or gatewayed unless explicitly approved. |
| EVM RPC/WebSocket | Private or rate-limited gateway; never expose validator internals directly. |
| Prometheus | Private cluster/monitoring network only. |
| Horcrux signer/cosigner | Private only. |

## Preflight checklist

- [ ] Confirm the stablevisor version and binary source in the common values.
- [ ] Confirm the validator values use the threshold signer and do not reference a validator key.
- [ ] Confirm each cosigner's share and transport key exist in Vault.
- [ ] Confirm the cosigner list order is unchanged.
- [ ] Confirm the data path on the host before sync.
- [ ] Sync the cosigners before the validator.
- [ ] When moving hosts, confirm the same workload has exited in its old location first.
