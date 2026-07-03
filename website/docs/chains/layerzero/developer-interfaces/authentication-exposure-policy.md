---
title: Authentication and Exposure Policy
sidebar_position: 2
last_verified: 2026-07-03
---

LayerZero verification support is an application surface with a narrow public contract. This page describes how to expose that contract safely without publishing private operator details.

## Exposure model

| Surface | Exposure | Boundary |
| --- | --- | --- |
| Published verification ingress | Controlled public or partner-facing gateway | Require the smallest authentication and authorization model that satisfies the published workflow. |
| Health and status endpoints | Protected | Keep read-only checks separate from consumer traffic and rate-limit them independently. |
| Internal worker, admin, and coordination endpoints | Private | Never publish these directly or through a broad proxy path. |
| Debug, tracing, and maintenance surfaces | Private | Do not expose to public consumers. |

## Controls

- Use the shared gateway controls in [RPC Exposure Policy](/operations/rpc-exposure-policy) and [Security Standards](/operations/security-standards).
- Keep request logging, quotas, and abuse monitoring in the common platform layer instead of the service implementation.
- Use short-lived credentials or partner-specific access only when the published workflow requires it.

::::note What stays unpublished
Private hostnames, node IPs, backend mappings, internal ports, and worker layouts are intentionally omitted from this docs tree. The public docs describe the support boundary, not the deployment topology.
::::
