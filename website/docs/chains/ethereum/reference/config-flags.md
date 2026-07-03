---
title: Config Flags
sidebar_position: 2
last_verified: 2026-05-28
---

Common Geth interface flags:

```bash
--http --http.addr 0.0.0.0 --http.port 8545 --http.api eth,net,web3
--ws --ws.addr 0.0.0.0 --ws.port 8546 --ws.api eth,net,web3
--authrpc.addr 0.0.0.0 --authrpc.port 8551 --authrpc.jwtsecret /jwt.hex
```

Keep `admin`, `debug`, `trace`, and `personal` off public RPC. Consensus client flags vary, but all should point at the execution Engine endpoint and the same JWT secret.
