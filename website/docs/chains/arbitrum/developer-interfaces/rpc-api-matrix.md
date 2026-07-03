---
title: RPC/API Matrix
sidebar_position: 1
last_verified: 2026-07-03
---

# Arbitrum RPC/API Matrix

Arbitrum uses the shared EVM RPC gateway model for public access. This page set documents the exposed application interfaces and the public-safe boundary without publishing internal topology or client-control details.

| Interface | Status | Best for | Transport | Public-safe boundary |
| --- | --- | --- | --- | --- |
| JSON-RPC HTTP | Standard | Reads, state queries, transaction submission, and bounded batch requests | HTTP | Expose only through a controlled gateway with authentication, quotas, request-size limits, and method allowlists. |
| JSON-RPC WebSocket | Standard | Subscriptions and other long-lived clients | WebSocket | Treat as streaming traffic; cap concurrent connections, idle sessions, and reconnect storms. |
| Admin, debug, trace, and node-control surfaces | Internal | Maintenance, diagnostics, and operator workflows | varies | Keep private; never publish on a public RPC edge. |
| Metrics and health surfaces | Internal | Monitoring and alerting | varies | Keep behind private observability ingress or protected monitoring networks. |

::::warning Public exposure boundary
Do not route public traffic directly to node ports. Gateway controls belong in the edge layer, not in the client process: TLS, authentication or API keys where required, request-size limits, method allowlists, rate limits, logging, and abuse monitoring.
::::

## Supported public contract

- EVM-compatible application RPC is the supported public interface for this chain.
- Keep read-heavy and write-heavy traffic on the same policy baseline, but separate them operationally if capacity or blast radius requires it.
- Keep chain-control, admin, debug, trace, and metrics interfaces private.

## Documentation boundary

The public contract is Ethereum-compatible JSON-RPC for application traffic. Rollup control, node administration, metrics, and any other client-management surfaces stay private.

Use this page as the public interface map. Put exact ports, deployment topology, and client flags in internal runbooks.
