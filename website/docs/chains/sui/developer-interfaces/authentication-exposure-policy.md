---
title: Authentication and Exposure Policy
sidebar_position: 99
last_verified: 2026-05-28
---

# Authentication and exposure policy

| Endpoint | Public? | Required controls |
| --- | --- | --- |
| P2P `8080` | Yes | Host firewall limited to the expected protocol, DDoS protection, peer monitoring. |
| gRPC `9000` | No by default | Private network, mTLS or gateway auth, request deadlines, method-level logging. |
| GraphQL RPC | Optional | HTTPS, WAF, query complexity limits, pagination caps, API keys for partners, rate limits. |
| JSON-RPC | No for new users | Legacy allowlist only, migration owner, removal date before 2026-07. |
| Metrics `9184` | No | Prometheus-only network policy and no internet route. |

:::danger
Never publish metrics or unrestricted gRPC directly. `TransactionExecutionService` and streaming services are powerful backend APIs, and metrics reveal operational state.
:::

Link endpoint policy to shared controls in `/developer/authentication`, `/developer/rate-limiting`, and `/operations/incident-response`.
