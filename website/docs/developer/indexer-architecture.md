---
title: Indexer Architecture
sidebar_position: 10
last_verified: 2026-05-28
---

A production indexer is a state machine with a durable cursor. It backfills historical data, switches to live sync, handles reorg or finality rules, and writes idempotently to a query database such as Postgres.

| Component | Responsibility |
| --- | --- |
| Source adapter | Calls JSON-RPC, REST, GraphQL, gRPC, or WebSocket APIs. |
| Cursor store | Records block height, slot, checkpoint, ledger version, or stream offset. |
| Decoder | Converts raw chain payloads into typed domain events. |
| Writer | Performs idempotent inserts/upserts in Postgres. |
| Reconciler | Detects gaps, reorgs, missed stream messages, and node lag. |
| API layer | Serves product queries from indexed tables, not from hot node RPC. |

```text
backfill worker ---> decoder ---> postgres tables ---> product API
       |              ^                 ^
       v              |                 |
 cursor store     live stream ----- reconciler
```

Polling is simpler and reliable for backfill. Streaming reduces latency for live updates but needs reconciliation because connections can drop. Sui's event indexer example is a useful chain-specific pattern for cursor-based event ingestion ([Sui event indexer](https://docs.sui.io/getting-started/examples/event-indexer)). Aptos transaction stream gRPC and Solana WebSocket subscriptions follow the same durable-consumer principle even though the APIs differ.

:::tip Store raw identity
Keep chain, height/slot/checkpoint/version, transaction hash or digest, event index, and source block hash where applicable. Those fields make dedupe, rollback, and audits possible.
:::

Use [/developer/event-processing](/developer/event-processing) for decoding and ordering rules, and [/developer/reorg-finality-handling](/developer/reorg-finality-handling) for finality behavior.
