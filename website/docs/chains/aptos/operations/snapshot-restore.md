---
title: Snapshot Restore
sidebar_position: 2
last_verified: 2026-05-28
---

Use snapshot restore when bootstrap time is more important than replaying from genesis. Validate the snapshot source, restore into an empty data volume, then compare REST ledger info against an independent endpoint before accepting traffic.

:::warning
Never restore over a live data directory. Stop the node and preserve the previous volume until the replacement has served healthy traffic.
:::
