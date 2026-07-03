---
title: Performance Samples
sidebar_position: 5
last_verified: 2026-05-28
---

RPC performance depends on request shape, endpoint capacity, and data retention. Solana HTTP supports JSON-RPC request-response patterns documented in [Solana HTTP RPC docs](https://solana.com/docs/rpc/http).

| Pattern | Use |
| --- | --- |
| Batch request | Group independent lightweight reads. |
| Rate limit handling | Treat `429` as retryable capacity signal with jittered backoff. |
| RPC pool | Spread tenants across dedicated/private endpoints. |
| Archive retention | Confirm historical signature/account retention before backfills. |

```ts
const batch = [{ jsonrpc: "2.0", id: 1, method: "getSlot", params: [{ commitment: "confirmed" }] }, { jsonrpc: "2.0", id: 2, method: "getHealth" }];
```
