---
title: RPC / API Matrix
sidebar_position: 1
last_verified: 2026-07-03
---

Execution-layer JSON-RPC is the public application interface for BSC. Method semantics follow Ethereum JSON-RPC and the execution APIs, so this page stays focused on exposure decisions rather than protocol details. See the shared [RPC Exposure Policy](/operations/rpc-exposure-policy) and the Ethereum [RPC / API Matrix](/chains/ethereum/developer-interfaces/rpc-api-matrix) for the canonical interface classification.

::::danger Public-safe boundary
Do not publish raw node ports, node-management namespaces, debug/trace/admin methods, or backend-specific routing details on a public route.
::::

## Supported interfaces

| Interface | Status | Best for | Transport | Production notes |
| --- | --- | --- | --- | --- |
| JSON-RPC HTTP | Standard | Reads, simulation, and transaction submission | HTTPS on a controlled gateway; conventional upstream port 8545 | Public-safe with controls. Limit methods, bound request size, and enforce timeouts. |
| JSON-RPC WebSocket | Standard | `eth_subscribe` streams for heads and logs | WSS on a controlled gateway; conventional upstream port 8546 | Streaming interface. Cap connections, idle time, and reconnect storms. |

## Public method posture

Keep the public method set as small as the product allows. Safe read and submit methods such as `eth_blockNumber`, `eth_call`, `eth_getBalance`, `eth_getLogs`, and `eth_sendRawTransaction` are the usual foundation. Anything that reveals peers, trace data, or node management behavior belongs behind an authenticated or internal boundary.

## Operational guidance

- Prefer separate upstream pools for public reads and trusted backend traffic.
- Keep WebSocket subscriptions bounded by connection count, idle timeout, and replay rules.
- Treat batch requests and large log scans as controlled workloads, not unlimited convenience features.
- Use shared endpoint controls for authentication, rate limiting, and logging.
