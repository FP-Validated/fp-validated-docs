---
title: Node Types
sidebar_position: 3
last_verified: 2026-05-28
---

# Node types

The same terms recur across chains, though exact semantics differ. Each chain's
**Node Architecture** page states which of these it supports and what they mean there.

| Node type | Purpose | Typical interface exposure |
| --- | --- | --- |
| **Full Node** | Validates and stores recent state; serves reads | RPC/API enabled, often internal |
| **Archive Node** | Retains full historical state | RPC/API + trace/debug; heavy storage |
| **Validator Node** | Participates in consensus / block production | No public RPC; admin-only |
| **RPC Node** | Dedicated read/serve node behind a gateway | Public or gateway-fronted RPC/API |
| **Indexer Node** | Feeds an external index (DB) from streams | gRPC/stream consumer, not a public endpoint |

## Choosing a node type

- Serving an app's reads/writes → **RPC Node** behind a [gateway](/developer/rpc-gateway-pattern).
- Historical queries / explorers / tracing → **Archive Node**.
- Real-time pipelines into a database → **Indexer Node** consuming a stream
  (Sui SubscriptionService, Aptos Transaction Stream, Solana `logsSubscribe`, EVM `eth_subscribe`).
- Consensus participation → **Validator Node**, never publicly exposed.
