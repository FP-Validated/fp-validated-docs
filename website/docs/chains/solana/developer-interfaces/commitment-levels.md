---
title: Commitment Levels
sidebar_position: 4
last_verified: 2026-05-28
---

Solana RPC methods accept commitment levels that trade freshness for finality ([Solana RPC docs](https://solana.com/docs/rpc)).

| Commitment | Difference | Use |
| --- | --- | --- |
| `processed` | The node has processed the block, but it may not be confirmed by the cluster. | Fast speculative UI and monitoring. |
| `confirmed` | The cluster has voted on the block and rollback risk is lower. | Default for balances, confirmations, and UX. |
| `finalized` | The block is rooted/final and should not be rolled back. | Accounting, payouts, durable indexer checkpoints. |

:::note
Use one commitment policy across HTTP reads and WebSocket subscriptions; write durable checkpoints at `finalized`.
:::
