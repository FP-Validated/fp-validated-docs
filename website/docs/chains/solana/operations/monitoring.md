---
title: Monitoring
sidebar_position: 5
last_verified: 2026-05-28
---

Monitor slot lag, `getHealth`, HTTP latency, WebSocket connection count, subscription count, error rate, `429`, `403`, disk, file descriptors, and CPU.

```bash
curl -sS http://127.0.0.1:8899 -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1,"method":"getSlot","params":[{"commitment":"confirmed"}]}'
```

Send dashboards to [Monitoring Standards](/operations/monitoring-standards).
