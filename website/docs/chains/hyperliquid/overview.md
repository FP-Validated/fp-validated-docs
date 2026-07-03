---
title: Hyperliquid Overview
sidebar_position: 1
last_verified: 2026-07-03
chain: hyperliquid
status: draft
---

# Hyperliquid managed API/RPC surface

Hyperliquid is documented here as a managed chain API and RPC surface for application traffic. This tree defines the public-safe boundary for consuming or exposing that surface; it does not describe internal deployment topology, private node addresses, or any operator-only control plane.

## Support scope

| Area | Public guidance | Boundary |
| --- | --- | --- |
| Application access | Use the chain-specific API/RPC surface for client integrations that need reads, submissions, or other explicitly published methods. | Supported as the primary application interface. |
| Gatewayed exposure | Publish the surface only through approved edge controls. | Authentication, quotas, TLS, request-size limits, and abuse monitoring belong in shared platform layers. |
| Operator-only interfaces | Keep internal management or maintenance interfaces private. | Not published on this page. |
| Infrastructure details | Treat hosts, ports, server names, and internal paths as sensitive. | Intentionally omitted. |

## Documentation map

- [Managed API / RPC surface](/chains/hyperliquid/developer-interfaces/managed-api-rpc-surface) for the public contract and supported interaction classes.
- [Authentication and exposure policy](/chains/hyperliquid/developer-interfaces/authentication-exposure-policy) for gateway and access controls.
- [Monitoring](/chains/hyperliquid/operations/monitoring) for health, latency, and incident signals.
- [Published references](/chains/hyperliquid/reference/official-references) for the public docs and shared platform controls.

## Interface surface

The public surface is intentionally narrow: a managed API/RPC endpoint exposed for application use, plus any documented read or write methods that the service owner explicitly publishes elsewhere. Do not infer additional interfaces from this page.

## Exposure model

::::warning Public exposure boundary
Treat Hyperliquid like an application edge, not as raw infrastructure. When the surface is exposed externally, place it behind a controlled gateway with authentication, quotas, TLS, request-size limits, and abuse monitoring. Use [Rate Limiting](/developer/rate-limiting), [RPC Exposure Policy](/operations/rpc-exposure-policy), and [Security Standards](/operations/security-standards) as the shared baseline.
::::

## Operational notes

- Keep the public contract limited to the methods and behaviors that are explicitly documented for consumers.
- Prefer a single managed entry point over ad hoc direct exposure.
- Apply the same logging, monitoring, and incident-handling expectations used for other public chain surfaces.
- Avoid publishing environment-specific details such as private addresses, ports, local storage paths, or internal network layout.

## Documentation boundary

This page is the overview and policy boundary for Hyperliquid support. The deeper pages in this section describe only what is safe to publish; anything operator-only, private, or implementation-specific stays out of the public tree.
