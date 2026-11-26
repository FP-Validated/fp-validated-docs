---
title: Stable Deployment Architecture
sidebar_position: 1
last_verified: 2026-11-26
---

# Stable Deployment Architecture

We run Stable as a validator with a threshold signer. The validator key is split into shares, and a quorum of signers must agree before a block is signed, so the key never exists in one piece on the validator. The setup follows the [shared deployment pattern](/chains/shared-kubernetes/argocd-and-values-pattern).

## How it is run

| Topic | Approach |
| --- | --- |
| Roles | One validator and its signers. Each is deployed and changed on its own. |
| Signing | Threshold signer. The validator holds no validator key. |
| Client version | A pinned release, managed by the chain's upgrade manager. |
| Chain upgrades | Each on-chain upgrade is declared ahead of its height, with the source of the new binary. |
| Data | Retained across redeployment. |

## Network exposure

| Endpoint | State |
| --- | --- |
| P2P | Public. |
| Metrics | Private, read by monitoring only. |
| Cosmos RPC, REST, and gRPC | Private. |
| EVM RPC and WebSocket | Private. Public access, where offered, goes through a gateway and never reaches the validator directly. |
| Signer ports | Private. |

## Before a change

- [ ] The change has been rendered and read.
- [ ] The validator uses the threshold signer and references no validator key.
- [ ] Each signer's secrets are ready.
- [ ] The signers are started before the validator.
- [ ] When moving hosts, the same workload has exited in its old location first.
