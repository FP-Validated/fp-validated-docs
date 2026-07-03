---
title: Security Model
sidebar_position: 5
last_verified: 2026-05-28
---

# Security model

The central security rule of this site: **interfaces have different exposure classes, and
mixing them up is the most common operational mistake.**

## Exposure classes

| Class | Examples | Rule |
| --- | --- | --- |
| **Public-safe (with controls)** | Execution JSON-RPC read methods, Solana JSON-RPC reads | Expose only behind a [gateway](/developer/rpc-gateway-pattern) with auth + rate limiting |
| **Internal-only** | Ethereum Beacon API, Aptos admin endpoints | Keep on internal networks; never expose raw to the public internet |
| **Admin / authenticated** | Ethereum Engine API, validator/admin RPC | JWT/auth required; never publicly reachable |
| **Streaming** | gRPC subscriptions, WebSocket PubSub | Treat like public RPC + add connection-scaling controls |

## Baseline requirements

1. **No raw node ports on the public internet.** Front everything with a gateway/proxy.
2. **Separate public, internal, and admin endpoints** (see
   [Public vs Private Endpoint](/developer/public-vs-private-endpoint)).
3. **Rate limit and authenticate** any externally reachable interface
   (see [Rate Limiting](/developer/rate-limiting), [Auth / API Key](/developer/auth-api-key)).
4. **Engine API and validator/admin interfaces are never public.**
5. **Beacon API is not public-by-default** — the upstream spec explicitly warns against
   exposing it unprotected.

Per-chain specifics live in each chain's
`Developer Interfaces / Authentication / Exposure Policy` section and in
[Operations → RPC Exposure Policy](/operations/rpc-exposure-policy).
