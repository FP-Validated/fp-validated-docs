---
title: Docker
sidebar_position: 1
last_verified: 2026-05-28
---

Run execution and consensus clients as separate containers sharing a private network and a JWT secret volume. Publish P2P ports; keep JSON-RPC, Beacon, and Engine ports private unless a gateway adds authentication, rate limits, and allowlists.

```bash
docker network create ethereum-node
openssl rand -hex 32 > jwt.hex

docker run -d --name geth --network ethereum-node \
  -v "$PWD/geth:/data" -v "$PWD/jwt.hex:/jwt.hex:ro" \
  -p 30303:30303/tcp -p 30303:30303/udp \
  ethereum/client-go:stable \
  --production --datadir /data \
  --http --http.addr 0.0.0.0 --http.port 8545 --http.api eth,net,web3 \
  --ws --ws.addr 0.0.0.0 --ws.port 8546 --ws.api eth,net,web3 \
  --authrpc.addr 0.0.0.0 --authrpc.port 8551 --authrpc.jwtsecret /jwt.hex
```

Pair the consensus client with `--execution-endpoint http://geth:8551` and the same JWT secret. See `/operations/secrets` for shared secret handling patterns.
