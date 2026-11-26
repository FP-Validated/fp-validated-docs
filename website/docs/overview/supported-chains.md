---
title: Supported Chains
sidebar_position: 2
last_verified: 2026-11-26
---

# Supported chains

Chain documentation comes in three depths.

| Depth | Chains | What you get |
| --- | --- | --- |
| Full developer and operations guide | [Ethereum](/chains/ethereum/overview), [Sui](/chains/sui/overview), [Aptos](/chains/aptos/overview), [Solana](/chains/solana/overview) | Node architecture, deployment, developer interfaces with an RPC matrix, samples, operations, and reference. Status is `draft` until verified. |
| Kubernetes deployment pattern | [Sei](/chains/sei/deployment-architecture), [Stable](/chains/stable/deployment-architecture), [Initia](/chains/initia/deployment-architecture), [Walrus](/chains/walrus/storage-node-guide), [Canton](/chains/canton/validator-splice-ops) | How the validator or storage node is declared: roles, values files, signer mode, ports. |
| Listed support | See [Chains Overview](/chains#additional-supported-networks) | Support class only, with a link to the staking guide where one exists. |

The full list with node types and interfaces is in the [Chain Matrix](/reference/chain-matrix). Delegators looking for how to stake should start at [Staking](/staking).

## Adding more chains

New chains follow the [New Chain Template](/chains/new-chain-template) and the
[Add New Chain](/contributing/add-new-chain) checklist. Every chain MUST ship:

- An Overview + Node Architecture page
- A Deployment section (Docker, Kubernetes, Helm Values, ArgoCD as applicable)
- A Developer Interfaces section with an RPC / API Matrix
- A Samples section with the [required sample categories](/developer/sample-app-patterns)
- An Operations section and a Reference section
- A `metadata.yaml` conforming to the [schema](/contributing/add-new-chain)
