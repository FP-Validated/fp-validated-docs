---
title: API Design Principles
sidebar_position: 1
last_verified: 2026-05-28
---

Developer interfaces in FP Validated are documented as operational contracts, not just method catalogs. A useful interface page should answer four questions: who may call it, what latency and consistency it offers, what failures callers must handle, and what operational controls protect the node.

| Use case | Prefer | Avoid |
| --- | --- | --- |
| Public read-only wallet or explorer traffic | Authenticated gateway in front of read RPC, with CORS and rate limits | Raw validator or fullnode ports on the internet |
| Internal indexer or analytics job | Private RPC, gRPC, GraphQL, or chain-native streaming interface | Browser-oriented public RPC for backfills |
| Transaction submission | A dedicated submit path with simulation, deadline, retry, and duplicate-submit handling | Blind retries through multiple endpoints without idempotency rules |
| Node administration | Internal-only admin RPC or CLI over a private network | Any admin namespace on a public endpoint |
| Consensus or validator coupling | Private authenticated interface, such as Ethereum Engine API JWT | Shared public gateway |

Interface selection is chain-specific, but the decision model is shared. Ethereum JSON-RPC is the standard application interface ([Ethereum JSON-RPC](https://ethereum.org/developers/docs/apis/json-rpc/)), while Geth commonly exposes HTTP on 8545 and WebSocket on 8546 ([Geth RPC](https://geth.ethereum.org/docs/interacting-with-geth/rpc)). Solana applications use HTTP and WebSocket RPC methods ([Solana RPC](https://solana.com/docs/rpc)), Sui is moving callers toward gRPC and GraphQL RPC while deprecating JSON-RPC ([Sui API references](https://docs.sui.io/references/sui-api)), and Aptos exposes REST, indexer, and transaction stream APIs ([Aptos APIs](https://aptos.dev/build/apis)).

:::tip Design rule
Choose the narrowest interface that satisfies the product requirement, then put a gateway policy around it. The gateway policy belongs in the same design review as the client method list.
:::

## Interface checklist

| Question | Why it matters | Related page |
| --- | --- | --- |
| Is the caller a browser, server, indexer, or validator component? | Determines CORS, authentication, connection lifetime, and trust boundary. | [/developer/public-vs-private-endpoint](/developer/public-vs-private-endpoint) |
| Is the method read-only, write/submit, or administrative? | Write and admin paths need stricter auth and audit controls. | [/developer/auth-api-key](/developer/auth-api-key) |
| Does the response require finality or only latest state? | Prevents reorg and commitment bugs. | [/developer/reorg-finality-handling](/developer/reorg-finality-handling) |
| Can the request be retried safely? | Prevents duplicate transactions and thundering herds. | [/developer/retry-timeout-backoff](/developer/retry-timeout-backoff) |
| Does the workload need historical completeness? | Public RPC retention may be insufficient for indexers. | [/developer/indexer-architecture](/developer/indexer-architecture) |

Concrete chain pages provide method names and ports: [/chains/ethereum/developer-interfaces/rpc-api-matrix](/chains/ethereum/developer-interfaces/rpc-api-matrix), [/chains/solana/developer-interfaces/rpc-api-matrix](/chains/solana/developer-interfaces/rpc-api-matrix), [/chains/sui/developer-interfaces/rpc-api-matrix](/chains/sui/developer-interfaces/rpc-api-matrix), and [/chains/aptos/developer-interfaces/rpc-api-matrix](/chains/aptos/developer-interfaces/rpc-api-matrix).
