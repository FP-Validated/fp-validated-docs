---
title: Node Architecture
sidebar_position: 2
last_verified: 2026-05-28
---

An Ethereum full node is a paired execution client and consensus client. The execution client validates EVM blocks, maintains account/storage state, serves JSON-RPC, and exposes the authenticated Engine API. The consensus client follows the Beacon Chain, verifies fork-choice/finality, serves Beacon REST, and drives block payload exchange through the Engine API.

## Required channels

| Channel | Direction | Public? | Notes |
| --- | --- | --- | --- |
| Execution JSON-RPC HTTP | app -> execution | Usually behind gateway | Standard dapp/indexer reads and transaction submission. |
| Execution JSON-RPC WebSocket | app -> execution | Usually behind gateway | Subscriptions such as `eth_subscribe` for `newHeads` and `logs`; Geth documents WebSocket transport on default port 8546 in its [RPC docs](https://geth.ethereum.org/docs/interacting-with-geth/rpc). |
| Beacon REST | operator -> consensus | Protected only | REST API for consensus state from [beacon-APIs](https://github.com/ethereum/beacon-APIs). |
| Engine API | consensus ↔ execution | Never | JWT-authenticated local/private channel on port 8551. |
| P2P | client ↔ peers | Yes | Open only the documented P2P ports needed by chosen clients. |

:::info Client diversity
The interface contract is standardized; client flags and metrics ports differ. Keep this documentation interface-first and put implementation-specific overrides in Helm values or deployment manifests.
:::

## Data paths

Execution state grows fastest and benefits from high-IOPS NVMe. Consensus databases are smaller but still latency-sensitive during initial sync. Keep JWT secrets, keystores, and validator material out of public container images and mount them as secrets.
