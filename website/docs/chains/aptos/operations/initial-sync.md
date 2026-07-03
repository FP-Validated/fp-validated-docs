---
title: Initial Sync
sidebar_position: 1
last_verified: 2026-05-28
---

Start with the official network configuration, sufficient disk headroom, and private metrics. Track peer count, synced version, REST ledger version, and storage growth until the node catches up.

```bash
curl -sS "$APTOS_NODE_URL" | jq '{chain_id, ledger_version, ledger_timestamp}'
```

Use `/operations/initial-sync` for shared alert thresholds and handoff criteria.
