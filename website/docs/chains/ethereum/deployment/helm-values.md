---
title: Helm Values
sidebar_position: 3
last_verified: 2026-05-28
---

Helm values should make interfaces explicit: enabled APIs, service type, ingress policy, persistent volume size, client image tags, and JWT secret source.

```yaml
execution:
  client: geth
  image: ethereum/client-go:stable
  persistence:
    size: 2000Gi
  rpc:
    http:
      enabled: true
      port: 8545
      apis: [eth, net, web3]
    websocket:
      enabled: true
      port: 8546
      apis: [eth, net, web3]
  engine:
    port: 8551
    jwtSecretName: ethereum-engine-jwt
consensus:
  client: lighthouse
  beaconApi:
    enabled: true
    port: 5052
    public: false
```

Keep debug/trace APIs disabled by default; enable them only for isolated backends because they are CPU and IO intensive.
