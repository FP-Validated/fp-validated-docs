---
title: TypeScript Samples
sidebar_position: 2
last_verified: 2026-05-28
---

The TypeScript samples use `@aptos-labs/ts-sdk` for client setup, account query, view functions, and build/sign/submit flows.

```bash
export APTOS_NETWORK=production
npx tsx chains/aptos/samples/typescript/client.ts
npx tsx chains/aptos/samples/typescript/account-query.ts 0x1
npx tsx chains/aptos/samples/typescript/view-function.ts 0x1::coin::name 0x1::aptos_coin::AptosCoin
```

:::note
Use SDK transaction builders for signing and BCS serialization; use raw REST only when the payload has already been produced by a trusted signer.
:::
