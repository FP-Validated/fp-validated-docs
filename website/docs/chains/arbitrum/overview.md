---
title: Arbitrum Overview
sidebar_position: 1
last_verified: 2026-07-03
---

# Arbitrum Overview

FP Validated supports Arbitrum as a managed EVM rollup RPC surface. Public access, when enabled, is exposed through the shared EVM gateway model rather than through raw node ports.

## Public-safe support boundary

| Area | Public guidance |
| --- | --- |
| Primary surface | Ethereum-compatible JSON-RPC HTTP for request/response traffic and JSON-RPC WebSocket for subscriptions and other long-lived clients. |
| Exposure model | Publish only through a controlled gateway with authentication, quotas, TLS, logging, and abuse monitoring. |
| Shared controls | Method allowlists, request-size limits, connection caps, idle timeouts, and tenant-aware rate limits belong in the gateway layer. |
| Deployment values | Exact ports, hostnames, client flags, and gateway topology are deployment-specific and intentionally omitted from this overview. |
| Internal surfaces | Peer networking, admin endpoints, metrics, and any client-control surfaces stay private. |

## Shared EVM gateway model

Use the shared EVM guidance from `/developer/api-design-principles`, `/operations/rpc-exposure-policy`, and `/operations/security-standards` when designing or operating Arbitrum endpoints. The supported interface set follows the same public exposure pattern documented in the [RPC / API Matrix](/reference/rpc-api-matrix) and the [Chain Matrix](/reference/chain-matrix).

The public contract is the EVM JSON-RPC surface, but the rollout, sync, and gateway implementation are deployment-managed. Keep any chain-specific method availability, retry behavior, and operational thresholds in the deployment runbook instead of publishing them on this page.

## Operational notes

- Treat WebSocket traffic as streaming and apply connection quotas and idle timeouts.
- Keep transaction submission behind the same gateway policy used for reads; do not publish a direct node port for client traffic.
- Use this page for support scope and exposure boundaries; use deployment manifests and runbooks for exact values.
