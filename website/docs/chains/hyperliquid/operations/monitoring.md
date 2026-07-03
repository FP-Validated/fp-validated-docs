---
title: Monitoring
sidebar_position: 1
last_verified: 2026-07-03
---

Monitor the managed API/RPC surface at the edge and the service behind it. Public support is healthy only when consumers can reach the published contract without revealing private detail.

## Operational signals

| Signal | What it indicates | Typical response |
| --- | --- | --- |
| Request latency | The managed surface is slowing down or saturating. | Check gateway saturation, backend health, and upstream dependency load. |
| Error rate | The published contract is failing or being misused. | Review policy enforcement, request shape, and deployment health. |
| Authentication failures | Consumers are not using the documented access path. | Verify credentials, gateway rules, and published client guidance. |
| Rate-limit saturation | The public edge is under sustained load. | Tune quotas, add caching where appropriate, or scale capacity. |
| Service restarts or unhealthy instances | The support surface is not stable. | Investigate runtime health and coordinate rollout or rollback. |

## Monitoring boundary

- Keep dashboards and metrics internal; do not expose them to public consumers.
- Avoid publishing private addresses, backend service names, or cluster membership in alerts.
- Use [Monitoring Standards](/operations/monitoring-standards) and [Common Runbooks](/operations/common-runbooks) for shared observability and incident handling.

::::warning Public-safe boundary
Observability should prove the managed API/RPC surface is healthy without revealing how it is wired internally. Do not publish raw traces, node identities, or deployment topology.
::::
