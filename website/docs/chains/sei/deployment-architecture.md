---
title: Sei Deployment Architecture
sidebar_position: 1
last_verified: 2026-05-29
---

# Sei Deployment Architecture

Sei uses a Cosmos-style validator deployment backed by `charts/chain-templates` and `variables/sei` in `chain deployment repository`.

## Deployed roles

| Role | File | Node placement | Notes |
| --- | --- | --- | --- |
| Validator | `variables/sei/validator-01.yaml` | `dedicated Kubernetes node` | `server_type: validator`, currently `signerMode: local`, uses hostPath reuse from `persistent chain data directory`. |
| Horcrux signer 1 | `variables/sei/horcrux-01.yaml` | `dedicated Kubernetes node` | v3 cosigner overlay with Vault shard/ECIES refs. |
| Horcrux signer 2 | `variables/sei/horcrux-02.yaml` | `dedicated Kubernetes node` | v3 cosigner overlay with ordinal-specific Vault refs. |
| Horcrux signer 3 | `variables/sei/horcrux-03.yaml` | `dedicated Kubernetes node` | v3 cosigner overlay with ordinal-specific Vault refs. |

## Common values to review first

`variables/sei/common-values.yaml` sets the chain identity and default runtime profile:

- chain ID: `pacific-1`.
- storage intent: 2Ti host-backed storage.
- preparer enabled.
- Sei runtime image: `ghcr.io/sei-protocol/sei:v6.5.0` from the validator overlay.
- baseline ports from the shared port registry.

## Validator-specific behavior

The validator template (`charts/chain-templates/templates/sei.yaml`) renders a host-network workload. That means:

1. Every exposed port must be checked against `docs/port-registry.md`.
2. The node-level filesystem path is part of the deployment contract.
3. Rollback must preserve both data directory and signer state.

The current validator overlay uses:

- high resource profile: CPU `16`, memory `100`, no limits.
- hostPath migration/reuse: `persistent chain data directory`.
- Vault refs for node key and local priv-validator key/state.
- endpoint overrides that enable EVM HTTP/WebSocket surfaces.

## Signer migration note

The presence of Horcrux overlays does not by itself mean the validator is already signing through Horcrux. `validator-01.yaml` is the current source for `signerMode`; document cutover state explicitly before syncing signer-related changes.

## Preflight checklist

- [ ] Render the Sei Applications locally.
- [ ] Confirm `signerMode` in `validator-01.yaml` matches the intended state.
- [ ] Confirm Vault paths for node key and local signer state exist.
- [ ] Confirm Horcrux shard/ECIES paths for all three signer overlays exist before Horcrux cutover.
- [ ] Confirm the persistent chain data directory exists on the scheduled Kubernetes node and matches expected ownership.
- [ ] Confirm host-network ports are free on validator and signer nodes.
