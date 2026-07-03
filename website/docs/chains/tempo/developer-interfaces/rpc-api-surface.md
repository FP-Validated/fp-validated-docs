---
title: RPC API Surface
sidebar_position: 1
last_verified: 2026-07-03
---

# Tempo RPC API Surface

This page documents the public-safe interface boundary for the Tempo surface FP Validated supports.

## Supported surface

| Surface | Exposure | Guidance |
| --- | --- | --- |
| Chain-specific RPC | Gateway only | Publish only the supported consumer contract. |
| Streaming or subscription traffic | Controlled gateway only | Apply connection caps, idle timeouts, and abuse controls before exposing it. |
| Internal management / metrics / control surfaces | Internal only | Keep operational-only interfaces private. |

## Documentation boundary

Tempo is documented here as a managed RPC surface, not as a protocol-complete guide. If a stable method-level contract becomes public, add it explicitly instead of inferring it from other chain pages.
