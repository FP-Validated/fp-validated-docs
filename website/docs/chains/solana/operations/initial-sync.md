---
title: Initial Sync
sidebar_position: 1
last_verified: 2026-05-28
---

Initial sync downloads and replays ledger data until the node can serve current slots. Keep RPC private until `getHealth` returns healthy and `getSlot` advances near the cluster.

```bash
curl -sS http://127.0.0.1:8899 -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1,"method":"getHealth"}'
```
