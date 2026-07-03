---
title: RPC / API Matrix
sidebar_position: 1
last_verified: 2026-05-28
---

| Interface | Status | Best For | Transport | Production Notes |
| --- | --- | --- | --- | --- |
| JSON-RPC HTTP | Standard | Reads, transaction submission, stateless service calls | HTTP on 8545 | Execution-layer JSON-RPC is the common app API documented by [ethereum.org](https://ethereum.org/developers/docs/apis/json-rpc/) and [execution-apis](https://github.com/ethereum/execution-apis); place behind auth and rate limits. |
| JSON-RPC WebSocket | Standard | `eth_subscribe` streams for heads and logs | WebSocket on 8546 | Geth serves WebSocket RPC on default port 8546 and it is suited to subscriptions per [Geth RPC docs](https://geth.ethereum.org/docs/interacting-with-geth/rpc); implement reconnect/backfill. |
| Beacon API | Standard, internal/protected | Consensus state, finality, validator/operator monitoring | HTTP REST on 5052 | The [beacon-APIs spec](https://github.com/ethereum/beacon-APIs) warns not to expose it unprotected to the public internet. |
| Engine API | Internal | Execution/consensus payload exchange | Authenticated HTTP on 8551 | JWT-authenticated internal channel; never route through public ingress. |
| Debug/Trace API | Advanced | Transaction tracing, incident analysis, indexer backfills | JSON-RPC modules over HTTP/IPC | Disable by default; isolate because calls are expensive and may expose sensitive node behavior. |
| GraphQL | Optional | Ad hoc query-shaped reads where supported | HTTP | Client-specific support; prefer JSON-RPC for portable integrations. |
