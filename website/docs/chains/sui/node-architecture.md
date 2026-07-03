---
title: Node Architecture
sidebar_position: 2
last_verified: 2026-05-28
---

# Sui node architecture

A production Sui full node has three operator-facing planes: consensus/network ingestion, local execution and storage, and developer API serving.

## Data flow

| Plane | Responsibility | Operator checks |
| --- | --- | --- |
| P2P | Receives checkpoints, transactions, and state synchronization traffic from the Sui network. | Keep `8080/tcp` reachable from peers and monitor peer count. |
| Execution and storage | Verifies checkpoints, stores objects, transactions, effects, and indexes needed by API services. | Put database volumes on durable low-latency disks and snapshot only with a consistent procedure. |
| API serving | Serves gRPC, GraphQL RPC, metrics, and any legacy JSON-RPC during migration. | Bind public and private surfaces deliberately; protect gRPC and metrics from the open internet. |

Sui's recommended data-access direction is gRPC and GraphQL RPC rather than JSON-RPC; the [Sui API reference](https://docs.sui.io/references/sui-api) documents JSON-RPC deprecation and the July 2026 migration deadline.

## Interface placement

```text
Internet clients ──TLS/WAF/rate limit── GraphQL RPC gateway ── Sui full node
Backend jobs  ──private network/mTLS── gRPC :9000 ─────────── Sui full node
Prometheus    ──private scrape──────── metrics :9184 ──────── Sui full node
Peers         ──p2p :8080──────────────────────────────────── Sui full node
```

:::danger
Do not expose the raw full node gRPC or metrics listeners directly to the internet. gRPC includes transaction execution and streaming methods; metrics can reveal topology and load. Put them behind private networking, mTLS, or an authenticated gateway.
:::

## Runtime choices

Docker is suitable for a single host, Kubernetes for scheduled operations, Helm values for repeatable environments, and Argo CD for declarative promotion. Those are deployment methods only; the node interface contract remains the same across runtimes.
