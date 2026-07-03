---
title: gRPC
sidebar_position: 2
last_verified: 2026-05-28
---

# Sui gRPC

Sui gRPC is the preferred full node API for backend systems. The [Sui gRPC guide](https://docs.sui.io/develop/accessing-data/grpc) describes it as the replacement path for JSON-RPC data access, while the [Full Node gRPC protocol](https://docs.sui.io/references/fullnode-protocol) defines services such as `LedgerService`, `StateService`, `TransactionExecutionService`, and `SubscriptionService`.

## Service map

| Service | Typical call path | Use case |
| --- | --- | --- |
| `LedgerService` | checkpoint and transaction reads | Health checks, latest checkpoint, transaction lookup. |
| `StateService` | object lookup | Backend object reads and cache warmup. |
| `TransactionExecutionService` | dry-run, execute, submit | Simulation and transaction submission pipelines. |
| `SubscriptionService` | streaming checkpoints/events | Indexers and low-latency processors. |

:::info
Run gRPC on HTTP/2 port `9000` inside your trusted network. If an external team needs access, front it with a gateway that enforces TLS, client identity, quotas, and request logging.
:::

## Client behavior

- Set deadlines on every unary request.
- Reconnect streaming subscriptions with the last processed checkpoint.
- Persist submitted transaction digests before waiting for effects.
- Separate read pools from transaction submission pools so indexer load cannot starve writes.

See [gRPC samples](/chains/sui/samples/grpc) and the repository scripts under `chains/sui/samples/grpcurl/`.
