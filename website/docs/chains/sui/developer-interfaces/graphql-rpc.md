---
title: GraphQL RPC
sidebar_position: 3
last_verified: 2026-05-28
---

# Sui GraphQL RPC

GraphQL RPC is the recommended query interface for frontends, analytics, and flexible historical exploration. Sui documents this surface in the [GraphQL RPC guide](https://docs.sui.io/develop/accessing-data/graphql/graphql-rpc).

## When to choose GraphQL

| Workload | Why GraphQL fits |
| --- | --- |
| Frontend object or address views | A client can request only fields needed for the page. |
| Analytics and exploration | Cursor pagination and nested selections reduce follow-up requests. |
| Historical transaction lookup | Query shape is easier to evolve than fixed JSON-RPC method responses. |
| Public read API | HTTP gateways can cache, rate-limit, and inspect request cost. |

:::warning
GraphQL is easier to expose publicly than gRPC, but it still needs request-size limits, query-depth limits, pagination caps, and abuse monitoring. Use `/developer/rate-limiting` and `/operations/observability` for shared controls.
:::

See [GraphQL samples](/chains/sui/samples/graphql) and query files under `chains/sui/samples/graphql/`.
