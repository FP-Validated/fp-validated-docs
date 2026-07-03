---
title: Ports
sidebar_position: 1
last_verified: 2026-05-28
---

| Port | Name | Protocol | Public | Purpose |
| --- | --- | --- | --- | --- |
| 30303 | p2p | TCP/UDP | true | Execution client peer discovery and block/tx gossip. |
| 8545 | http-rpc | HTTP | controlled | JSON-RPC HTTP; Geth default HTTP RPC port per [Geth docs](https://geth.ethereum.org/docs/interacting-with-geth/rpc). |
| 8546 | ws-rpc | WebSocket | controlled | JSON-RPC WebSocket; Geth default WS RPC port per [Geth docs](https://geth.ethereum.org/docs/interacting-with-geth/rpc). |
| 5052 | beacon | HTTP | false | Consensus Beacon REST API from [beacon-APIs](https://github.com/ethereum/beacon-APIs). |
| 8551 | engine | HTTP + JWT | false | Authenticated Engine API. |
| 6060 | metrics | HTTP | false | Client metrics/debug endpoint when enabled. |
