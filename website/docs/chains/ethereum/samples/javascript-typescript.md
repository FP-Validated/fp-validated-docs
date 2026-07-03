---
title: JavaScript / TypeScript Samples
sidebar_position: 2
last_verified: 2026-05-28
---

The TypeScript samples use viem and ethers.js against JSON-RPC HTTP and WebSocket endpoints.

```bash
export RPC_URL=http://127.0.0.1:8545
export WS_URL=ws://127.0.0.1:8546
export CONTRACT_ADDRESS=0xdAC17F958D2ee523a2206206994597C13D831ec7
pnpm tsx chains/ethereum/samples/typescript/viem-read.ts
pnpm tsx chains/ethereum/samples/typescript/ethers-read.ts
pnpm tsx chains/ethereum/samples/typescript/watch-event.ts
```

`send-transaction.ts` requires `PRIVATE_KEY` and sends a signed transaction through `eth_sendRawTransaction`; run it only against an endpoint and account you control.
