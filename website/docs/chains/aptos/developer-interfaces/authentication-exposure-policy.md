---
title: Authentication and Exposure Policy
sidebar_position: 99
last_verified: 2026-05-28
---

Expose only the interfaces a product actually needs. Fullnode REST can be public through an API gateway; metrics and administration stay private; Transaction Stream gRPC and GraphQL should normally be partner/internal services unless a product explicitly sells them.

| Interface | Default exposure | Required controls |
|---|---|---|
| Fullnode REST `8080` | Public via gateway | TLS, auth or API keys, rate limits, request-size limits, WAF/logging |
| P2P `6180` | Public peer network | Network policy, DDoS controls, peer monitoring |
| Metrics `9101` | Private | Prometheus-only allowlist |
| Transaction Stream `50051` | Private/partner | mTLS or signed tokens, cursor quotas, backfill limits |
| Indexer GraphQL | Product-dependent | Query complexity limits, persisted queries for public APIs |

:::warning
Do not expose raw node ports just because the container listens on them. Publication is an API product decision, not a runtime default.
:::
