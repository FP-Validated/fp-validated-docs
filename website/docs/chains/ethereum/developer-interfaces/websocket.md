---
title: JSON-RPC WebSocket
sidebar_position: 3
last_verified: 2026-05-28
---

Geth supports JSON-RPC over WebSocket on default port 8546, and WebSocket is the right transport for `eth_subscribe` event subscriptions such as `newHeads` and `logs` per [Geth RPC docs](https://geth.ethereum.org/docs/interacting-with-geth/rpc).

```json
{"jsonrpc":"2.0","id":1,"method":"eth_subscribe","params":["newHeads"]}
```

For contract logs, subscribe with an address and topic filter:

```json
{"jsonrpc":"2.0","id":2,"method":"eth_subscribe","params":["logs",{"address":"0x1111111111111111111111111111111111111111","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"]}]}
```

:::tip Reconnect rule
Subscriptions are not durable. On disconnect, reconnect with exponential backoff, resubscribe, then backfill missed blocks with `eth_getLogs` from the last processed block plus one.
:::

Use WebSocket for streaming; use HTTP for deterministic backfill and retries.
