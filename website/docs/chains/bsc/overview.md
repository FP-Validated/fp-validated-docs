---
title: BSC Overview
sidebar_position: 1
last_verified: 2026-07-03
---

# BSC Overview

FP Validated supports BSC as a public-safe managed EVM RPC surface for application traffic.

## Support scope

- Supported consumers: wallets, dapps, explorers, indexers, and backend services that need chain reads, transaction simulation, or transaction submission.
- Supported interfaces: Ethereum-compatible JSON-RPC over HTTP and, where enabled, WebSocket subscriptions.
- Not in scope: validator operations, consensus APIs, admin/debug/trace methods, raw node ports, or private node-to-node networking.
- This page documents the external RPC contract only; deeper protocol- or client-specific runbooks live in the pages below.

This runtime verification note confirms that the compose-served web shell is consuming updates from the pushed docs repository.

## Interface surface

| Interface | Use it for | Operator stance |
| --- | --- | --- |
| JSON-RPC HTTP | Reads, transaction submission, simulation, and stateless service calls | Primary application API; expose only through a controlled gateway. |
| JSON-RPC WebSocket | Subscriptions and live updates | Treat as streaming traffic; cap connections and idle sessions. |

Execution-layer JSON-RPC is the standard application interface for EVM chains. Keep public method exposure to the minimum required by the caller, and keep expensive namespaces such as debug, trace, admin, personal, and node-management methods off public endpoints.

## Exposure model

Public access should terminate at a controlled edge that enforces TLS, authentication or API keys where required, request-size limits, method allowlists, rate limits, and logging. Use the shared guidance in [API Design Principles](/developer/api-design-principles), [RPC Exposure Policy](/operations/rpc-exposure-policy), [Rate Limiting](/developer/rate-limiting), and [Security Standards](/operations/security-standards).

## Chain tree

- [Developer Interfaces](./developer-interfaces/rpc-api-matrix)
- [Operations](./operations/monitoring)
  - [Public RPC Operations](./operations/public-rpc-operations)
- [Reference](./reference/ports)

## Documentation boundary

This page is the entry point for the BSC RPC surface. The subpages stay public-safe and document only the managed application edge; backend routing, raw node ports, peer networking, and admin channels are intentionally omitted.
