---
title: Initia Deployment Architecture
sidebar_position: 1
last_verified: 2026-11-26
---

# Initia Deployment Architecture

We run the Initia mainnet validator as a single workload that follows the [shared deployment pattern](/chains/shared-kubernetes/argocd-and-values-pattern). It signs with a local signer and runs the oracle sidecar that Initia validators need.

## How it is run

| Topic | Approach |
| --- | --- |
| Roles | One validator. The same node is first brought up as a sync-only node and switched to signing in a separate change. |
| Signing | Local signer. One active instance, with no automatic failover. |
| Oracle sidecar | Runs next to the validator, at a pinned version. Its connection to the node is local-only. |
| Client version | The official Initia release, pinned. A binary taken from a release carries the publisher's checksum. |
| Data | A retained volume that survives redeployment. |

## Network exposure

| Endpoint | State |
| --- | --- |
| P2P | Public. |
| Metrics | Private, read by monitoring only. |
| RPC, REST, and gRPC | Off or local-only on the validator. |

## Moving the validator

When the validator moves to another host, the old instance is stopped and confirmed gone, its final signer state is handed over, and the new instance compares that state with the chain before it signs.

## Before a change

- [ ] The change has been rendered and read.
- [ ] The node's role is the intended one: sync-only or signing.
- [ ] The secrets the node needs are ready.
- [ ] No other instance of this validator is running anywhere.
- [ ] Upcoming chain upgrades have been checked.
