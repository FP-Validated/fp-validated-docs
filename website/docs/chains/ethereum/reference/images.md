---
title: Images
sidebar_position: 3
last_verified: 2026-05-28
---

Pin execution and consensus images by explicit tags or digests in production.

| Component | Example image | Notes |
| --- | --- | --- |
| Geth | `ethereum/client-go:stable` | Execution client with JSON-RPC and Engine API. |
| Lighthouse | `sigp/lighthouse:latest` | Consensus client; pin a release tag for production. |
| Prysm | `gcr.io/prysmaticlabs/prysm/beacon-chain:stable` | Consensus client alternative. |
| Teku | `consensys/teku:latest` | Consensus client alternative. |

Upgrade execution and consensus clients as a compatibility pair around hard forks.
