---
title: WebSocket Samples
sidebar_position: 3
last_verified: 2026-05-28
---

WebSocket samples cover `accountSubscribe`, `logsSubscribe`, `programSubscribe`, and `signatureSubscribe`, documented in [Solana WebSocket RPC docs](https://solana.com/docs/rpc/websocket). They reconnect with exponential backoff because subscriptions are connection-scoped.

```ts
const request = { jsonrpc: "2.0", id: 1, method: "signatureSubscribe", params: [signature, { commitment: "confirmed" }] };
```

:::note
Persist highest processed slot outside the WebSocket client and backfill after reconnect.
:::
