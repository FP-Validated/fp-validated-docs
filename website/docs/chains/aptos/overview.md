---
title: Aptos
sidebar_position: 1
last_verified: 2026-05-28
chain: aptos
category: movevm
status: draft
supported_runtimes: [docker, kubernetes, helm, argocd]
developer_interfaces: [fullnode-rest, indexer-graphql, transaction-stream-grpc, faucet-api]
sample_languages: [bash, typescript, graphql]
---

Aptos is a MoveVM chain where operators commonly expose a fullnode REST endpoint for application traffic, keep node-to-node networking separate, and add indexing interfaces only when product queries need more than raw ledger/state access. The fullnode REST API is built into the fullnode and provides low-level state reads, transaction submission, and transaction simulation for client applications according to the [Aptos API documentation](https://aptos.dev/build/apis) and [Aptos REST API reference](https://aptos.dev/rest-api).

:::warning
Treat Aptos public RPC as an application edge. Put authentication, quotas, request-size limits, and egress monitoring in front of any internet-facing endpoint; see `/developer/rate-limiting` and `/operations/network-exposure`.
:::

| Area | Aptos operator choice |
|---|---|
| Primary node runtime | Docker, Kubernetes, Helm, Argo CD |
| Public app interface | Fullnode REST API on port `8080` |
| Indexing interface | Indexer GraphQL for NFTs, Aptos Objects, and custom Move queries |
| Streaming interface | Transaction Stream gRPC for historical and live transaction pipelines |
| Dev/test funding | Faucet API for devnet/test environment token minting only |

## Recommended topology

```text
client apps -> HTTPS/API gateway -> fullnode REST :8080
indexer processors -> Transaction Stream gRPC :50051 -> database -> GraphQL API
validators/fullnodes <-> p2p :6180
prometheus -> metrics :9101
```

Use REST for live wallet/app operations, GraphQL for product search/read models, and Transaction Stream gRPC when you own an indexing processor that must replay history and continue into real-time data.
