---
title: Troubleshooting
sidebar_position: 6
last_verified: 2026-05-28
---

Start from the failed plane.

| Symptom | Likely cause | Check |
| --- | --- | --- |
| `eth_blockNumber` stale | Execution sync lag or no consensus updates | `eth_syncing`, consensus logs, Engine auth. |
| Consensus synced but execution not updating | Engine API/JWT mismatch | Engine endpoint URL and shared JWT file. |
| WebSocket drops | Gateway idle timeout or client restart | Reconnect logs and backfill range. |
| `eth_getLogs` timeout | Range too large or archive data missing | Reduce block span; verify archive requirements. |
| Beacon API 403/404 through gateway | Protected route or wrong base path | Query local protected port 5052. |

Prefer fixing endpoint policy and sync health over retry loops that hide node failures.
