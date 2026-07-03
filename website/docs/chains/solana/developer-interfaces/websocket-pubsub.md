---
title: WebSocket PubSub
sidebar_position: 3
last_verified: 2026-05-28
---

Solana WebSocket RPC provides subscription methods over a persistent connection, documented in [Solana WebSocket RPC docs](https://solana.com/docs/rpc/websocket).

| Method | Best for |
| --- | --- |
| `accountSubscribe` | Watching one account. |
| `logsSubscribe` | Streaming transaction logs. |
| `programSubscribe` | Watching accounts owned by a program. |
| `slotSubscribe` | Tracking slot progression. |
| `signatureSubscribe` | Waiting for a transaction signature. |

```ts
import WebSocket from 'ws';
const ws = new WebSocket(process.env.SOLANA_WS_URL ?? 'ws://127.0.0.1:8900');
ws.on('open', () => ws.send(JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'slotSubscribe' })));
```

:::warning
Subscriptions are not durable queues. Combine HTTP backfill with live sync.
:::
