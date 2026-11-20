---
title: Sui
sidebar_position: 1
last_verified: 2026-05-28
chain: sui
category: movevm
status: draft
supported_runtimes: [docker, kubernetes, helm, argocd]
developer_interfaces: [grpc, graphql-rpc, json-rpc]
sample_languages: [grpcurl, typescript, graphql]
---

# Sui node operations and developer interfaces

Sui is a MoveVM-based chain where operators expose full node data to wallets, backend services, indexers, and analytics systems. This guide focuses on running the node surface safely and wiring applications to the right API.

:::warning JSON-RPC migration deadline
Sui JSON-RPC is deprecated. Operators and application teams should migrate production integrations to gRPC or GraphQL RPC before the July 2026 removal deadline documented in the [Sui API reference](https://docs.sui.io/references/sui-api).
:::

:::tip Staking SUI
To delegate SUI to FP Validated, see [Stake SUI](/staking/sui).
:::

## Interface strategy

| Interface | Use it for | Operator stance |
| --- | --- | --- |
| gRPC | Backend services, indexers, low-latency object lookup, transaction submission, simulation, streaming subscriptions | Preferred private application API on HTTP/2 port `9000`; expose only through controlled gateways. |
| GraphQL RPC | Frontend reads, analytics, flexible historical query, object/address/transaction exploration | Preferred public read API when rate-limited and cached. |
| JSON-RPC | Existing legacy clients only | Keep compatibility windows short; migrate callers to gRPC or GraphQL RPC. |

Sui full node gRPC replaces the JSON-RPC surface and publishes protocol buffer services including `LedgerService`, `StateService`, `TransactionExecutionService`, and `SubscriptionService` in the [Full Node gRPC protocol reference](https://docs.sui.io/references/fullnode-protocol). GraphQL RPC is documented separately as a query-oriented interface in the [Sui GraphQL RPC guide](https://docs.sui.io/develop/accessing-data/graphql/graphql-rpc).

## Repository layout

The companion sample repository under `chains/sui/` contains:

- `metadata.yaml` for inventory, ports, and required sample coverage.
- `samples/grpcurl/` shell scripts for direct full node gRPC calls.
- `samples/typescript-grpc/` TypeScript client patterns for object lookup, transaction dry-run/submission, and checkpoint streaming.
- `samples/graphql/` query documents for object, transaction, event, and pagination flows.
- `samples/event-indexer/` a TypeScript checkpoint/event pipeline modeled on the official [Sui real-time event indexer example](https://docs.sui.io/getting-started/examples/event-indexer).

## Operational links

- Start with [initial sync](/chains/sui/operations/initial-sync) before accepting traffic.
- Use [ports](/chains/sui/reference/ports) and [authentication and exposure policy](/chains/sui/developer-interfaces/authentication-exposure-policy) before publishing any endpoint.
- Put common rate limits, TLS, and client identity controls in shared platform layers such as `/developer/rate-limiting` and `/operations/ingress-hardening`.
