---
title: RPC/API Matrix
sidebar_position: 1
last_verified: 2026-05-28
---

Aptos exposes multiple application interfaces. The [Aptos API documentation](https://aptos.dev/build/apis) describes REST, Indexer GraphQL, Transaction Stream API, and Faucet API roles; the [Aptos REST API reference](https://aptos.dev/rest-api) documents the fullnode REST surface.

| Interface | Status | Best For | Transport | Production Notes |
|---|---|---|---|---|
| Fullnode REST API | Standard | Wallets, explorers, account/state reads, transaction simulation and submission | HTTP | Put behind HTTPS, authentication, quotas, and abuse monitoring; port `8080` is the node API. |
| Indexer GraphQL | Standard | NFT, Aptos Objects, and custom Move contract queries | HTTP | Serve from an indexer database; scale separately from fullnodes and document schema ownership. |
| Transaction Stream gRPC | Standard | Historical plus real-time transaction ingestion into processors | HTTP/2 | Protect cursor/checkpoint state and run idempotent processors with retry/backfill controls. |
| Faucet API | Standard | Devnet/test environment token minting | dev/test only | Never enable for production; apply strict quotas in shared test environments. |

:::info
Use REST for source-of-truth chain access and indexing interfaces for derived product data. Do not make GraphQL a hidden dependency for transaction submission.
:::
