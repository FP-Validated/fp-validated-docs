---
title: Event Processing
sidebar_position: 11
last_verified: 2026-05-28
---

Event processors turn chain-native records into application facts. Correctness depends on decoding, ordering, deduplication, and finality state.

| Source | Decode using | Stable identity |
| --- | --- | --- |
| EVM logs | Contract ABI, topic0 event signature, indexed topics, data bytes | chain id, block hash, transaction hash, log index |
| Sui Move events | Move type plus BCS-decoded event payload where applicable | checkpoint, transaction digest, event sequence |
| Aptos events | Event type, account/module context, REST or indexer payload | ledger version, transaction hash, event index |
| Solana logs/account changes | Program id, instruction data, account keys, log line conventions | slot, signature, instruction/log index when available |

Ordering should be explicit. Do not rely on database insertion order or WebSocket arrival order. Persist the chain's ordering keys and sort by them when replaying.

```sql
CREATE UNIQUE INDEX events_source_uidx ON events (
  chain,
  source_height,
  transaction_id,
  event_index
);
```

:::warning Decode failures are data quality events
Do not silently drop undecodable events. Store the raw payload, decoder version, error, and source identity so the indexer can replay after an ABI, Move type, or parser update.
:::

Downstream systems should consume normalized events only after the indexer assigns a dedupe key and finality status.
