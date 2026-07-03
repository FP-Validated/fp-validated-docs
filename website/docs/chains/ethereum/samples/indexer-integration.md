---
title: Indexer Integration
sidebar_position: 5
last_verified: 2026-05-28
---

A safe EVM indexer combines block polling, bounded log queries, and reorg handling.

```bash
export RPC_URL=http://127.0.0.1:8545
pnpm tsx chains/ethereum/samples/indexer/block-poll.ts
pnpm tsx chains/ethereum/samples/indexer/reorg-handling.ts
```

Strategy:

1. Poll `eth_blockNumber` and process blocks in order.
2. Query logs in bounded ranges.
3. Keep recent blocks provisional until enough confirmations or Beacon finality.
4. If a parent hash does not match the stored canonical chain, roll back affected blocks and replay.

Use Beacon API finality checkpoints from [beacon-APIs](https://github.com/ethereum/beacon-APIs) when your deployment has protected access to a consensus client.
