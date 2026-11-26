---
title: Sei Deployment Architecture
sidebar_position: 1
last_verified: 2026-11-26
---

# Sei Deployment Architecture

We run the Sei mainnet validator as a single workload that follows the [shared deployment pattern](/chains/shared-kubernetes/argocd-and-values-pattern). It signs with a local signer.

## How it is run

| Topic | Approach |
| --- | --- |
| Roles | One validator. The same node is first brought up as a sync-only node and switched to signing in a separate change. |
| Signing | Local signer. One active instance, with no automatic failover. |
| Client version | The official Sei release, pinned. A new version is a reviewed change. |
| Chain upgrades | Each on-chain upgrade is declared ahead of its height, with the source of the new binary. |
| Data | A retained volume that survives redeployment. |

## Network exposure

| Endpoint | State |
| --- | --- |
| P2P | Public. |
| Metrics | Private, read by monitoring only. |
| RPC, REST, gRPC, and EVM endpoints | Off or local-only on the validator. |

## Moving the validator

With a local signer, the last signed height is part of the validator's identity. When the validator moves to another host, the old instance is stopped and confirmed gone, its final signer state is handed over, and the new instance compares that state with the chain before it signs.

## Before a change

- [ ] The change has been rendered and read.
- [ ] The node's role is the intended one: sync-only or signing.
- [ ] The secrets the node needs are ready.
- [ ] No other instance of this validator is running anywhere.
