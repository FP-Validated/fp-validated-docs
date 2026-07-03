---
title: Initia Deployment Architecture
sidebar_position: 1
last_verified: 2026-05-29
---

# Initia Deployment Architecture

Initia uses an active validator plus three Horcrux signer overlays with explicit active-validator topology.

## Deployed roles

| Role | File | Placement | Notes |
| --- | --- | --- | --- |
| Active validator | `variables/initia/validator-01.yaml` | `dedicated Kubernetes node` | `validatorRole: active`; `topology.activeValidator` set. |
| Horcrux signer 1 | `variables/initia/horcrux-01.yaml` | `dedicated Kubernetes node` | Per-ordinal share/ECIES Vault refs. |
| Horcrux signer 2 | `variables/initia/horcrux-02.yaml` | `dedicated Kubernetes node` | Per-ordinal share/ECIES Vault refs. |
| Horcrux signer 3 | `variables/initia/horcrux-03.yaml` | `dedicated Kubernetes node` | Co-located with validator; port checks are mandatory. |

## Chain defaults

`variables/initia/common-values.yaml` defines:

- chain ID: `interwoven-1`.
- host storage path: `persistent data directory` with 2Ti intent.
- bootstrap genesis, snapshot, seed, and peer URLs.
- preparer enabled.
- Horcrux quorum and explicit `chainNodes` target service.

## Bind vs advertise

`validator-01.yaml` carries explicit `bind_ip` and `advertise_ip` values. Keep this distinction visible in the guide:

| Field | Meaning |
| --- | --- |
| `bind_ip` | Where the pod/node listens. |
| `advertise_ip` | What peers or signers should connect to. |
| `topology.activeValidator` | The only validator expected to sign in the active topology. |

## Template behavior

`charts/chain-templates/templates/initia.yaml` renders host-network validator behavior and a Horcrux handshake retry loop. `initia-horcrux.yaml` renders host-network signer pods and exposes the cosigner port only. The template rejects ambiguous `chainNodes` versus validator advertise/private IP hints.

## Preflight checklist

- [ ] Confirm `validatorRole: active` is intentional.
- [ ] Confirm `topology.activeValidator` points at the same validator overlay.
- [ ] Confirm bind and advertise IPs match node routing.
- [ ] Confirm Horcrux `chainNodes` target resolves before validator sync.
- [ ] Confirm the shard filename uses the chain ID expected by tests.
- [ ] Confirm preparer and legacy upgrade sync behavior are both understood before upgrade windows.
