---
title: Troubleshooting
sidebar_position: 6
last_verified: 2026-05-28
---

Triage Aptos incidents by interface. If REST is unhealthy, check process status, storage, and p2p sync. If GraphQL is stale, compare indexer checkpoint lag against fullnode ledger version. If Transaction Stream processors loop, inspect cursor commits and idempotency conflicts.

| Symptom | First check |
|---|---|
| REST timeout | Gateway logs, node process, port `8080` bind |
| Ledger not advancing | Peer count, p2p `6180`, disk saturation |
| GraphQL stale | Processor cursor vs REST ledger version |
| Duplicate rows | Unique key on transaction version/event index |
