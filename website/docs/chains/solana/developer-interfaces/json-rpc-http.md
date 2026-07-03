---
title: JSON-RPC HTTP
sidebar_position: 2
last_verified: 2026-05-28
---

Solana HTTP RPC is JSON-RPC 2.0 over HTTP POST with `Content-Type: application/json`, documented in [Solana HTTP RPC docs](https://solana.com/docs/rpc/http). Use it for request-response state reads, simulation, and transaction submission.

```bash
curl -sS http://127.0.0.1:8899 -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","id":1,"method":"getSlot"}'
```

| Method | Use |
| --- | --- |
| `getHealth` | Health probe. |
| `getSlot` | Current slot. |
| `getBalance` | Lamports for an account. |
| `getAccountInfo` | Owner, lamports, executable flag, and data. |
| `getProgramAccounts` | Program-owned account scan; expensive without filters. |
| `simulateTransaction` | Preflight a signed transaction. |
| `sendTransaction` | Submit a signed serialized transaction. |

:::tip
Apply [/developer/rate-limiting](/developer/rate-limiting) to scans, batch calls, and send retries.
:::
