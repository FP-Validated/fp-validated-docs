---
title: WebSocket Scaling
sidebar_position: 7
last_verified: 2026-05-28
---

WebSocket RPC turns each client into a long-lived resource consumer. Capacity planning must account for open connections, subscriptions per connection, message fanout, heartbeat traffic, and reconnect storms.

| Concern | Gateway policy | Client policy |
| --- | --- | --- |
| Load balancing | Use sticky sessions when upstream subscription state is in-memory | Reconnect and resubscribe after disconnect |
| Connection count | Per-key and per-IP concurrent connection limits | Share connections inside one app process |
| Subscription count | Method-specific caps for logs, blocks, objects, or accounts | Subscribe narrowly and unsubscribe when unused |
| Heartbeats | Idle timeout plus ping/pong or app-level heartbeat | Detect dead connections before sending critical work |
| Reconnect storms | Jittered retry and admission limits | Exponential backoff with jitter |

Ethereum clients commonly use WebSocket for `eth_subscribe` over port 8546 ([Geth RPC](https://geth.ethereum.org/docs/interacting-with-geth/rpc)). Solana exposes WebSocket methods such as `logsSubscribe` and account subscriptions ([Solana WebSocket](https://solana.com/docs/rpc/websocket)). Sui exposes subscription-oriented services, including the gRPC SubscriptionService in its fullnode protocol surface ([Sui Full Node gRPC methods](https://docs.sui.io/references/fullnode-protocol)).

```ts
const reconnectDelayMs = Math.min(30_000, 500 * 2 ** attempt) * (0.5 + Math.random());
```

:::warning Streaming is not indexing by itself
Subscriptions can drop, reconnect, or miss messages during failover. Persist cursors and reconcile with polling or checkpoint reads for durable indexers.
:::

For durable pipelines, combine WebSocket or gRPC streams with [/developer/indexer-architecture](/developer/indexer-architecture).
