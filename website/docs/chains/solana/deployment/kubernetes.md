---
title: Kubernetes Deployment
sidebar_position: 1
last_verified: 2026-05-29
---

# Solana Kubernetes Deployment

Solana/Agave is the exception: upstream docs state Docker for live clusters is not generally recommended or supported. The public chart profile is therefore an operator reference for controlled environments and RPC-style infrastructure, not a claim that containerized voting validators are the default safest production mode.

## Chart source

```text
charts/blockchain-node/examples/solana-values.yaml
```

## Concrete chart model

| Component | Public value | Official basis |
| --- | --- | --- |
| Process | `agave-validator` / Solana validator process | Agave setup docs. |
| P2P dynamic range | `8000-8030` style TCP/UDP range | Agave requirements and setup docs. |
| RPC HTTP | `8899/TCP` | Agave RPC docs. |
| WebSocket | `8900/TCP` (`RPC_PORT + 1`) | Agave requirements. |
| Ledger path | `/mnt/ledger` class storage | Agave setup example. |
| Accounts path | `/mnt/accounts` class storage | Agave setup example. |
| RPC profile flags | `--no-voting`, `--full-rpc-api`, `--private-rpc` | Agave RPC node docs. |
| Host prerequisites | sysctl/file limits and high-TBW NVMe | Agave validator requirements. |

## Render

```bash
helm template solana charts/blockchain-node \
  -f charts/blockchain-node/examples/solana-values.yaml
```

## Production caveats

- Do not present a containerized voting validator as the default production recommendation.
- Separate voting validator and high-volume RPC roles.
- RPC/WebSocket surfaces are private or gatewayed; do not expose staked-validator RPC directly.
- Host-level tuning is required and cannot be solved by Helm alone.
