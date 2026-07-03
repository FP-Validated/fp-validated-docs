---
title: Managed API / RPC Surface
sidebar_position: 1
last_verified: 2026-07-03
---

Hyperliquid support here is a managed API/RPC surface for application traffic. This page describes the public contract only; it does not publish internal node topology, backend mappings, or operator-only maintenance surfaces.

## Supported interaction classes

| Interaction class | Public-safe status | Notes |
| --- | --- | --- |
| Published reads | Supported | Use the documented application-facing read surface only. |
| Published submissions | Supported when explicitly documented | Keep write access bounded to the methods the service owner has published. |
| Streaming or subscription interfaces | Supported only when explicitly documented | Do not assume a stream exists just because a consumer wants one. |
| Maintenance or admin calls | Private | Not part of the public docs tree. |
| Internal service RPC | Private | Do not expose backend-to-backend interfaces publicly. |

## Public contract

- Expose only the methods that are explicitly part of the managed API/RPC surface.
- Keep request/response semantics narrow enough that consumers can reason about rate limits, retries, and error handling.
- Do not repurpose the public surface as a control plane for internal operations.

::::note Public-safe boundary
If a method, field, subscription, or callback is not documented for consumers, treat it as unpublished. Avoid publishing private hostnames, backend routes, or cluster details that would turn the surface into infrastructure documentation.
::::
