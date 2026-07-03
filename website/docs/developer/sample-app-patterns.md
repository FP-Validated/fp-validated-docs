---
title: Sample App Patterns
sidebar_position: 14
last_verified: 2026-05-28
---

This page defines the required sample categories for FP Validated chain documentation. Chain-specific sample pages should implement these categories with real method names, ports, SDKs, and data types for that chain.

| Required category | What the sample must prove | Example outputs |
| --- | --- | --- |
| Health Check | Client can reach the endpoint and distinguish healthy, lagging, and unavailable nodes. | Sync status, latest height/slot/checkpoint/version, peer or health response. |
| Block/Checkpoint/Slot | Client can read chain progress by stable ordering key. | Ethereum block, Solana slot/block, Sui checkpoint, Aptos ledger version. |
| Account/Object | Client can query account, balance, object, or resource state. | EVM balance/storage, Solana account, Sui object, Aptos account resource. |
| Transaction query | Client can retrieve a transaction by hash, signature, digest, or version. | Receipt/status, effects, logs/events, finality state. |
| Simulation | Client can test a transaction without committing it. | Gas estimate, dry-run effects, simulation logs, validation error. |
| Submit | Client can submit a signed transaction safely. | Transaction id plus tracking loop and duplicate-submit guard. |
| Event/Log query | Client can fetch historical events or logs by filter. | EVM logs, Solana logs, Sui events, Aptos events. |
| WebSocket/Streaming | Client can subscribe, heartbeat, reconnect, and resubscribe. | `eth_subscribe`, Solana WebSocket, Sui subscription, Aptos stream where applicable. |
| Indexer | Client can backfill, persist a cursor, switch to live sync, and write idempotently. | Postgres rows keyed by source identity. |
| Error Handling | Client classifies rate limits, timeouts, stale nodes, validation errors, and retention misses. | Normalized error category and retry decision. |
| Production Client | Client applies auth, deadlines, retries, metrics, connection pooling, and graceful shutdown. | Configurable endpoint, API key, backoff, structured logs, metrics. |

:::info Canonical checklist
If a chain cannot support a category through one interface, the sample should point to the correct alternative interface rather than omitting the category.
:::

Use this page with [API Design Principles](/developer/api-design-principles), [Retry / Timeout / Backoff](/developer/retry-timeout-backoff), and chain sample pages such as [Ethereum curl samples](/chains/ethereum/samples/curl), [Solana curl samples](/chains/solana/samples/curl), [Sui gRPC samples](/chains/sui/samples/grpc), and [Aptos REST samples](/chains/aptos/samples/rest-api).
