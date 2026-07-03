---
title: Ethereum / EVM
sidebar_position: 1
last_verified: 2026-05-28
chain: ethereum
category: evm
status: draft
supported_runtimes: [docker, kubernetes, helm, argocd]
developer_interfaces: [json-rpc, json-rpc-ws, beacon-api, engine-api]
sample_languages: [curl, typescript, python]
---

Ethereum nodes expose two operator-facing planes: an execution client that maintains EVM state and transaction execution, and a consensus client that tracks proof-of-stake consensus. Execution-layer JSON-RPC is the standard application interface implemented by execution clients, with method semantics documented by [ethereum.org JSON-RPC](https://ethereum.org/developers/docs/apis/json-rpc/) and the canonical [execution-apis specifications](https://github.com/ethereum/execution-apis).

Consensus clients expose the separate HTTP REST Beacon API described by the [beacon-APIs specification](https://github.com/ethereum/beacon-APIs). Treat it as an infrastructure API for validators, monitoring, and finalized-chain state, not as a replacement for EVM JSON-RPC.

:::danger Public exposure boundary
Never expose the Beacon API or Engine API directly to the public internet. The Beacon API specification explicitly warns against unprotected public exposure, and the Engine API is the authenticated execution-to-consensus channel.
:::

## Operator map

| Plane | Primary process | Interface | Typical port | Consumers |
| --- | --- | --- | --- | --- |
| Execution | Geth, Nethermind, Besu, Erigon, Reth | JSON-RPC HTTP / WebSocket | 8545 / 8546 | wallets, dapps, indexers |
| Consensus | Lighthouse, Prysm, Teku, Nimbus, Lodestar | Beacon REST API | 5052 | validators, finality monitors |
| Engine | Execution + consensus clients | Authenticated Engine API | 8551 | local paired clients only |
| P2P | Both client families | devp2p / libp2p discovery | 30303 and client-specific UDP/TCP | peers |

Use `/developer/rate-limiting` and `/developer/authentication` for shared gateway controls; this section documents Ethereum-specific interfaces and ports.
