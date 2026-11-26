---
title: Ports and Secrets Contract
sidebar_position: 2
last_verified: 2026-11-26
---

# Ports and Secrets Contract

Two things are settled before a chain workload is started: which ports it uses and who can reach them, and which secrets must already exist.

## Ports

| Rule | Reason |
| --- | --- |
| Ports are allocated per chain and written in one place. | Workloads that share a host must not collide, and the allocation should be readable without searching. |
| Only P2P is open to the internet, plus a service port where the protocol needs one. | Everything else is reached inside the cluster. |
| RPC, REST, and gRPC on a validator are off or bound to the local interface. | A validator is not an API server. |
| Public HTTP endpoints go through a gateway with TLS. | A node port is never published directly. See [RPC Exposure Policy](/operations/rpc-exposure-policy). |
| Metrics are private. | Only the monitoring system can reach a metrics port. |
| Signer ports are private. | They are never opened in a firewall or load balancer. |

For a new chain guide, list the ports by purpose: P2P, RPC, REST or API, gRPC, WebSocket, metrics, signer, and anything chain-specific.

## Secrets

Secrets come from the secrets manager through an automated delivery path. See [Access and Secrets Model](/fp-validated-infra/access-and-secrets#secrets).

| Secret class | Needed when |
| --- | --- |
| Node identity | The node must keep the same peer identity across restarts. |
| Validator key and last signed state | The node signs with a local signer. |
| Signer key share | The chain uses threshold signing. |
| Validator keystores | Keys are served by a remote signer. |
| Component auth secret | Two components authenticate to each other, such as an execution and consensus client pair. |
| Registry pull credential | The image is private. |

A guide may name a secret class and say when it is needed. It does not include secret paths, values, or exports.

## Signer modes

| Mode | How it signs |
| --- | --- |
| Local signer | The validator process holds the key. Its last signed state is handed over explicitly when the validator moves. |
| Threshold signer | The key is split into shares, and a quorum of signers must agree. |
| Remote signer | A signing service holds the keys and keeps a slashing-protection record. The validator client asks it to sign. |
| Distributed validator | Several operators each hold a share and sign as a committee. |
| Key management service | The key stays inside the service, which signs on request. |

Which mode a chain uses depends on what its client supports and on what we judge safest for that chain.

## Fail-closed rules

- A missing secret blocks the rollout. Nothing generates a placeholder key.
- A mismatch between a signer and the validator it signs for is an incident, not a warning.
- If it is unclear which instance is active, none signs until it is resolved.
- Signing workloads are replaced, not rolled: the old one stops before the new one starts.
