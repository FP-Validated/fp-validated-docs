---
title: Helm Values
sidebar_position: 3
last_verified: 2026-05-28
---

Keep image tag, ledger PVC size, resource requests, RPC exposure, and method policy explicit in values.

```yaml
image:
  repository: solanalabs/solana
  tag: stable
rpc:
  enabled: true
  port: 8899
  websocketPort: 8900
  public: false
gossip:
  port: 8001
  public: true
metrics:
  port: 9100
```
