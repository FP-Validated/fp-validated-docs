---
title: Indexer Samples
sidebar_position: 4
last_verified: 2026-05-28
---

A reliable indexer combines HTTP backfill and WebSocket live sync. Use `getSignaturesForAddress` for history, `logsSubscribe` for live events, slot tracking for ordering, and `finalized` for durable checkpoints.

| Concern | Pattern |
| --- | --- |
| Backfill | Page backwards with `before` cursors. |
| Live sync | Subscribe with `logsSubscribe`. |
| Slot tracking | Store slot with each event and reconcile gaps. |
| Finality | Process `confirmed`; commit permanent state at `finalized`. |

:::warning
WebSocket streams are not historical replay. Resume from HTTP cursors after restart.
:::
