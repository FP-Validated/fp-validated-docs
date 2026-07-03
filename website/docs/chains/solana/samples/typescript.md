---
title: TypeScript Samples
sidebar_position: 2
last_verified: 2026-05-28
---

The TypeScript samples use `@solana/web3.js` for connection setup, account reads, token account discovery, and send-confirm flows.

```bash
npm install @solana/web3.js @solana/spl-token bs58
SOLANA_RPC_URL=http://127.0.0.1:8899 npx tsx chains/solana/samples/typescript/connection.ts
```

Use `confirmed` for user-facing flows and `finalized` before accounting checkpoints.
