---
title: Initia Deployment Architecture
sidebar_position: 1
last_verified: 2026-11-26
---

# Initia Deployment Architecture

The Initia mainnet validator runs as a single host-network workload from the shared `chain-templates` chart, with a local signer and an oracle sidecar. Earlier versions of this page described a three-cosigner threshold signer. That setup is no longer in use.

## Deployed roles

| Role | Values file | Notes |
| --- | --- | --- |
| Sync-only node | `variables/initia-mainnet/fullnode-01.yaml` | Same node name and volume as the validator. No validator key. RPC, API, and gRPC are off. |
| Active validator | `variables/initia-mainnet/active.yaml` | `validatorRole: active`, `signerMode: local`, `topology.activeValidator` set to this node. Enables the oracle sidecar. |

Both files layer on `variables/initia-mainnet/common-values.yaml`. Only one is referenced by the Application at a time.

## Common values

- Chain ID: `interwoven-1`.
- Runtime image: the official `initiad` image at a pinned version, with a pinned static binary override when a release ships as a binary first. The override carries the checksum from the release's checksum file.
- Bootstrap: genesis URL, seeds, and peers.
- Storage: an existing volume claim.
- Ports: a fixed offset block for Initia.

## Oracle sidecar

Initia validators run the Connect oracle sidecar next to the node. The sidecar image is pinned by digest. The node's gRPC endpoint for the sidecar is bound to loopback, because with host networking a wider bind would expose it on the node address.

## Active validator topology

| Field | Meaning |
| --- | --- |
| `validatorRole` | `active` signs. `standby` does not, and the chart refuses a standby that references validator keys. |
| `topology.activeValidator` | The one node expected to sign. It must match the node being rendered when the role is active. |
| `signerStateHandoff` | Where the last signed state comes from when the node becomes active, and what to compare it with. |

## Preflight checklist

- [ ] Confirm `validatorRole: active` is intended and `topology.activeValidator` names this node.
- [ ] Confirm the node key, validator key, and signer state exist in Vault.
- [ ] Confirm no other instance of this validator is running anywhere.
- [ ] Confirm the oracle sidecar image digest matches the release in use.
- [ ] Confirm the P2P port is free on the node and open in the firewall.
- [ ] Check upcoming upgrade plans before an upgrade window.
