---
title: RPC Gateway Boundaries
sidebar_position: 1
last_verified: 2026-07-03
---

# Tempo RPC Gateway Boundaries

Tempo is documented here as a public-safe RPC surface with chain-specific details intentionally kept generic. These pages describe only the public boundary and the operator obligations around it.

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

Do not infer implementation details from other chain pages; document any deployment-specific contract in private runbooks instead of expanding the public docs with unsupported values.
