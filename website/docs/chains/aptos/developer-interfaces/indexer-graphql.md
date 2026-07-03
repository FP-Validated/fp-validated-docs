---
title: Indexer GraphQL
sidebar_position: 3
last_verified: 2026-05-28
---

Indexer GraphQL is the Aptos interface for derived reads such as NFTs, Aptos Objects, and custom Move contract queries ([Aptos API documentation](https://aptos.dev/build/apis)). Use it when the application needs joins, filtering, or historical projections that are expensive or awkward through fullnode REST.

```graphql
query AccountAssets($owner: String!) {
  current_fungible_asset_balances(where: {owner_address: {_eq: $owner}}) {
    asset_type
    amount
  }
}
```

Production GraphQL is an indexer service contract: version schemas, publish query examples, and alert on ingestion lag between Transaction Stream checkpoints and the database.
