---
title: SDKs
sidebar_position: 5
last_verified: 2026-05-28
---

# Sui SDKs

Use SDKs as application libraries, not as a reason to expose unsafe node ports. Keep the node surface aligned with [Sui gRPC](https://docs.sui.io/develop/accessing-data/grpc) and [GraphQL RPC](https://docs.sui.io/develop/accessing-data/graphql/graphql-rpc).

## TypeScript

TypeScript services can combine a generated gRPC client for backend flows with a GraphQL HTTP client for flexible reads.

```ts
import { request } from 'undici';

export async function graphql(endpoint: string, query: string, variables: Record<string, unknown>) {
  const res = await request(endpoint, {
    method: 'POST',
    body: JSON.stringify({ query, variables }),
    headers: { 'content-type': 'application/json' },
  });
  if (res.statusCode >= 400) throw new Error(`GraphQL HTTP ${res.statusCode}`);
  return res.body.json();
}
```

## Rust

Rust services typically generate gRPC bindings from the published protobuf definitions and use an HTTP GraphQL client for read-heavy endpoints.

```rust
use std::time::Duration;
use tonic::transport::Channel;

async fn grpc_channel(endpoint: String) -> Result<Channel, tonic::transport::Error> {
    Channel::from_shared(endpoint)?
        .timeout(Duration::from_secs(5))
        .connect()
        .await
}
```

:::tip
Put SDK configuration in one module: endpoint URLs, deadlines, retry policy, and feature flags for JSON-RPC migration. That keeps the July 2026 migration from leaking across application code.
:::
