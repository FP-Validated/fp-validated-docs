---
title: Port Matrix
sidebar_position: 3
last_verified: 2026-07-03
---

This page is a public-safe reference for the currently documented supported chains. It is not live cluster inventory. The source of truth for names, ports, protocols, and default exposure is each chain metadata file, and rows here describe interface classes only — not internal service names, ingress backends, host placement, or private route topology.

| Chain | Port | Protocol | Purpose | Public? |
| --- | ---: | --- | --- | --- |
| Ethereum | 30303 | TCP/UDP | P2P discovery and peer traffic | Yes |
| Ethereum | 8545 | HTTP/TCP | Execution JSON-RPC HTTP | Yes, via gateway |
| Ethereum | 8546 | WebSocket/TCP | Execution JSON-RPC subscriptions | Yes, via gateway |
| Ethereum | 5052 | HTTP/TCP | Beacon API | No |
| Ethereum | 8551 | HTTP/TCP | Engine API between execution and consensus clients | No |
| Ethereum | 6060 | HTTP/TCP | Metrics/diagnostics | No |
| Sei | Chain-specific P2P | TCP | Peer traffic | Yes, where the node role requires public peers |
| Sei | Chain-specific RPC/API/gRPC | HTTP/gRPC/TCP | Validator and application interfaces | No by default; controlled public exposure only through policy |
| Sei | Chain-specific metrics | HTTP/TCP | Prometheus scrape target | No |
| Stable | Chain-specific P2P | TCP | Peer traffic | Yes, where the node role requires public peers |
| Stable | Chain-specific Cosmos/EVM RPC/API/WebSocket | HTTP/gRPC/WebSocket/TCP | Validator and application interfaces | No by default; controlled public exposure only through policy |
| Stable | Chain-specific metrics | HTTP/TCP | Prometheus scrape target | No |
| Initia | Chain-specific P2P | TCP | Peer traffic | Yes, where the node role requires public peers |
| Initia | Chain-specific RPC/API/gRPC | HTTP/gRPC/TCP | Validator and application interfaces | No by default; controlled public exposure only through policy |
| Initia | Chain-specific metrics | HTTP/TCP | Prometheus scrape target | No |
| Walrus | Chain-specific storage service | TCP/HTTP | Storage-node service surface | No by default; product exposure requires explicit policy |
| Walrus | Chain-specific metrics | HTTP/TCP | Prometheus scrape target | No |
| Canton | Chain-specific participant/synchronizer interfaces | HTTP/gRPC/TCP | Canton application and operator interfaces | No by default; controlled exposure only through policy |
| Canton | Chain-specific metrics | HTTP/TCP | Prometheus scrape target | No |
| Sui | 8080 | TCP | P2P traffic | Yes |
| Sui | 9000 | TCP | Full node gRPC | No |
| Sui | 9184 | TCP | Metrics | No |
| Aptos | 8080 | HTTP/TCP | Fullnode REST API | No |
| Aptos | 6180 | TCP | P2P traffic | Yes |
| Aptos | 9101 | HTTP/TCP | Metrics | No |
| Aptos | 50051 | gRPC/TCP | Transaction Stream | No |
| Solana | 8001 | UDP | Gossip | Yes |
| Solana | 8899 | HTTP/TCP | JSON-RPC HTTP | No |
| Solana | 8900 | WebSocket/TCP | RPC WebSocket PubSub | No |
| Solana | 9100 | HTTP/TCP | Metrics | No |

:::danger
Never expose metrics, Engine API, private gRPC streams, or admin-capable node APIs to the public Internet. If a port must be reachable outside the cluster, terminate through a gateway with explicit allowlists and rate limits.
:::
