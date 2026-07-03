---
title: Resources
sidebar_position: 4
last_verified: 2026-05-28
---

Size Aptos fullnodes for sustained ledger growth and API traffic. Start with dedicated persistent SSD storage, multiple CPU cores, and enough memory for database/cache pressure; tune upward from observed p95 latency and sync lag.

| Workload | Starting point | Scale signal |
|---|---|---|
| Fullnode | 4 CPU / 16 GiB / 2 TiB SSD | REST p95, sync lag, storage growth |
| Indexer processor | 2 CPU / 8 GiB | checkpoint lag, decode latency |
| GraphQL | 2 CPU / 4 GiB | query latency, DB saturation |
