---
title: Resources
sidebar_position: 4
last_verified: 2026-05-28
---

Resource needs depend on network, pruning mode, archive requirements, and traffic.

| Profile | CPU | Memory | Disk | Use |
| --- | --- | --- | --- | --- |
| Full node | 4-8 vCPU | 16-32 GiB | 2+ TiB NVMe | General RPC and validator support. |
| High-traffic RPC | 8-16 vCPU | 32-64 GiB | 2+ TiB NVMe | Gateway-backed app traffic. |
| Archive/trace | 16+ vCPU | 64+ GiB | Many TiB NVMe | Historical state and tracing. |

Put indexers and heavy trace workloads on separate nodes so public reads do not starve consensus-critical clients.
