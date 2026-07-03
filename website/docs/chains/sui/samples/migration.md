---
title: Migration Samples
sidebar_position: 5
last_verified: 2026-05-28
---

# JSON-RPC migration samples

The [Sui API reference](https://docs.sui.io/references/sui-api) sets the direction: JSON-RPC is deprecated and must be replaced by July 2026.

## JSON-RPC to gRPC

| JSON-RPC habit | gRPC replacement |
| --- | --- |
| Poll latest checkpoint | `LedgerService` latest checkpoint call. |
| Read object by ID | `StateService` object lookup. |
| Submit transaction bytes | `TransactionExecutionService` submission call. |
| Subscribe or poll events | `SubscriptionService` checkpoint stream plus event filtering. |

## JSON-RPC to GraphQL

| JSON-RPC habit | GraphQL replacement |
| --- | --- |
| Fetch object fields for a UI | `object(address:)` selection with only required fields. |
| Fetch transaction details | `transactionBlock(digest:)` query with effects and events. |
| Search events | Event connection with filters and cursor pagination. |

## Breaking-change checklist

- Response shapes change from method-specific JSON objects to protobuf messages or GraphQL selections.
- Pagination changes to checkpoint cursors or GraphQL connection cursors.
- gRPC transport requires HTTP/2-aware load balancers.
- Transaction submission should preserve binary bytes and signatures without JSON mutation.
