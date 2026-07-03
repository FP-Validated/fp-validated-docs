---
title: Resources
sidebar_position: 4
last_verified: 2026-05-28
---

# Resources

Size Sui nodes for sustained checkpoint ingestion, database growth, and API query load.

| Resource | Guidance |
| --- | --- |
| CPU | Leave headroom for checkpoint execution and API serving. |
| Memory | Watch cache pressure and OOM kills during sync. |
| Disk | Use durable SSD-backed volumes with growth alerts. |
| Network | Separate P2P throughput from public GraphQL traffic where possible. |

Use load tests from `/operations/load-testing` before publishing high-traffic GraphQL endpoints.
