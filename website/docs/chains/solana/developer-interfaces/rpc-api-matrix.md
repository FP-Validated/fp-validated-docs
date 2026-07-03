---
title: RPC/API Matrix
sidebar_position: 1
last_verified: 2026-05-28
---

Solana RPC is used for network state reads, transaction sending, transaction simulation, and live update subscriptions ([Solana RPC docs](https://solana.com/docs/rpc)).

| Interface | Status | Best For | Transport | Production Notes |
| --- | --- | --- | --- | --- |
| JSON-RPC HTTP | Standard | Reads, simulation, transaction submission, batch requests | HTTP | Use private/dedicated RPC, method allowlists, and rate limits. |
| WebSocket PubSub | Standard | Account, log, program, slot, and signature subscriptions | WebSocket | Bound connection counts and reconnect with backoff. |
| Commitment levels | Recommended | Choosing freshness vs finality for reads and confirmations | HTTP / WebSocket option | Use `confirmed` for most UX and `finalized` for accounting/indexing checkpoints. |

:::warning
Public RPC endpoints are shared dev/test infrastructure, not production capacity. Excess traffic can receive `429`; blocked traffic can receive `403`.
:::
