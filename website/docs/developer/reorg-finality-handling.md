---
title: Reorg and Finality Handling
sidebar_position: 9
last_verified: 2026-05-28
---

Applications must distinguish latest data from finalized data. The exact model is chain-specific, but the shared rule is simple: do not make irreversible product decisions from data that the chain may still replace.

| Chain family | Practical model | Indexer behavior |
| --- | --- | --- |
| EVM execution chains | Blocks near the head can reorg; wait for confirmation depth or finalized consensus data when available | Store block hash and parent hash; roll back affected rows on reorg |
| Solana | Commitment levels describe observation strength: processed, confirmed, finalized ([Solana RPC](https://solana.com/docs/rpc)) | Choose commitment per use case; reconcile lower-commitment data against finalized slots |
| Sui | Checkpoint-oriented finality for committed data; APIs include gRPC and GraphQL paths ([Sui gRPC](https://docs.sui.io/develop/accessing-data/grpc)) | Use checkpoint cursors and idempotent writes |
| Aptos | BFT finality for committed ledger versions; APIs expose ledger/version concepts ([Aptos REST](https://aptos.dev/rest-api)) | Persist ledger version cursor and resume from last committed version |

```sql
CREATE TABLE indexed_blocks (
  height bigint PRIMARY KEY,
  block_hash text NOT NULL,
  parent_hash text,
  finalized boolean NOT NULL DEFAULT false
);
```

:::warning Head data is provisional
Showing a pending balance or event is fine if the UI labels it as pending. Crediting funds, triggering payouts, or deleting compensating state should wait for the product's finality threshold.
:::

Indexers should write deterministic transformations, keep enough raw identifiers to undo or dedupe, and expose finality state to downstream consumers instead of hiding it.
