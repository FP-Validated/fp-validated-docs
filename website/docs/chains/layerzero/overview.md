---
title: LayerZero Overview
sidebar_position: 1
last_verified: 2026-07-03
chain: layerzero
status: draft
---

# LayerZero DVN / verification support

FP Validated supports LayerZero as a DVN and verification support surface. This tree documents the public-safe support boundary only: what verification-related interfaces are supported, how they may be exposed safely, and what remains intentionally unpublished.

## Support scope

- Supported surface: DVN and verification workflows, plus the operator-managed service contracts involved in those flows.
- Not published here: generic chain RPC, private node layout, cluster topology, secret paths, or any internal-only coordination details.
- Public guidance stays at the level of support scope and safe exposure, not protocol internals.

## Documentation map

- [Verification surface](/chains/layerzero/developer-interfaces/verification-surface) for the public contract and exposure boundary.
- [Authentication and exposure policy](/chains/layerzero/developer-interfaces/authentication-exposure-policy) for gateway and access controls.
- [Monitoring](/chains/layerzero/operations/monitoring) for health, lag, and incident signals.
- [Published references](/chains/layerzero/reference/official-references) for the public docs and shared platform controls.

## Interface surface

- Verification ingress and partner-facing interfaces used to validate LayerZero-related traffic.
- Operator-facing management and observability surfaces required to run the supported service.
- No chain execution client, validator RPC, or broad public node interface is documented on this page.

## Exposure model

- Treat LayerZero as a controlled support surface, not a public node.
- Publish only the minimum interface set needed for the supported workflow, behind the shared gateway, authentication, quota, and logging controls described in the platform guidance.
- Keep admin, internal, and coordination endpoints private.

## Operational notes

- Apply [RPC Exposure Policy](/operations/rpc-exposure-policy), [Security Standards](/operations/security-standards), and [Access and Secrets Model](/fp-validated-infra/access-and-secrets) before publishing or changing any endpoint.
- Use [Monitoring Standards](/operations/monitoring-standards) and [Common Runbooks](/operations/common-runbooks) for health checks, alerting, and incident response.
- Keep implementation changes aligned with the DVN / verification support workflow rather than expanding this page into a generic chain surface.

## Documentation boundary

This is the public entry point for LayerZero support in this docs tree. The deeper pages in this section describe only what is safe to publish; anything operator-only, private, or implementation-specific stays out of the public tree.
