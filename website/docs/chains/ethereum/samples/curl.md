---
title: Curl JSON-RPC Samples
sidebar_position: 1
last_verified: 2026-05-28
---

These commands target the execution JSON-RPC HTTP endpoint on port 8545. Set `RPC_URL` to your gateway or local node.

```bash
export RPC_URL=http://127.0.0.1:8545
bash chains/ethereum/samples/curl/eth_blockNumber.sh
bash chains/ethereum/samples/curl/eth_getBalance.sh 0x0000000000000000000000000000000000000000 latest
bash chains/ethereum/samples/curl/eth_call.sh 0xdAC17F958D2ee523a2206206994597C13D831ec7 latest
bash chains/ethereum/samples/curl/eth_getLogs.sh 0x000000 0x000010 0xdAC17F958D2ee523a2206206994597C13D831ec7
RAW_TX=0x... bash chains/ethereum/samples/curl/eth_sendRawTransaction.sh
```

Bound `eth_getLogs` ranges and route untrusted users through `/developer/rate-limiting`.
