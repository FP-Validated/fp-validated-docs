---
title: Transaction Stream Samples
sidebar_position: 4
last_verified: 2026-05-28
---

Transaction Stream samples show the processor shape for a gRPC feed that streams historical and live transactions into indexers according to the [Aptos API documentation](https://aptos.dev/build/apis).

A production processor has four durable parts:

1. stream configuration and credentials;
2. decoder/handler logic;
3. idempotent writes keyed by transaction version or event key;
4. checkpoint storage committed in the same transaction as processed data.

```bash
npx tsx chains/aptos/samples/transaction-stream/processor.ts
```
