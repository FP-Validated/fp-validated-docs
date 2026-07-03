---
title: Event Indexer Sample
sidebar_position: 4
last_verified: 2026-05-28
---

# Event indexer sample

Sui publishes an official real-time event indexer example where a TypeScript backend subscribes to a checkpoint/gRPC stream, filters Move events, decodes BCS event data, and writes rows to Postgres in the [event indexer guide](https://docs.sui.io/getting-started/examples/event-indexer). The companion sample mirrors that pattern in `chains/sui/samples/event-indexer/`.

## Pipeline

```text
SubscriptionService checkpoint stream
  -> transaction/event extraction
  -> Move package/module/type filter
  -> BCS decode
  -> idempotent Postgres insert keyed by tx_digest + event_seq
```

Run the sample with:

```bash
cd chains/sui/samples/event-indexer
SUI_GRPC_ENDPOINT=http://127.0.0.1:9000 DATABASE_URL=postgres://sui:sui@localhost:5432/sui_events MOVE_EVENT_TYPE='0x2::coin::CoinMetadata' npx tsx indexer.ts
```

:::info
Persist the last committed checkpoint in the same database transaction as event writes. On restart, resume from `last_checkpoint + 1` to avoid gaps.
:::
