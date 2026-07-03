---
title: Ports
sidebar_position: 1
last_verified: 2026-05-28
---

| Port | Name | Protocol | Public | Purpose |
| ---: | --- | --- | --- | --- |
| 8001 | gossip | UDP | Yes | Cluster peer discovery. |
| 8899 | rpc | TCP | No | JSON-RPC HTTP. |
| 8900 | rpc-ws | TCP | No | WebSocket PubSub. |
| 9100 | metrics | TCP | No | Prometheus scrape. |

:::warning
Keep `8899`, `8900`, and `9100` off the public Internet.
:::
