---
title: Kubernetes Deployment
sidebar_position: 1
last_verified: 2026-05-29
---

# Ethereum Kubernetes Deployment

Ethereum should not be modeled as a single generic container. Post-Merge operation requires an execution client and a consensus client connected through Engine API with a shared JWT secret. The public chart provides that split explicitly.

## Chart source

```text
charts/ethereum-node/
  values.yaml
  templates/all.yaml
  examples/public-values.yaml
```

## Concrete chart model

| Component | Public chart default | Official basis |
| --- | --- | --- |
| Execution client | `ethereum/client-go:stable` | Geth publishes official Docker tags including `stable`. |
| Execution data path | `/root/.ethereum` | Geth Docker docs mount this path for persistent data. |
| Execution P2P | `30303/TCP`, `30303/UDP` | Geth Docker/security docs list these for peering and discovery. |
| Execution RPC | `8545` HTTP, `8546` WebSocket | Geth JSON-RPC docs list these defaults; private/gatewayed only. |
| Engine API | `8551` | Execution/consensus communication; private namespace-local surface. |
| Execution metrics | `6060`, `/debug/metrics/prometheus` | Geth metrics docs. |
| Consensus client | `sigp/lighthouse:latest` | Lighthouse official Docker image. |
| Consensus data path | `/root/.lighthouse` | Lighthouse Docker docs. |
| Consensus P2P | `9000/TCP`, `9000/UDP`, `9001/UDP` | Lighthouse Docker docs. |
| Beacon API | `5052` | Lighthouse HTTP API option; private/gatewayed only. |
| Consensus metrics | `5054`, `/metrics` | Lighthouse metrics docs. |

## Render

```bash
helm template eth charts/ethereum-node \
  -f charts/ethereum-node/examples/public-values.yaml
```

## Required private values

| Value | Reason |
| --- | --- |
| `jwt.existingSecret` | Shared Engine API JWT secret mounted into execution and consensus pods. |
| `consensus.checkpointSyncUrl` | Faster, safer consensus startup through a trusted checkpoint source. |
| storage classes/sizes | Must match operator retention and performance policy. |

## Exposure policy

- P2P can be public after network/firewall review.
- JSON-RPC, WebSocket, Beacon API, Engine API, and metrics are private by default.
- Public RPC requires gateway, TLS termination, rate limiting, namespace filtering, and monitoring.
