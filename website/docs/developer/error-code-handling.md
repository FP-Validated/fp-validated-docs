---
title: Error Code Handling
sidebar_position: 13
last_verified: 2026-05-28
---

Error handling should classify failures by caller action: retry later, change request, fail over, wait for sync, or escalate operationally.

| Class | Examples | Client action |
| --- | --- | --- |
| Timeout or connection reset | Deadline exceeded, TCP reset, gateway timeout | Retry within budget with backoff; then surface unknown status. |
| Rate limit | HTTP 429, quota exceeded | Honor Retry-After; reduce concurrency. |
| Unauthorized/forbidden | HTTP 401/403, invalid key, disallowed method | Do not retry unchanged; fix credentials or policy. |
| JSON-RPC protocol | `-32700` parse error, `-32600` invalid request, `-32601` method not found, `-32602` invalid params, `-32603` internal error | Fix request for client errors; retry internal errors only within budget. |
| Stale or lagging node | Block not found, minimum slot not reached, stale checkpoint, node behind | Fail over to healthier node or wait. |
| Retention/history | Pruned block, unavailable slot, old ledger version | Use archive/indexer endpoint; do not retry hot public RPC indefinitely. |
| Transaction rejected | Insufficient funds, invalid signature, simulation failure | Do not retry until transaction changes. |

```ts
type ErrorAction = 'retry' | 'fix_request' | 'failover' | 'wait_for_sync' | 'use_archive' | 'escalate';
```

:::warning Unknown submit status
A timeout after transaction submission is not proof of failure. Check chain state before resubmitting.
:::

Expose normalized error categories to application code while preserving raw node responses for debugging.
