---
title: Public vs Private Endpoint
sidebar_position: 3
last_verified: 2026-05-28
---

Separate endpoints by trust boundary. A public endpoint is for untrusted application traffic. A private endpoint is for internal services and known partners. An admin endpoint is for operators only and should not share routing, credentials, or node pools with application traffic.

| Class | Typical callers | Allowed examples | Must not include |
| --- | --- | --- | --- |
| Public RPC | Wallets, explorers, dapps, sample apps | Read-only JSON-RPC, REST, GraphQL, WebSocket subscriptions with limits | Admin, debug, trace, validator, metrics, Engine API |
| Private RPC | Indexers, backend services, trusted partners | Higher quotas, historical reads, simulation, transaction submit | Unauthenticated internet access |
| Admin RPC | Operators and automation | Node management, peer control, unsafe debugging | Browser or partner access |
| Consensus/internal API | Co-located node components | Ethereum Engine API, protected Beacon API, validator coupling | Shared API gateway routes |

Ethereum execution clients expose application JSON-RPC separately from the Engine API defined in the execution APIs ([Execution APIs](https://github.com/ethereum/execution-apis)). The Engine API is authenticated with JWT and belongs on an internal network. Beacon APIs are useful for validators and monitoring, but the upstream specification explicitly targets consensus data and should be protected rather than broadly exposed ([Beacon API](https://github.com/ethereum/beacon-APIs)).

Solana public RPC is appropriate for development and read-heavy application use, but production systems should expect rate limits and should not rely on public RPC for guaranteed indexing completeness ([Solana RPC](https://solana.com/docs/rpc)). Sui and Aptos similarly separate public developer APIs from node operations and indexer-grade data paths ([Sui gRPC](https://docs.sui.io/develop/accessing-data/grpc), [Aptos APIs](https://aptos.dev/build/apis)).

:::danger Never expose admin by accident
Do not route wildcard paths or ports from a node pod/service to the internet. Explicitly enumerate public methods and upstream services.
:::
