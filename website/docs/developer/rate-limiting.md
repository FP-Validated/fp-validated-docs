---
title: Rate Limiting
sidebar_position: 4
last_verified: 2026-05-28
---

Rate limits protect nodes from overload and give clients predictable failure semantics. Apply limits at the gateway before a request reaches the node process.

| Limit dimension | Why | Example policy |
| --- | --- | --- |
| Per API key | Fairness between customers and services | 100 requests/second with burst 200 |
| Per source IP | Abuse control before authentication or for public tiers | 20 requests/second with burst 40 |
| Per method | Expensive calls need lower budgets | Lower batch, trace, simulation, historical range limits |
| Per batch | Prevent a single JSON-RPC request from hiding huge work | Maximum 20 calls or 1 MiB body |
| Per WebSocket connection | Subscription fanout protection | Maximum connections, subscriptions, and messages/minute |

Token bucket is the usual model: tokens refill at a steady rate, bursts consume saved tokens, and empty buckets return `429 Too Many Requests`.

```ts
type RateLimitDecision =
  | { allowed: true; remaining: number }
  | { allowed: false; status: 429; retryAfterSeconds: number };
```

Clients must treat `429` as a backpressure signal, not as a reason to retry immediately. Honor `Retry-After` when present and otherwise use exponential backoff with jitter. Solana public RPC clients may also see rate-limit or access-control failures such as `429` and `403`; production clients should move sustained workloads to a private endpoint rather than escalating retry pressure ([Solana RPC](https://solana.com/docs/rpc)).

:::warning Batch limits are rate limits
A single JSON-RPC batch can be more expensive than many small calls. Count both the HTTP request and each operation inside the batch.
:::

See [/developer/retry-timeout-backoff](/developer/retry-timeout-backoff) for client behavior after throttling.
