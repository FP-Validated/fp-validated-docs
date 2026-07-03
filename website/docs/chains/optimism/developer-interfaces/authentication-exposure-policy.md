---
title: Authentication and Exposure Policy
sidebar_position: 2
last_verified: 2026-07-03
---

# Optimism Authentication and Exposure Policy

Public RPC should terminate at a controlled edge. The gateway owns authentication, quotas, request-size limits, method allowlists, logging, and abuse monitoring; the chain client should not be exposed directly to untrusted traffic.

| Edge or interface | Exposure | Policy |
| --- | --- | --- |
| Public RPC gateway | Public or partner-facing | TLS required; add authentication where needed; enforce quotas, request-size limits, connection caps, and logging. |
| JSON-RPC HTTP | Gatewayed only | Publish only the methods required by the consumer and keep expensive or operator-only namespaces off the public edge. |
| JSON-RPC WebSocket | Gatewayed only | Treat as streaming traffic; enforce idle timeouts, reconnect backoff, and per-client session caps. |
| Admin, debug, trace, metrics, and control-plane surfaces | Private | Never publish on public ingress; keep on operator networks or protected observability paths only. |

::::warning Method policy
Keep the public method set narrow. Allow only the application methods required for the supported workflow; keep administrative, debugging, tracing, personalization, and chain-control namespaces private.
::::

## Operational guardrails

- Apply request-body and batch limits before traffic reaches the chain client.
- Separate trusted backend traffic from public traffic when capacity or policy requires it.
- Treat 429 and 403 responses as normal gateway controls, not as client failures.
- Document any chain-specific exceptions in a private runbook rather than widening the public exposure policy.

## Shared references

Use [/developer/rate-limiting](/developer/rate-limiting), [/operations/rpc-exposure-policy](/operations/rpc-exposure-policy), and [/operations/security-standards](/operations/security-standards) for the shared baseline.
