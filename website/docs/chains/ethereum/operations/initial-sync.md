---
title: Initial Sync
sidebar_position: 1
last_verified: 2026-05-28
---

Initial sync requires both execution and consensus clients. Start the execution client with persistent storage and JSON-RPC disabled from public exposure, then start the consensus client with the Engine API endpoint and JWT secret.

Monitor execution sync with `eth_syncing` and consensus sync with `/eth/v1/node/syncing` on the protected Beacon API.

```bash
curl -s "$RPC_URL" -H 'content-type: application/json' -d '{"jsonrpc":"2.0","id":1,"method":"eth_syncing","params":[]}'
curl -s "$BEACON_URL/eth/v1/node/syncing"
```

Do not route application traffic until the execution client is synced and the consensus client reports a healthy head.
