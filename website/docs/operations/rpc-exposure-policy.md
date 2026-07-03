---
title: RPC Exposure Policy
sidebar_position: 5
last_verified: 2026-05-28
---

This is the canonical exposure policy for FP Validated developer interfaces. Chain pages may add implementation details, but endpoint publication decisions should use the classes below.

## Exposure classes

| Class | Meaning | Required controls |
| --- | --- | --- |
| Public-safe with controls | May be reachable by external developers through a gateway. The interface is intended for client queries or transaction submission, but can still be abused. | TLS, WAF or gateway, method allowlist, rate limits, request-size limits, timeout, logging, abuse response, and no raw node port exposure. |
| Internal-only | Must stay on private networks for operators, indexers, or trusted backend services. | Private routing, firewall or network policy, no public DNS, Prometheus/logging, source allowlist. |
| Admin/authenticated | High-impact endpoint or method set that can change node behavior, reveal sensitive state, or access privileged consensus/client functions. | Strong identity, authorization, audit logging, narrow source networks, secret-backed auth, and explicit owner approval. |
| Streaming | Long-lived subscription, gRPC stream, WebSocket, transaction stream, or event feed. May be public or private only when combined with another class. | Connection caps, per-consumer quotas, idle timeout, backpressure, replay bounds, authentication for partners, and close monitoring. |

:::danger Raw node ports are not public products
Never publish raw node ports directly. Public developer access must go through an API gateway, reverse proxy, or managed edge that enforces the controls for the selected exposure class.
:::

## MVP chain interface classification

| Chain | Interface | Exposure class | Notes |
| --- | --- | --- | --- |
| Ethereum | JSON-RPC HTTP / WebSocket | Public-safe with controls; WebSocket is also Streaming | Public methods should be limited to safe `eth`, `net`, and `web3` usage. Keep debug, trace, admin, personal, and miner namespaces off public endpoints. See [Ethereum JSON-RPC](https://ethereum.org/developers/docs/apis/json-rpc/) and [Geth RPC](https://geth.ethereum.org/docs/interacting-with-geth/rpc). |
| Ethereum | Beacon API | Internal-only | Treat consensus-layer state and validator-adjacent APIs as protected backend interfaces. The Beacon API is defined in the [ethereum/beacon-APIs](https://github.com/ethereum/beacon-APIs) project. |
| Ethereum | Engine API | Admin/authenticated | Requires JWT between consensus and execution clients and must never be public. See [Execution APIs](https://github.com/ethereum/execution-apis). |
| Solana | JSON-RPC HTTP | Public-safe with controls for development and test access only | Do not treat shared public RPC as a production dependency. Apply method limits and quotas. See [Solana RPC](https://solana.com/docs/rpc) and [HTTP methods](https://solana.com/docs/rpc/http). |
| Solana | WebSocket PubSub | Streaming with public-safe controls for development and test access only | Cap subscriptions and connections; close idle clients. See [Solana WebSocket methods](https://solana.com/docs/rpc/websocket). |
| Sui | gRPC | Internal-only by default; Streaming when using server streams | Full node gRPC is powerful backend access and should be private unless a gateway adds auth, quotas, and method controls. See [Sui gRPC](https://docs.sui.io/develop/accessing-data/grpc) and [Full Node gRPC methods](https://docs.sui.io/references/fullnode-protocol). |
| Sui | GraphQL RPC | Public-safe with controls | Prefer GraphQL for public query access with query complexity, pagination, and rate limits. See [Sui GraphQL RPC](https://docs.sui.io/develop/accessing-data/graphql/graphql-rpc). |
| Sui | JSON-RPC | Internal-only or legacy authenticated access | Sui JSON-RPC is deprecated; migrate to gRPC or GraphQL by the published deadline in the [Sui API references](https://docs.sui.io/references/sui-api). |
| Aptos | REST API | Public-safe with controls | Apply gateway quotas and method-aware monitoring. See [Aptos APIs](https://aptos.dev/build/apis) and [REST overview](https://aptos.dev/rest-api). |
| Aptos | Indexer GraphQL | Public-safe with controls or Internal-only, depending on dataset | Public datasets still need query complexity limits and pagination caps; private analytics stay internal. |
| Aptos | Transaction Stream gRPC | Streaming and Internal-only by default | Treat as backend ingestion unless a partner product has explicit authentication, quotas, and replay limits. |

:::warning Public-safe does not mean unauthenticated by default
A public-safe interface can be offered to external users, but production endpoints should still use API keys, partner auth, or tenant-aware quotas when traffic is not fully anonymous by design.
:::

## Decision checklist

Before exposing an interface, answer:

1. Is this endpoint required by an external user journey, or only by operators and backends?
2. Does the endpoint stream, subscribe, replay, or hold long-lived connections?
3. Can any method mutate node state, access admin functions, reveal peers, expose metrics, or bypass normal transaction policy?
4. What method allowlist, query complexity limit, request body limit, and timeout apply?
5. Which dashboard and alert prove the endpoint is healthy and not being abused?
6. Which runbook disables or rate-limits the endpoint during an incident?

If any answer is unknown, keep the endpoint internal until the owner documents the controls.
