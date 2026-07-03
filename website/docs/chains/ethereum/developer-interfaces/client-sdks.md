---
title: Client SDKs
sidebar_position: 6
last_verified: 2026-05-28
---

Use maintained client libraries for production applications and keep the raw JSON-RPC samples for diagnostics.

| SDK | Runtime | Best use |
| --- | --- | --- |
| viem | TypeScript | Typed reads, wallet clients, event watching. |
| ethers.js | TypeScript | Broad ecosystem integrations and signer workflows. |
| web3.py | Python | Operations scripts, indexers, and backend jobs. |

```ts
import { createPublicClient, http } from 'viem';
import { production } from 'viem/chains';

const client = createPublicClient({ chain: production, transport: http(process.env.RPC_URL) });
const block = await client.getBlockNumber();
console.log(block);
```

See sample docs for read calls, transaction sending, log filters, and reconnecting subscriptions.
