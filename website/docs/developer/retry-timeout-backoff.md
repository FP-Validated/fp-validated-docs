---
title: Retry, Timeout, and Backoff
sidebar_position: 8
last_verified: 2026-05-28
---

Every client needs a deadline, a retry budget, and a rule for whether the operation is safe to retry. Without those constraints, outages become retry storms and transaction submits become duplicate-risk events.

| Operation | Timeout | Retry? | Notes |
| --- | --- | --- | --- |
| Health check | Short | Yes | Retry with small budget; use for routing only. |
| Read latest state | Short to medium | Yes | Safe if caller accepts changing latest state. |
| Read historical state | Medium | Yes | Fail over only to nodes with required retention. |
| Simulation/dry-run | Medium | Yes | Input must be identical; cache by request hash when useful. |
| Transaction submit | Medium | Carefully | Retry only with duplicate detection and chain-specific semantics. |
| Admin operation | Explicit operator deadline | Usually no | Prefer manual confirmation and audit trail. |

Use exponential backoff with jitter. Stop when the caller's deadline expires, even if retry budget remains.

```ts
function nextDelayMs(attempt: number, baseMs = 250, capMs = 10_000): number {
  const exponential = Math.min(capMs, baseMs * 2 ** attempt);
  return Math.floor(exponential * (0.5 + Math.random()));
}
```

:::tip Idempotency first
Decide idempotency before writing retry code. Retrying a read is usually safe; retrying a transaction submit may create duplicates, replace a nonce, or hide an already-accepted transaction.
:::

Treat `429`, `503`, connection resets, and deadline exceeded as retryable only within policy. Treat validation errors, unauthorized responses, malformed requests, and method-not-found responses as non-retryable until the request changes.
