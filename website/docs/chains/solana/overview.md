---
title: Solana / Agave
sidebar_position: 1
last_verified: 2026-05-28
chain: solana
category: svm
status: draft
supported_runtimes: [docker, kubernetes, helm, argocd]
developer_interfaces: [json-rpc-http, websocket-pubsub]
sample_languages: [curl, typescript]
---

Solana / Agave nodes expose validator operations plus developer RPC services for reading network state, sending transactions, simulating transactions, and live update subscriptions. The official [Solana RPC docs](https://solana.com/docs/rpc) describes RPC as the application interface for chain data and transaction submission.

:::warning Public RPC is development and testing infrastructure
Solana public RPC endpoints are shared infrastructure, not production backends. Public endpoint guidance documents `429` for excess request rate and `403` for blocked traffic; production services need dedicated/private RPC with quotas, authentication, and monitoring.
:::

| Area | Default | Purpose |
| --- | --- | --- |
| Gossip | `8001/udp` | Cluster peer discovery. |
| JSON-RPC HTTP | `8899/tcp` | Request-response reads, simulation, and transaction submit. |
| WebSocket PubSub | `8900/tcp` | Persistent account, log, program, slot, and signature subscriptions. |
| Metrics | `9100/tcp` | Internal Prometheus scrape endpoint. |

Read [node architecture](/chains/solana/node-architecture), choose interfaces in [RPC/API matrix](/chains/solana/developer-interfaces/rpc-api-matrix), and apply shared [Rate Limiting](/developer/rate-limiting) and [Monitoring Standards](/operations/monitoring-standards) practices.
