---
title: Monitoring
sidebar_position: 5
last_verified: 2026-05-28
---

Monitor client health at three layers: process, sync/finality, and interface latency.

| Signal | Source | Alert condition |
| --- | --- | --- |
| Execution head | `eth_blockNumber` | Stale versus upstream peers. |
| Execution sync | `eth_syncing` | Syncing unexpectedly returns object. |
| Consensus sync | `/eth/v1/node/syncing` | `is_syncing=true` on serving nodes. |
| Finality | Beacon finality checkpoints | Finalized epoch stalls. |
| RPC errors | Gateway/client metrics | Elevated 5xx, timeout, or rate-limit saturation. |

Expose metrics only to `/operations/monitoring` infrastructure, not the public internet.
