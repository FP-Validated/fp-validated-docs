---
title: Monitoring
sidebar_position: 1
last_verified: 2026-07-03
---

LayerZero monitoring should focus on whether the published verification workflow is healthy, whether requests are flowing, and whether the service is staying within its public contract.

## Operational signals

| Signal | What it indicates | Typical response |
| --- | --- | --- |
| Verification lag | Requests are backing up or taking too long to complete. | Check queue pressure, dependency health, and gateway saturation. |
| Failed verification attempts | The published workflow is rejecting traffic or seeing repeated invalid inputs. | Review request quality, upstream changes, and policy enforcement. |
| Gateway errors | The public edge is unhealthy or overloaded. | Check auth, quotas, TLS, request sizing, and rate-limit settings. |
| Service restarts or unhealthy workers | The support surface is not stable enough to serve traffic. | Investigate runtime health and roll forward or rollback as appropriate. |

## Monitoring boundary

- Expose metrics only to internal observability systems, not to public consumers.
- Keep dashboards free of private addresses, internal hostnames, and sensitive request payloads.
- Use [Monitoring Standards](/operations/monitoring-standards) and [Common Runbooks](/operations/common-runbooks) for shared alerting and incident response expectations.

::::warning Public-safe boundary
Do not publish raw tracing, worker identifiers, or internal queue topology. Monitoring should prove the supported verification service is healthy without revealing how it is wired internally.
::::
