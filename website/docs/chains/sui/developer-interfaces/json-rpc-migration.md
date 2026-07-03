---
title: JSON-RPC Migration
sidebar_position: 4
last_verified: 2026-05-28
---

# JSON-RPC migration

:::warning Required migration
Sui JSON-RPC is deprecated and must be migrated by July 2026 according to the [Sui API reference](https://docs.sui.io/references/sui-api). New applications should not add JSON-RPC dependencies.
:::

## Migration targets

| Legacy pattern | Preferred target | Notes |
| --- | --- | --- |
| Object reads such as `sui_getObject` | gRPC `StateService` or GraphQL object query | Use gRPC for backend latency; GraphQL for frontend field selection. |
| Transaction lookup such as `sui_getTransactionBlock` | gRPC `LedgerService` or GraphQL transaction query | Preserve digest-based lookup and normalize response shape in your app. |
| Dry-run or execute transaction calls | gRPC `TransactionExecutionService` | Keep signing outside the node and submit serialized transaction bytes. |
| Event polling | gRPC `SubscriptionService` or GraphQL event pagination | Use streaming for indexers; use GraphQL for backfill and UI search. |

## Cutover plan

1. Inventory JSON-RPC methods at the gateway and client libraries.
2. Classify each call as read, transaction execution, or event/indexer workload.
3. Add gRPC and GraphQL clients side-by-side behind the application interface.
4. Compare object IDs, transaction digests, checkpoint numbers, and pagination behavior.
5. Disable new JSON-RPC callers, then remove legacy routes after production parity.

See [migration samples](/chains/sui/samples/migration) for concrete mapping patterns.
