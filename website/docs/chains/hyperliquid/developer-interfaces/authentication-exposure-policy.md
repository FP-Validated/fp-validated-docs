---
title: Authentication and Exposure Policy
sidebar_position: 2
last_verified: 2026-07-03
---

Hyperliquid should be exposed as a managed application edge, not as a raw node. This page defines the access boundary for the public API/RPC surface.

## Exposure model

| Surface | Exposure | Boundary |
| --- | --- | --- |
| Public API/RPC entrypoint | Controlled public or partner-facing gateway | Protect with authentication, quotas, TLS, and request-size limits. |
| Read-only status or health checks | Protected | Keep separate from consumer traffic and do not leak internal state. |
| Operator maintenance paths | Private | Do not publish. |
| Backend service RPC or cluster coordination | Private | Do not publish. |

## Controls

- Put gateway policy, request logging, and abuse monitoring in shared platform layers.
- Allow only the documented consumer methods at the edge; do not infer extra capability from internal implementation.
- Use [RPC Exposure Policy](/operations/rpc-exposure-policy) and [Security Standards](/operations/security-standards) as the default baseline for any public endpoint.

::::warning Public boundary
Private hostnames, internal ports, backend mappings, and operator-only control paths are intentionally omitted from this docs tree. The public surface is the consumer contract, not the deployment layout.
::::
