---
title: GraphQL Samples
sidebar_position: 2
last_verified: 2026-05-28
---

# GraphQL samples

The query documents under `chains/sui/samples/graphql/` are designed for the [Sui GraphQL RPC](https://docs.sui.io/develop/accessing-data/graphql/graphql-rpc) endpoint.

```bash
curl -sS "$SUI_GRAPHQL_ENDPOINT"   -H 'content-type: application/json'   --data-binary @<(jq -n     --rawfile query chains/sui/samples/graphql/object-query.graphql     --arg objectId '0x...'     '{query:$query, variables:{objectId:$objectId}}')
```

## Query groups

| File | Use case |
| --- | --- |
| `object-query.graphql` | Read object owner, version, digest, type, and content. |
| `transaction-query.graphql` | Inspect a transaction by digest with effects and checkpoint. |
| `event-query.graphql` | Query Move events by sender/package/module/type filters. |
| `pagination.graphql` | Page through objects or transactions with cursors. |

:::tip
Use GraphQL for UI and analytics reads where field selection and pagination matter more than the lowest possible latency.
:::
