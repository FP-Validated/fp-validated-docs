---
title: RPC API Matrix
sidebar_position: 2
last_verified: 2026-07-03
---

This page is intended to be generatable from `chains/<chain>/metadata.yaml` via `scripts/generate-rpc-matrix.ts`. Until generated output is wired into CI, keep it aligned with the metadata files. It covers both fully documented chain guides and additional supported public RPC/API surfaces where support is active.

| Chain | Interface | Transport | Port | Status | Public exposure | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Ethereum | JSON-RPC HTTP | HTTP | 8545 | Standard | Yes, behind an authenticated gateway | Standard execution RPC surface; see [Ethereum JSON-RPC](https://ethereum.org/developers/docs/apis/json-rpc/) and [Geth RPC ports](https://geth.ethereum.org/docs/interacting-with-geth/rpc). |
| Ethereum | JSON-RPC WebSocket | WebSocket | 8546 | Standard | Yes, behind an authenticated gateway | Subscription-capable execution RPC surface. |
| Ethereum | Beacon API | HTTP | 5052 | Standard-internal | No | Consensus client API; do not publish directly. See [Beacon APIs](https://github.com/ethereum/beacon-APIs). |
| Ethereum | Engine API | Authenticated HTTP/JWT | 8551 | Internal | No | Execution/consensus client coupling surface. See [Execution APIs](https://github.com/ethereum/execution-apis). |
| BSC | JSON-RPC HTTP | HTTP | Deployment-specific | Standard | Yes, behind a controlled gateway | Ethereum-compatible RPC exposure model. |
| BSC | JSON-RPC WebSocket | WebSocket | Deployment-specific | Standard | Yes, behind a controlled gateway | Subscription-capable EVM RPC surface. |
| Avalanche | JSON-RPC HTTP | HTTP | Deployment-specific | Standard | Yes, behind a controlled gateway | Ethereum-compatible RPC exposure model. |
| Avalanche | JSON-RPC WebSocket | WebSocket | Deployment-specific | Standard | Yes, behind a controlled gateway | Subscription-capable EVM RPC surface. |
| Polygon | JSON-RPC HTTP | HTTP | Deployment-specific | Standard | Yes, behind a controlled gateway | Ethereum-compatible RPC exposure model. |
| Polygon | JSON-RPC WebSocket | WebSocket | Deployment-specific | Standard | Yes, behind a controlled gateway | Subscription-capable EVM RPC surface. |
| Arbitrum | JSON-RPC HTTP | HTTP | Deployment-specific | Standard | Yes, behind a controlled gateway | Ethereum-compatible RPC exposure model. |
| Arbitrum | JSON-RPC WebSocket | WebSocket | Deployment-specific | Standard | Yes, behind a controlled gateway | Subscription-capable EVM RPC surface. |
| Optimism | JSON-RPC HTTP | HTTP | Deployment-specific | Standard | Yes, behind a controlled gateway | Ethereum-compatible RPC exposure model. |
| Optimism | JSON-RPC WebSocket | WebSocket | Deployment-specific | Standard | Yes, behind a controlled gateway | Subscription-capable EVM RPC surface. |
| Base | JSON-RPC HTTP | HTTP | Deployment-specific | Standard | Yes, behind a controlled gateway | Ethereum-compatible RPC exposure model. |
| Base | JSON-RPC WebSocket | WebSocket | Deployment-specific | Standard | Yes, behind a controlled gateway | Subscription-capable EVM RPC surface. |
| Sui | gRPC | gRPC | 9000 | Recommended | No by default | Preferred machine interface for full node data access; see [Sui gRPC](https://docs.sui.io/develop/accessing-data/grpc). |
| Sui | GraphQL RPC | HTTP | Chain deployment value | Recommended | Yes, through API gateway | Preferred app query surface; see [Sui GraphQL RPC](https://docs.sui.io/develop/accessing-data/graphql/graphql-rpc). |
| Sui | JSON-RPC | HTTP | Chain deployment value | Deprecated | Migration-only | Sui documents JSON-RPC as deprecated and directs users to migrate by 2026-07; see [Sui API references](https://docs.sui.io/references/sui-api). |
| Aptos | REST | HTTP | 8080 | Standard | No by default | Fullnode REST API; expose only through a controlled gateway. See [Aptos REST overview](https://aptos.dev/rest-api). |
| Aptos | GraphQL | HTTP | Deployment-specific | Standard | Gateway only | Indexer-backed API for richer queries; see [Aptos APIs](https://aptos.dev/build/apis). |
| Aptos | Transaction Stream | gRPC | 50051 | Standard | No | Streaming feed for processors/indexers. |
| Solana | JSON-RPC HTTP | HTTP | 8899 | Standard | No by default | Solana RPC HTTP methods; see [Solana RPC](https://solana.com/docs/rpc) and [HTTP methods](https://solana.com/docs/rpc/http). |
| Solana | JSON-RPC WebSocket / PubSub | WebSocket | 8900 | Standard | No by default | Subscription interface; see [Solana WebSocket methods](https://solana.com/docs/rpc/websocket). |
| Hyperliquid | Chain-specific API / RPC | Deployment-specific | Deployment-specific | Supported | Controlled public exposure only through gateway policy | Public support is active; overview and supporting API/RPC docs are now published. |
| Tempo | Chain-specific RPC | Deployment-specific | Deployment-specific | Supported | Controlled public exposure only through gateway policy | Public support is active; the detailed interface guide is not yet published here. |
:::warning
Treat every public RPC endpoint as an Internet-facing application. Put authentication, quotas, request-size limits, method filtering, TLS, and observability in front of the node process; do not publish internal client, metrics, or P2P control surfaces.
:::
