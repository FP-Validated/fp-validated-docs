---
title: TypeScript Samples
sidebar_position: 3
last_verified: 2026-05-28
---

# TypeScript samples

The TypeScript samples wrap Sui gRPC and GraphQL endpoints in small production-shaped clients. They cover `SuiGrpcClient`, `SuiGraphQLClient`, transaction submission, transaction simulation, and checkpoint subscriptions.

```bash
cd chains/sui/samples/typescript-grpc
SUI_GRPC_ENDPOINT=http://127.0.0.1:9000 SUI_GRAPHQL_ENDPOINT=https://fullnode.production.sui.io/graphql npx tsx object-lookup.ts 0x...
```

The client code sets per-request deadlines, preserves checkpoint cursors for streams, and keeps transaction bytes opaque so signing remains outside the node process.

:::warning
Do not put private keys in node API samples or server environment variables. Sign transactions in a dedicated wallet/key-management boundary and send only serialized transaction bytes plus signatures to the submission path.
:::
