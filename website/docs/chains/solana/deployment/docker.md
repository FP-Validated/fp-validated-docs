---
title: Docker Deployment
sidebar_position: 1
last_verified: 2026-05-28
---

Use Docker for single-node development, smoke tests, and reproducible Agave flags. Mount the ledger on durable storage and publish only environment-required ports.

```bash
docker run --rm --name solana-rpc \
  -p 8899:8899 -p 8900:8900 -p 8001:8001/udp \
  -v "$PWD/ledger:/ledger" \
  --ulimit nofile=1000000:1000000 \
  solanalabs/solana:stable \
  solana-validator --ledger /ledger --rpc-port 8899 --rpc-bind-address 0.0.0.0
```

:::warning
Do not bind `8899` or `8900` directly to the Internet. Public RPC is dev/test only and can return `429` or `403`.
:::
