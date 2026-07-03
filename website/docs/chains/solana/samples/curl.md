---
title: curl HTTP Samples
sidebar_position: 1
last_verified: 2026-05-28
---

These shell samples call JSON-RPC HTTP over POST with `Content-Type: application/json`: `getHealth`, `getSlot`, `getBalance`, `getAccountInfo`, `getProgramAccounts`, `simulateTransaction`, and `sendTransaction`.

```bash
SOLANA_RPC_URL=http://127.0.0.1:8899 SOLANA_ACCOUNT=11111111111111111111111111111111 bash chains/solana/samples/curl/getAccountInfo.sh
```

:::warning
`getProgramAccounts` can be expensive. Use filters, avoid public RPC for production scans, and handle `429` with backoff.
:::
