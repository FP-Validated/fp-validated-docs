---
title: Kubernetes Deployment
sidebar_position: 1
last_verified: 2026-05-29
---

# Initia Kubernetes Deployment

Initia uses the public `charts/cosmos-validator` chart pattern. This chart is based on CometBFT/Cosmos validator operations and FP Validated's internal remote-signer/Kubernetes operating model, but it removes private topology and secret details.

## Chart source

```text
charts/cosmos-validator/
  values.yaml
  templates/all.yaml
```

## Concrete chart model

| Component | Chart field | Why it exists |
| --- | --- | --- |
| StatefulSet | one validator workload | Stable identity and persistent chain data. |
| P2P | `ports.p2p: 26656` | CometBFT peer networking. |
| RPC | `ports.rpc: 26657` | CometBFT RPC, private or gatewayed. |
| REST/API | `ports.api: 1317` | Cosmos SDK API where enabled. |
| gRPC | `ports.grpc: 9090` | Cosmos SDK gRPC where enabled. |
| Metrics | `ports.metrics: 26660` | CometBFT instrumentation. |
| ConfigMap | `cometbft.*` | Public-safe config overrides for P2P, consensus, state sync, and instrumentation. |
| Signer | `signer.mode` | Remote signer recommended for production validator safety. |

## CometBFT validator policy

The chart surfaces production-relevant CometBFT fields:

```yaml
cometbft:
  p2p:
    pex: false
    persistentPeers: ""
    privatePeerIds: ""
  consensus:
    doubleSignCheckHeight: 10
  instrumentation:
    prometheus: true
    prometheusListenAddr: ":26660"
```

Use a sentry/peer topology for public peering and keep validator signing endpoints private.

## Render

```bash
helm template initia charts/cosmos-validator   --set chain.name=initia   --set image.repository=ghcr.io/example/initia-node
```

## Exposure policy

- P2P can be public through a reviewed service/firewall policy.
- RPC, REST, gRPC, and metrics are private or gatewayed.
- Signer endpoints are never public.
- Consensus keys should be treated as production secret material; remote signer/KMS/HSM patterns are preferred over plain local key files.
