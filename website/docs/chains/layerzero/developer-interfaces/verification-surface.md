---
title: Verification Surface
sidebar_position: 1
last_verified: 2026-07-03
---

LayerZero support is published here as a verification surface, not as generic chain RPC. Use this page to understand the public contract for DVN-related traffic and the lines that must stay private.

## Supported interaction classes

| Interaction class | Public-safe status | Notes |
| --- | --- | --- |
| Verification traffic | Published | Accept only the request shapes and workflows that are explicitly part of the supported verification path. |
| Partner-facing status and health checks | Published | Keep the checks bounded and documented; do not expose internal telemetry or debug endpoints. |
| Operator automation | Private | Internal orchestration is not part of the public docs tree. |
| Generic blockchain RPC | Not supported | Do not infer a node-style RPC interface from LayerZero verification support. |
| Admin or coordination endpoints | Private | Keep out of public gateways and consumer documentation. |

## Exposure rules

- Expose only the minimum surface required for the published verification workflow.
- Put the surface behind the shared gateway, authentication, quota, TLS, request-size, and logging controls used for other public services.
- Separate consumer traffic from operator-only paths so that validation failures do not reveal private topology or internal tooling.

::::warning Public boundary
If a request, endpoint, or callback is not described in the published verification workflow, treat it as unpublished. Do not document private partner handshakes, internal worker APIs, or cluster coordination details here.
::::

## Safe consumer framing

- Consumers should interact only with published verification and status interfaces.
- Keep payloads, callbacks, and error handling aligned with the public contract; do not derive extra methods from internal implementation detail.
- Prefer explicit documentation links over opaque endpoint naming so the support boundary remains easy to audit.
