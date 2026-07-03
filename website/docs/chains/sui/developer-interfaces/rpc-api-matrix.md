---
title: RPC/API Matrix
sidebar_position: 1
last_verified: 2026-05-28
---

# Sui RPC/API matrix

:::warning JSON-RPC is deprecated
The [Sui API reference](https://docs.sui.io/references/sui-api) marks JSON-RPC as deprecated and directs operators to migrate by July 2026. Treat every new integration as gRPC or GraphQL RPC first.
:::

| Interface | Status | Best For | Transport | Production Notes |
| --- | --- | --- | --- | --- |
| gRPC | Recommended | Backend services, indexers, low-latency object lookup, transaction submission, simulation, and streaming subscriptions | HTTP/2 | Full node gRPC exposes `LedgerService`, `StateService`, `TransactionExecutionService`, and `SubscriptionService` in the [Full Node protocol](https://docs.sui.io/references/fullnode-protocol). Keep it private or gateway-protected. |
| GraphQL RPC | Recommended | Frontend reads, analytics, flexible object/address/transaction query, and historical exploration | HTTP | The [GraphQL RPC guide](https://docs.sui.io/develop/accessing-data/graphql/graphql-rpc) fits query composition and pagination; publish through HTTPS, caching, and rate limits. |
| JSON-RPC | Deprecated | Legacy clients during migration only | HTTP; migration deadline 2026-07 | The [Sui API reference](https://docs.sui.io/references/sui-api) documents deprecation. Freeze new usage and map methods to gRPC or GraphQL before July 2026. |

Use `/developer/client-patterns` for retry and timeout defaults, and `/developer/rate-limiting` for shared public endpoint policy.
