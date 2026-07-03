---
title: Public Contract
sidebar_position: 1
last_verified: 2026-07-03
---

# Base Public Contract

This page summarizes the public-safe contract for Base's managed EVM rollup RPC surface. It is intentionally narrower than the deployment reality so that no secret values, internal hostnames, or unsupported details are published here.

| Contract area | Public statement |
| --- | --- |
| Supported surface | Public application RPC only, through the documented gateway path. |
| Internal surfaces | Admin, debug, trace, metrics, and client-control interfaces stay private. |
| Deployment values | Exact ports, hostnames, service names, and topology are deployment-specific and omitted. |
| Operating model | Authentication, quotas, logging, request-size limits, and abuse monitoring are enforced at the edge. |

## What this page is for

- Give operators a concise public boundary statement they can publish safely.
- Keep chain-overview pages focused on scope while this page captures the public contract in one place.
- Avoid implying unsupported transport or client detail when the deployment is intentionally generic.

## Cross references

Use [/reference/chain-matrix](/reference/chain-matrix) and [/reference/rpc-api-matrix](/reference/rpc-api-matrix) for comparisons across chains, and use the chain overview plus runbooks for operational decisions.
