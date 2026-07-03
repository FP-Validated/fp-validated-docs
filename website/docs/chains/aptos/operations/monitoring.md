---
title: Monitoring
sidebar_position: 5
last_verified: 2026-05-28
---

Monitor the node, API gateway, and indexer pipeline together. Core signals: REST availability, ledger version freshness, p2p peers, storage growth, CPU/memory, metrics scrape success, transaction-stream lag, GraphQL latency, and error rates.

```bash
curl -fsS "$APTOS_NODE_URL" >/dev/null
```

Link dashboard and paging policy to `/operations/monitoring`.
