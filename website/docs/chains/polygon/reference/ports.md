---
title: Ports
sidebar_position: 1
last_verified: 2026-07-03
---

This reference covers the public-safe managed RPC edge for Polygon. Exact upstream node ports and backend service names vary by provider and are intentionally omitted. For the public edge, use TLS-terminated HTTPS or WSS and keep raw node access private. See the shared [Public vs Private Endpoint](/developer/public-vs-private-endpoint) and [RPC Exposure Policy](/operations/rpc-exposure-policy).

::::danger Public-safe boundary
Never publish peer ports, admin ports, metrics ports, or raw node service ports directly. Only the controlled application gateway belongs in public docs.
::::

| Surface | Typical port / URL | Exposure class | Notes |
| --- | --- | --- | --- |
| Public RPC gateway | `https://…` / `wss://…` on 443 | Public-safe with controls | Primary application edge for wallets, dapps, explorers, and trusted backends. |
| JSON-RPC HTTP upstream | 8545 | Internal or controlled | Conventional EVM RPC port for read and submit traffic when used behind a private gateway. |
| JSON-RPC WebSocket upstream | 8546 | Internal or controlled | Conventional subscription transport; keep connection counts and replay behavior bounded. |

## Port posture

- Treat 443 as the public-facing entry point and everything else as controlled infrastructure.
- Do not assume direct node exposure even if an upstream uses the conventional 8545/8546 ports.
- Apply the same allowlists, authentication, and request limits to HTTP and WebSocket traffic.
- Keep provider-specific backend ports and node internals out of public documentation.
