---
title: RPC Gateway Boundaries
sidebar_position: 1
last_verified: 2026-07-03
---

# Optimism RPC Gateway Boundaries

Optimism uses the shared EVM RPC gateway model for public access. These pages describe the application surface, the exposure policy, and the operational boundary while staying public-safe.

## What the gateway owns

- Authentication or API-key enforcement when the surface is not purely public.
- Quotas, rate limits, request-size limits, batch limits, and connection caps.
- TLS termination, request logging, and abuse monitoring.
- Backend pool separation when public traffic and trusted traffic need different policies.

## What stays private

- Raw node ports and any client-control or admin interfaces.
- Debug, trace, and internal maintenance endpoints.
- Metrics and health checks that would reveal internal topology or capacity in a public context.

## Operational checks

- Watch RPC latency, error rates, and gateway saturation before assuming a chain-client issue.
- Treat WebSocket reconnect storms as a gateway policy problem first.
- Keep alert thresholds and retry behavior in the runbook, not on the public docs page.
- If a deployment needs a special exposure exception, record it privately and keep the public page unchanged.

## Boundary statement

Treat long-lived WebSocket clients as streaming consumers and keep them behind the same gateway policy as HTTP traffic.
