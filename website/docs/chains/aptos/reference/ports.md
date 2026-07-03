---
title: Ports
sidebar_position: 1
last_verified: 2026-05-28
---

| Port | Name | Public | Purpose |
|---:|---|---|---|
| 8080 | api | Gateway only | Fullnode REST API |
| 6180 | p2p | Yes | Aptos peer networking |
| 9101 | metrics | No | Prometheus metrics |
| 50051 | transaction-stream | No/partner | Transaction Stream gRPC |

:::warning
Public means intentionally reachable after firewall, gateway, and policy review. It does not mean bind the container directly to `0.0.0.0` without controls.
:::
