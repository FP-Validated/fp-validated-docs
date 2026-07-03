---
title: WebSocket Streaming Samples
sidebar_position: 4
last_verified: 2026-05-28
---

Use WebSocket subscriptions for live streams and HTTP backfill for durability.

```bash
export WS_URL=ws://127.0.0.1:8546
pnpm tsx chains/ethereum/samples/websocket/subscribe-newheads.ts
pnpm tsx chains/ethereum/samples/websocket/subscribe-logs.ts
```

Both scripts reconnect with bounded exponential backoff. Production consumers should persist the last processed block and run `eth_getLogs` after reconnect.
