---
title: Indexer Design
sidebar_position: 5
last_verified: 2026-05-28
---

Design Aptos indexers as replayable systems. The Transaction Stream feed supplies ordered chain data; GraphQL serves read models derived from that data.

| Concern | Recommendation |
|---|---|
| Schema design | Store raw transaction version, event index, account address, object address, and Move type strings needed for replay/debugging. |
| Event processing | Decode only the modules/events the product owns; persist unknown raw metadata for later migration. |
| Idempotency | Use transaction version plus event index as a natural unique key. |
| Backfill | Run bounded ranges, publish ingestion lag, and keep live processing independent from historical repair jobs. |

:::tip
Make every processor safe to re-run from an older cursor. Operational recovery is much easier when duplicate delivery is a normal path.
:::
