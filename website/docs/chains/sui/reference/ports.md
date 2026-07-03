---
title: Ports
sidebar_position: 1
last_verified: 2026-05-28
---

# Ports

| Port | Name | Public | Purpose |
| --- | --- | --- | --- |
| `8080/tcp` | P2P | Yes | Network peer traffic. |
| `9000/tcp` | gRPC | No | Full node gRPC over HTTP/2 for backend clients and indexers. |
| GraphQL HTTPS | GraphQL RPC | Optional | Public or partner read API through a gateway. |
| JSON-RPC HTTP | JSON-RPC | No | Deprecated legacy compatibility only until migration. |
| `9184/tcp` | Metrics | No | Prometheus scrape endpoint. |

:::warning
Only P2P is public by default. Treat every API port as private until the exposure policy is implemented.
:::
