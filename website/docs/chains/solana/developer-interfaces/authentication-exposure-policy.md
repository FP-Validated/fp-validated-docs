---
title: Authentication and Exposure Policy
sidebar_position: 99
last_verified: 2026-05-28
---

Raw Solana RPC is not a complete production access-control layer. Keep node listeners internal and place users behind a gateway that authenticates, authorizes, rate-limits, and logs requests.

:::warning Public RPC is dev/test only
Public Solana RPC endpoints are shared infrastructure. They are not production SLAs, may return `429` for excess traffic, and may return `403` for blocked traffic.
:::

| Surface | Exposure | Controls |
| --- | --- | --- |
| Gossip `8001/udp` | Public as required | Firewall where practical. |
| HTTP RPC `8899/tcp` | Private | Gateway auth, method allowlist, body limits, quotas. |
| WebSocket `8900/tcp` | Private | Connection caps, subscription caps, idle timeout. |
| Metrics `9100/tcp` | Internal only | Prometheus network policy. |

Use [Rate Limiting](/developer/rate-limiting) and [Security Standards](/operations/security-standards) for gateway policy.
