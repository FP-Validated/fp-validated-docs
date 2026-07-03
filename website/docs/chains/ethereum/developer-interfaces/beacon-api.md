---
title: Beacon API
sidebar_position: 4
last_verified: 2026-05-28
---

The Beacon API is a separate HTTP REST API served by consensus clients and specified in [ethereum/beacon-APIs](https://github.com/ethereum/beacon-APIs). It provides consensus-layer state such as node sync status, finalized checkpoints, validator data, and block/header views.

:::danger
The Beacon API specification explicitly warns not to expose the API unprotected to the public internet. Keep port 5052 private, require authentication at any gateway, and allow only operator and monitoring networks.
:::

Example finality check:

```bash
BEACON_URL=${BEACON_URL:-http://127.0.0.1:5052}
curl -s "$BEACON_URL/eth/v1/beacon/states/head/finality_checkpoints"
```

Use Beacon finality to decide when indexer data is safe to mark finalized. Keep application transaction flows on execution JSON-RPC.
