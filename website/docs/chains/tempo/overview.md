---
title: Tempo Overview
sidebar_position: 1
last_verified: 2026-07-03
---

# Tempo Overview

FP Validated supports Tempo as a managed RPC surface. Tempo is documented here as a chain-specific RPC service with gatewayed public access; the detailed interface guide is not published yet.

## Public-safe support boundary

| Area | Public guidance |
| --- | --- |
| Primary surface | Chain-specific RPC for application traffic. The exact transport and method set are deployment-specific. |
| Exposure model | Publish only through a controlled gateway with authentication, quotas, TLS, logging, and abuse monitoring. |
| Shared controls | Method filtering, request-size limits, connection caps, idle timeouts, and tenant-aware rate limits belong in the gateway layer. |
| Deployment values | Exact ports, hostnames, client flags, and gateway topology are deployment-specific and intentionally omitted from this overview. |
| Internal surfaces | Peer networking, admin endpoints, metrics, and any client-control surfaces stay private. |

## Shared gateway and documentation model

Use [RPC Exposure Policy](/operations/rpc-exposure-policy), [Security Standards](/operations/security-standards), and [API Design Principles](/developer/api-design-principles) as the shared controls baseline for Tempo. Use the [Chain Matrix](/reference/chain-matrix) and [RPC / API Matrix](/reference/rpc-api-matrix) for supported-surface comparison only; this page is the public support boundary for Tempo until the detailed guide is published.

Because Tempo is not documented here as an Ethereum-compatible surface, do not infer method compatibility, transport availability, or port numbers from other chain pages. Record any deployment-specific RPC contract, allowed methods, and operational thresholds in the chain runbook instead of this overview.

## Operational notes

- Treat Tempo RPC like any other Internet-facing application edge.
- Keep internal client, metrics, and control-plane access private until a gateway policy explicitly classifies them otherwise.
- If a downstream service needs a stable public contract, publish that contract in deployment documentation rather than expanding this overview with unsupported values.
