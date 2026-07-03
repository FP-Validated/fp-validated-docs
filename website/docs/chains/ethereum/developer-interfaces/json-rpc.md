---
title: JSON-RPC HTTP
sidebar_position: 2
last_verified: 2026-05-28
---

Execution-layer JSON-RPC is the standard interface every execution client implements, with method definitions maintained by [ethereum.org](https://ethereum.org/developers/docs/apis/json-rpc/) and [execution-apis](https://github.com/ethereum/execution-apis). Geth serves JSON-RPC over HTTP on default port 8545 when enabled, as documented in [Geth RPC docs](https://geth.ethereum.org/docs/interacting-with-geth/rpc).

:::warning
Do not expose raw 8545 directly. Put it behind authentication, request size limits, method allowlists, and `/developer/rate-limiting` controls.
:::

## Core methods

```bash
RPC_URL=${RPC_URL:-http://127.0.0.1:8545}
curl -s "$RPC_URL" -H 'content-type: application/json'   -d '{"jsonrpc":"2.0","id":1,"method":"eth_blockNumber","params":[]}'
```

Use `eth_getBalance` for account balances, `eth_call` for read-only contract execution, `eth_getLogs` for bounded event queries, and `eth_sendRawTransaction` for pre-signed transaction submission. Keep `eth_getLogs` block ranges bounded to protect the node.
