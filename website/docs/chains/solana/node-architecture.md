---
title: Node Architecture
sidebar_position: 2
last_verified: 2026-05-28
---

An FP Validated Solana deployment separates peer-to-peer validator duties from developer RPC traffic. Agave stores ledger data, participates in gossip, replays blocks, and serves RPC from the node's current chain view.

| Component | Default port | Exposure | Notes |
| --- | ---: | --- | --- |
| Gossip | `8001/udp` | Public to peers | Required for cluster participation. |
| JSON-RPC HTTP | `8899/tcp` | Private | POST JSON-RPC 2.0 according to [Solana HTTP RPC docs](https://solana.com/docs/rpc/http). |
| WebSocket PubSub | `8900/tcp` | Private | Persistent subscription transport according to [Solana WebSocket RPC docs](https://solana.com/docs/rpc/websocket). |
| Metrics | `9100/tcp` | Internal | Prometheus only. |

HTTP RPC is stateless request-response. Applications call `getHealth`, `getSlot`, `getBalance`, `getAccountInfo`, `getProgramAccounts`, `simulateTransaction`, and `sendTransaction` over JSON-RPC 2.0 POST with `Content-Type: application/json` as documented in [Solana HTTP RPC docs](https://solana.com/docs/rpc/http).

WebSocket PubSub keeps a connection open and subscribes to account, log, program, slot, and signature updates using methods documented in [Solana WebSocket RPC docs](https://solana.com/docs/rpc/websocket).

:::tip
Keep raw RPC listeners private and expose applications through an authenticated gateway.
:::
