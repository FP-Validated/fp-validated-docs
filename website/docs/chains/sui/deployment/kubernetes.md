---
title: Kubernetes Deployment
sidebar_position: 1
last_verified: 2026-05-29
---

# Sui Kubernetes Deployment

Sui full nodes are well suited to a StatefulSet profile with large persistent storage. Official Sui docs explicitly list Kubernetes StatefulSet as a supported deployment form.

## Chart source

```text
charts/blockchain-node/examples/sui-values.yaml
```

## Concrete chart model

| Component | Public value | Official basis |
| --- | --- | --- |
| Binary | `sui-node` | Sui full node docs. |
| Container command | `/opt/sui/bin/sui-node --config-path /opt/sui/config/fullnode.yaml` | Sui Docker fullnode example. |
| Database path | `/opt/sui/db` | Sui fullnode template. |
| Config path | `/opt/sui/config/fullnode.yaml` | Sui Docker fullnode example. |
| P2P | `8084` | Sui fullnode template / Docker example. |
| JSON-RPC / WebSocket | `9000` | Sui fullnode template; deprecated path. |
| Metrics | `9184` | Sui fullnode template and monitoring docs. |
| Recommended sizing | 16 vCPU / 128Gi RAM / 4Ti NVMe class | Sui operator docs. |

## Render

```bash
helm template sui charts/blockchain-node \
  -f charts/blockchain-node/examples/sui-values.yaml
```

## Interface policy

- JSON-RPC is deprecated; plan gRPC/GraphQL migration.
- RPC/API surfaces should be gatewayed and rate-limited.
- Metrics remain private.
- Initial gRPC indexing can compete with serving traffic; use a dedicated serving/indexing profile for production.
