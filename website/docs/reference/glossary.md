---
title: Glossary
sidebar_position: 7
last_verified: 2026-05-28
---

| Term | Meaning |
| --- | --- |
| RPC | Remote Procedure Call: an API style where a client asks a node or service to execute a named method and return a result. |
| JSON-RPC | A JSON-encoded RPC protocol commonly used by Ethereum, Solana, and legacy Sui APIs. It usually runs over HTTP or WebSocket. |
| gRPC | A binary RPC framework based on HTTP/2 and Protocol Buffers. It is commonly used for high-throughput internal APIs and streaming feeds. |
| GraphQL | A query language and API runtime where clients request an explicit response shape. Aptos and Sui use GraphQL-style APIs for richer indexed access. |
| WebSocket / PubSub | A persistent client-server connection used for subscriptions such as logs, events, new heads, or account changes. |
| Commitment | A Solana-style indication of how strongly the cluster has confirmed a block or account state, such as processed, confirmed, or finalized. |
| Finality | The point at which a transaction or block is considered irreversible under the protocol's consensus assumptions. Finality timing and meaning differ by chain. |
| Reorg | A chain reorganization where previously observed blocks are replaced by a different canonical branch. Applications should tolerate short reorgs unless a chain guarantees finality for the queried state. |
| Checkpoint | A Sui term for an ordered, certified batch of transactions and effects. Checkpoints are central to Sui sync, historical reads, and event processing. |
| Slot | A Solana time/leader unit in which a validator may produce a block. RPC freshness is often described by current slot and slot lag. |
| BCS | Binary Canonical Serialization, the deterministic binary encoding used by Move-based ecosystems such as Sui and Aptos. |
| Archive node | A node or service tier that retains historical state beyond normal pruned full-node requirements. Archive service has materially larger storage and backup needs. |
| Indexer | A process or service that consumes chain data, transforms it, and stores query-optimized views outside the node database. |
| Validator | A consensus participant that proposes, votes on, or validates blocks/checkpoints according to the protocol. Validator operation has stricter key, uptime, and slashing-risk requirements than ordinary RPC service. |
| Full node | A non-validator or validator-adjacent node that follows the chain, verifies data according to protocol rules, and serves local APIs. Full nodes may be pruned or archival depending on configuration. |
| Snapshot | A point-in-time copy of node state used for backup, migration, or faster bootstrap. Snapshots must be validated after restore before serving production traffic. |
| Sync | The process of catching a node up to the network's latest block, checkpoint, ledger version, or slot. Sync health is a core readiness signal. |

:::info
Glossary terms are intentionally chain-neutral. When a term has protocol-specific behavior, prefer the relevant chain page for exact semantics and operational runbooks.
:::
