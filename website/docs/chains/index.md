---
title: Overview
slug: /chains
sidebar_position: 0
---

# Chains Overview

Chain documentation is organized by the chain first, then by network or deployment profile. A chain page should answer three questions:

1. What node are we operating?
2. Which developer interfaces are safe to expose?
3. Which operational runbooks apply to this chain?

## Chain guides

| Chain | What is documented |
| --- | --- |
| [Ethereum](/chains/ethereum/overview) | Public Ethereum/EVM node interface guide. |
| [Sei](/chains/sei/deployment-architecture) | Validator and Horcrux deployment architecture. |
| [Stable](/chains/stable/deployment-architecture) | Stablevisor validator, Horcrux, EVM endpoint, and cutover runbook. |
| [Initia](/chains/initia/deployment-architecture) | Active validator and Horcrux topology. |
| [Walrus](/chains/walrus/storage-node-guide) | Storage node deployment guide. |
| [Canton](/chains/canton/validator-splice-ops) | Splice validator operations guide. |
| [Sui](/chains/sui/overview) | Full node and developer interface guide. |
| [Aptos](/chains/aptos/overview) | Fullnode, REST, indexer, and transaction-stream guide. |
| [Solana](/chains/solana/overview) | RPC node, WebSocket PubSub, and operations guide. |

## Additional supported networks

These networks are actively supported by FP Validated, but they do not yet have full standalone chain guides in this public docs tree.

| Network | Support class | Public docs status |
| --- | --- | --- |
| LayerZero | DVN / verification service | Public support listed; overview and supporting verification docs are published. |
| BSC | RPC | Uses the shared EVM RPC exposure and gateway model. |
| Hyperliquid | RPC / API surface | Public support listed; overview and supporting API/RPC docs are published. |
| Avalanche | RPC | Uses the shared EVM RPC exposure and gateway model. |
| Polygon | RPC | Uses the shared EVM RPC exposure and gateway model. |
| Arbitrum | RPC | Uses the shared EVM RPC exposure and gateway model. |
| Optimism | RPC | Uses the shared EVM RPC exposure and gateway model. |
| Base | RPC | Uses the shared EVM RPC exposure and gateway model. |
| Tempo | RPC | Public support listed; detailed interface guide not published here yet. |

## Cross-chain references

Use [Chain Matrix](/reference/chain-matrix), [RPC / API Matrix](/reference/rpc-api-matrix), and [Port Matrix](/reference/port-matrix) only when comparing chains. Use the chain pages for actual operator decisions.
