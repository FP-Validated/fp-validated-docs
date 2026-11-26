---
title: Chain Matrix
sidebar_position: 1
last_verified: 2026-11-26
---

This matrix lists the chains with a guide on this site and the other networks FP Validated supports. A network without its own guide is listed with its support class only.

| Chain | Category / VM | Node types covered | Primary developer interfaces / operator surface | Production runtime | Status |
| --- | --- | --- | --- | --- | --- |
| [Ethereum](/chains/ethereum/overview) | EVM | Execution full node, consensus beacon node, archive/trace profile | JSON-RPC HTTP, JSON-RPC WebSocket, Beacon API, Engine API | Docker, Kubernetes, Helm, Argo CD | Draft |
| [Sei](/chains/sei/deployment-architecture) | Cosmos/EVM | Validator with local signer | P2P public. Metrics private. API endpoints off on the validator. | Kubernetes, Argo CD, Helm | Kubernetes reference pattern |
| [Stable](/chains/stable/deployment-architecture) | Cosmos/EVM | Validator with threshold signer | P2P public. RPC, EVM endpoints, metrics, and signer ports private. | Kubernetes, Argo CD, Helm | Kubernetes reference pattern |
| [Initia](/chains/initia/deployment-architecture) | Cosmos / MoveVM ecosystem | Validator with local signer and oracle sidecar | P2P public. Metrics private. API endpoints off on the validator. | Kubernetes, Argo CD, Helm | Kubernetes reference pattern |
| [Walrus](/chains/walrus/storage-node-guide) | Sui ecosystem storage | Storage node | Storage service, metrics, setup RPC/checkpoint dependencies | Kubernetes, Argo CD, Helm | Kubernetes reference pattern |
| [Canton](/chains/canton/validator-splice-ops) | Canton / Splice | Validator, participant, Postgres | Validator service, metrics, ingress/auth surfaces | Kubernetes, Argo CD multi-source Helm | Kubernetes reference pattern |
| [Sui](/chains/sui/overview) | MoveVM | Full node, API-serving full node, event/indexer-adjacent workloads | gRPC, GraphQL RPC, JSON-RPC migration path | Docker, Kubernetes, Helm, Argo CD | Draft |
| [Aptos](/chains/aptos/overview) | MoveVM | Fullnode, indexer processor, GraphQL/API serving tier | REST, GraphQL indexer, Transaction Stream gRPC | Docker, Kubernetes, Helm, Argo CD | Draft |
| [Solana](/chains/solana/overview) | SVM | Validator/RPC node, private RPC node, WebSocket PubSub endpoint | JSON-RPC HTTP, WebSocket PubSub | Docker, Kubernetes, Helm, Argo CD | Draft |
| LayerZero | Messaging / DVN | DVN-style verification service | Verification traffic and operator-managed support surface | Managed runtime | Supported, overview and supporting docs published |
| BSC | EVM | RPC service surface | JSON-RPC HTTP, WebSocket through shared EVM gateway model | Managed runtime | Supported RPC surface |
| Hyperliquid | Chain-specific API / RPC | RPC or API service surface | Public-safe gatewayed API/RPC surface | Managed runtime | Supported, overview and supporting docs published |
| Avalanche | EVM | RPC service surface | JSON-RPC HTTP, WebSocket through shared EVM gateway model | Managed runtime | Supported RPC surface |
| Polygon | EVM | RPC service surface | JSON-RPC HTTP, WebSocket through shared EVM gateway model | Managed runtime | Supported RPC surface |
| Arbitrum | EVM rollup | RPC service surface | JSON-RPC HTTP, WebSocket through shared EVM gateway model | Managed runtime | Supported RPC surface |
| Optimism | EVM rollup | RPC service surface | JSON-RPC HTTP, WebSocket through shared EVM gateway model | Managed runtime | Supported RPC surface |
| Base | EVM rollup | RPC service surface | JSON-RPC HTTP, WebSocket through shared EVM gateway model | Managed runtime | Supported RPC surface |
| Tempo | Chain-specific RPC | RPC service surface | Gatewayed RPC interface surface | Managed runtime | Supported, guide not yet published |
| Injective | Cosmos | Validator | P2P on the validator | Kubernetes, Argo CD, Helm | Supported, [staking guide](/staking/injective) only |
| Monad | EVM | Validator | P2P on the validator | Kubernetes, Argo CD, Helm | Supported, [staking guide](/staking/monad) only |
| Stacks | Bitcoin layer | Signer | P2P | Kubernetes, Argo CD, Helm | Supported, [staking guide](/staking/stacks) only |

:::note
Use this page to compare capabilities. Use each chain page for concrete manifests, flags, and runbooks because safe defaults differ by protocol.
:::
