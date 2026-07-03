---
title: GraphQL Samples
sidebar_position: 3
last_verified: 2026-05-28
---

GraphQL examples target common indexer read models: account assets, NFT/current token ownership, Aptos Object lookups, and custom Move-contract tables/events. Indexer GraphQL is recommended for these derived queries by the [Aptos API documentation](https://aptos.dev/build/apis).

```bash
curl -sS "$APTOS_INDEXER_GRAPHQL_URL" \
  -H 'content-type: application/json' \
  --data-binary @<(jq -n --arg owner "$OWNER" \
    --rawfile query chains/aptos/samples/graphql/account-assets.graphql \
    '{{query:$query, variables:{{owner:$owner}}}}')
```
