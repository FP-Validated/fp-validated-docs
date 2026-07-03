---
title: Docker
sidebar_position: 1
last_verified: 2026-05-28
---

# Docker

Run the Sui full node container with explicit persistent volumes and explicit port bindings. Keep API decisions separate from container mechanics.

```bash
mkdir -p persistent data directory/sui/fullnode /etc/sui

# Example shape; pin the exact image tag from your release process.
docker run --name sui-fullnode \
  --restart unless-stopped \
  -v /etc/sui:/etc/sui:ro \
  -v persistent data directory/sui/fullnode:persistent data directory/sui \
  -p 8080:8080 \
  -p 127.0.0.1:9000:9000 \
  -p 127.0.0.1:9184:9184 \
  mysten/sui-node:stable \
  sui-node --config-path /etc/sui/fullnode.yaml
```

:::warning
Bind gRPC `9000` and metrics `9184` to localhost or a private address unless an authenticated gateway is in front. Public clients should normally use GraphQL RPC through a rate-limited HTTPS endpoint.
:::

After startup, use `/chains/sui/samples/grpc` for health and checkpoint checks, then route traffic only after sync is current.
