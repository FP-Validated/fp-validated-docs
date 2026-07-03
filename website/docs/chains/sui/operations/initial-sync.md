---
title: Initial Sync
sidebar_position: 1
last_verified: 2026-05-28
---

# Initial Sync

Bring a Sui full node into service only after checkpoint lag, peer count, API health, and disk growth are understood.

```bash
# Pseudocode checks wired to your local metrics/query tooling
curl -sf http://127.0.0.1:9184/metrics | grep sui
bash chains/sui/samples/grpcurl/checkpoint.sh
```

:::warning
Do not add a newly syncing node to a production read pool. A live process can still be behind the network and return stale data.
:::

Track latest checkpoint freshness against a trusted upstream and expose readiness only when the lag is inside your SLO.
