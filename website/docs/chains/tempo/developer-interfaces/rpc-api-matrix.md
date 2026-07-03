---
title: RPC/API Matrix
sidebar_position: 1
last_verified: 2026-07-03
---

# Tempo RPC/API Matrix

Tempo is documented here as a public-safe RPC surface with chain-specific details intentionally kept generic. These pages describe only the public boundary and the operator obligations around it.

| Interface | Status | Best for | Transport | Public-safe boundary |
| --- | --- | --- | --- | --- |
| Public application RPC | Standard | Client traffic that the deployment explicitly publishes | deployment-specific | Expose only through a controlled gateway; do not publish exact transports, methods, hosts, or ports here. |
| Operator/control-plane surfaces | Internal | Maintenance, diagnostics, and operator workflows | varies | Keep private; never publish on a public RPC edge. |
| Metrics and health surfaces | Internal | Monitoring and alerting | varies | Keep behind private observability ingress or protected monitoring networks. |

::::warning Public exposure boundary
Do not route public traffic directly to node ports. Gateway controls belong in the edge layer, not in the client process: TLS, authentication or API keys where required, request-size limits, method allowlists, rate limits, logging, and abuse monitoring.
::::

## Supported public contract

- Public application RPC is the supported public interface for this chain.
- Keep read-heavy and write-heavy traffic on the same policy baseline, but separate them operationally if capacity or blast radius requires it.
- Keep chain-control, admin, debug, trace, and metrics interfaces private.

## Documentation boundary

The public contract is the published application RPC edge. Exact transports, ports, hostnames, method lists, and internal topology are deployment-specific and intentionally omitted from public docs.

Use this page as the public interface map. Put exact ports, deployment topology, and client flags in internal runbooks.
