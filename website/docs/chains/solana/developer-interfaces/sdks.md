---
title: SDKs
sidebar_position: 5
last_verified: 2026-05-28
---

SDKs build on the same HTTP and WebSocket methods documented by Solana ([Solana HTTP RPC docs](https://solana.com/docs/rpc/http), [Solana WebSocket RPC docs](https://solana.com/docs/rpc/websocket)).

## TypeScript: `@solana/web3.js`

```ts
import { Connection, PublicKey } from '@solana/web3.js';
const connection = new Connection(process.env.SOLANA_RPC_URL ?? 'http://127.0.0.1:8899', 'confirmed');
const account = await connection.getAccountInfo(new PublicKey(process.env.SOLANA_ACCOUNT!));
console.log(account?.owner.toBase58());
```

## Rust client

```rust
use solana_client::rpc_client::RpcClient;
use solana_sdk::commitment_config::CommitmentConfig;
let client = RpcClient::new_with_commitment("http://127.0.0.1:8899".to_string(), CommitmentConfig::confirmed());
let slot = client.get_slot()?;
println!("slot={}", slot);
```

:::tip
Configure explicit URLs, commitments, timeouts, and retry budgets; SDKs do not replace private RPC capacity.
:::
