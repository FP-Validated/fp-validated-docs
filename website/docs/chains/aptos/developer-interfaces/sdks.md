---
title: SDKs
sidebar_position: 6
last_verified: 2026-05-28
---

Use official Aptos SDKs when an application signs, simulates, submits, or waits for transactions. The API overview points developers to SDKs alongside REST and indexing APIs ([Aptos API documentation](https://aptos.dev/build/apis)).

| Language | Use | Sample |
|---|---|---|
| TypeScript | Web/backend app integration | `chains/aptos/samples/typescript/client.ts` |
| Python | Automation and ops tooling | Use REST for simple reads; SDK for signing flows |
| Rust | High-throughput services and native tooling | Prefer SDK/client crates for signing and BCS handling |

```ts
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

const aptos = new Aptos(new AptosConfig({ network: Network.MAINNET }));
const ledger = await aptos.getLedgerInfo();
console.log(ledger.ledger_version);
```
