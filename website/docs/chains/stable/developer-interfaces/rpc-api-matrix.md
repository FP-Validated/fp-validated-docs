---
title: RPC / API Matrix
sidebar_position: 1
last_verified: 2026-05-29
---

# Stable RPC / API Matrix

Expose developer interfaces by use case, not by convenience. Validator internals and signer endpoints are private by default.

| Interface class | Typical use | Public posture |
| --- | --- | --- |
| P2P | Chain networking | Expose only the protocol-required peer surface. |
| RPC/API | Application reads, status checks, integration services | Prefer private access or managed gateway. |
| gRPC/WebSocket | Indexers, event streams, high-throughput consumers | Gatewayed and rate-limited where exposed. |
| Metrics | Operations and SLO monitoring | Private monitoring network only. |
| Signer/internal control | Validator safety | Never public. |

## Integration policy

- Public endpoints must have rate limiting and abuse controls.
- Internal endpoints must stay private.
- Indexer workloads should use dedicated API profiles when available.
- Application teams should consume stable gateway URLs, not validator pod or node addresses.
