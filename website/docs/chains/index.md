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
| [Aptos](/chains/aptos/overview) | Fullnode, REST, indexer, and transaction-stream guide. |
| [Canton](/chains/canton/overview) | Validator overview. |
| [Ethereum](/chains/ethereum/overview) | Public Ethereum/EVM node interface guide. |
| [Initia](/chains/initia/deployment-architecture) | Validator deployment architecture with a local signer and oracle sidecar. |
| [Sei](/chains/sei/deployment-architecture) | Validator deployment architecture with a local signer. |
| [Solana](/chains/solana/overview) | RPC node, WebSocket PubSub, and operations guide. |
| [Stable](/chains/stable/deployment-architecture) | Validator deployment architecture with a threshold signer. |
| [Sui](/chains/sui/overview) | Full node and developer interface guide. |
| [Walrus](/chains/walrus/overview) | Storage node overview. |

## Additional supported networks

FP Validated supports these networks, but they do not have a full chain guide on this site yet.

| Network | Support class | Public docs status |
| --- | --- | --- |
| Arbitrum | RPC | Uses the shared EVM RPC exposure and gateway model. |
| Avalanche | RPC | Uses the shared EVM RPC exposure and gateway model. |
| Base | RPC | Uses the shared EVM RPC exposure and gateway model. |
| BSC | RPC | Uses the shared EVM RPC exposure and gateway model. |
| Hyperliquid | RPC / API surface | Public support listed; overview and supporting API/RPC docs are published. |
| Injective | Validator | [Staking guide](/staking/injective) published. No node operations guide yet. |
| LayerZero | DVN / verification service | Public support listed; overview and supporting verification docs are published. |
| Monad | Validator | [Staking guide](/staking/monad) published. No node operations guide yet. |
| Optimism | RPC | Uses the shared EVM RPC exposure and gateway model. |
| Polygon | RPC | Uses the shared EVM RPC exposure and gateway model. |
| Stacks | Signer | [Staking guide](/staking/stacks) published. No node operations guide yet. |
| Tempo | RPC | Public support listed; detailed interface guide not published here yet. |

## Cross-chain references

Use [Chain Matrix](/reference/chain-matrix), [RPC / API Matrix](/reference/rpc-api-matrix), and [Port Matrix](/reference/port-matrix) only when comparing chains. Use the chain pages for actual operator decisions.
