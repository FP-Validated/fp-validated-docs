---
title: Supported Chains
sidebar_position: 2
last_verified: 2026-05-28
---

# Supported chains

The MVP covers four chains. Each links to its full chain guide.

| Chain | Category | Primary interfaces | Status |
| --- | --- | --- | --- |
| [Ethereum / EVM](/chains/ethereum/overview) | EVM | JSON-RPC HTTP, JSON-RPC WebSocket, Beacon API | draft |
| [Sui](/chains/sui/overview) | MoveVM | gRPC, GraphQL RPC (JSON-RPC deprecated) | draft |
| [Aptos](/chains/aptos/overview) | MoveVM | Fullnode REST, Indexer GraphQL, Transaction Stream gRPC | draft |
| [Solana / Agave](/chains/solana/overview) | SVM | JSON-RPC HTTP, WebSocket PubSub | draft |

## Adding more chains

New chains follow the [New Chain Template](/chains/new-chain-template) and the
[Add New Chain](/contributing/add-new-chain) checklist. Every chain MUST ship:

- An Overview + Node Architecture page
- A Deployment section (Docker, Kubernetes, Helm Values, ArgoCD as applicable)
- A Developer Interfaces section with an RPC / API Matrix
- A Samples section with the [required sample categories](/developer/sample-app-patterns)
- An Operations section and a Reference section
- A `metadata.yaml` conforming to the [schema](/contributing/add-new-chain)
