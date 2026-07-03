---
title: Cutover Runbook Template
sidebar_position: 2
last_verified: 2026-05-29
---

# Stable Cutover Runbook Template

Use this structure when turning the repo's internal Stable migration runbook into an operator-facing page.

:::danger Double-sign safety
A validator cutover is successful only if exactly one signing path can produce signatures at any time. Ambiguity means stop the validator, not proceed.
:::

## Phase 0 — Freeze intent

- Record current systemd validator state.
- Record current Kubernetes target manifests.
- Record expected validator address, consensus pubkey, chain ID, and height.
- Freeze changes to `variables/stable/*` until cutover completes.

## Phase 1 — Secret preflight

Verify Vault payloads before Argo sync:

| Secret | Expected use |
| --- | --- |
| Node key | Stable validator node identity. |
| Horcrux shard | Remote signer share for each ordinal. |
| Horcrux ECIES key | Cosigner encryption for each ordinal. |
| Sign-state | Recovery/cutover state, when used. |
| Backup secret | Backup job destination/auth. |

## Phase 2 — Data path preflight

- Confirm `data directory/stable` exists on the target node.
- Confirm the existing data directory is not being overwritten by an empty path.
- Confirm stablevisor upgrade directories are present or intentionally initialized.
- Confirm backup can read the target path.

## Phase 3 — Render and compare

Render manifests and inspect:

- `hostNetwork: true` on validator.
- Horcrux signer and cosigner ports.
- Stable EVM RPC/WebSocket ports.
- ExternalSecret names and remote refs.
- Stablevisor command path.

## Phase 4 — Sync order

1. Namespace and ExternalSecret resources.
2. Horcrux signer pods.
3. Validator pod after Horcrux endpoints are reachable.
4. Monitoring and backup resources.

## Phase 5 — Post-cutover checks

- Validator catches up and remains healthy.
- No double-sign alerts or duplicate signer evidence.
- RPC/API/gRPC/EVM endpoints respond only on intended networks.
- Prometheus scrape target is present.
- Backup job succeeds or dry-run validates.
