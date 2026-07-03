---
title: Runtime Support Matrix
sidebar_position: 4
last_verified: 2026-05-28
---

# Runtime support matrix

Deployment runtimes are an implementation detail **per chain**, not a top-level topic. This
matrix summarizes which runtimes each chain documents and which is production-recommended.
It is generated from each chain's `metadata.yaml` (see
[generator scripts](/contributing/add-new-chain)).

| Chain | Docker | Kubernetes | Helm | ArgoCD | Production-recommended |
| --- | :---: | :---: | :---: | :---: | --- |
| Ethereum / EVM | ✅ | ✅ | ✅ | ✅ | Kubernetes + Helm |
| Sui | ✅ | ✅ | ✅ | ✅ | Kubernetes + Helm |
| Aptos | ✅ | ✅ | ✅ | ✅ | Kubernetes + Helm |
| Solana / Agave | ✅ | ✅ | ✅ | ✅ | Kubernetes + Helm |

:::note
"Docker supported" means a documented single-host compose flow suitable for dev/test and
small deployments. Production guidance points to Kubernetes + Helm with the shared
`blockchain-node` chart, plus per-chain values.
:::
