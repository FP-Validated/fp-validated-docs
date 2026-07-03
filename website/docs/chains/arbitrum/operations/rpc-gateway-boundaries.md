---
title: RPC Gateway Boundaries
sidebar_position: 1
last_verified: 2026-07-03
---

# Arbitrum RPC Gateway Boundaries

Arbitrum uses the shared EVM RPC gateway model for public access. This page set documents the exposed application interfaces and the public-safe boundary without publishing internal topology or client-control details.

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

Keep public callers on the gateway path; do not publish raw client ports or chain-control endpoints.
