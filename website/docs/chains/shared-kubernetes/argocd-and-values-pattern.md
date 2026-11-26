---
title: ArgoCD and Values Pattern
sidebar_position: 1
last_verified: 2026-11-26
---

# ArgoCD and Values Pattern

Every chain workload is declared the same way, so a reviewer who knows one chain can read another. This page describes that pattern. File names and value keys are left out on purpose.

## The pattern

| Rule | Reason |
| --- | --- |
| One deployable unit per node or role. | A validator, each of its signers, and each full node can be changed and rolled back on its own. |
| Shared charts per chain family. | Chains built on the same stack use the same chart, so a safety check added once protects all of them. |
| Settings in two layers. | What is common to a chain and network is written once: chain ID, client version, upgrade plans, ports. What is specific to one node is written next to it: placement, storage, role. |
| Which workloads exist is declared apart from how they are configured. | A settings change can alter an existing workload. Adding a workload always takes a separate, reviewed change. |
| Placement is explicit. | A chain's data stays on a named volume, and a signing workload is tied to one place. Nothing is rescheduled by surprise. |
| Secrets before workloads. | A chain's secrets are delivered and checked before any of its workloads is started. |

## Sync-only node and signing node

A validator is deployed in two steps.

1. It starts as a node that only syncs. No validator key is present.
2. Once it has caught up with the chain, and after any previous signer has stopped, a separate reviewed change switches the same node to signing.

The two steps are never combined in one change.

## Charts refuse unsafe states

Charts fail before anything reaches the cluster when the settings describe an unsafe state. Examples:

- More than one replica of a signer or validator.
- A standby node that references validator keys.
- A signer whose configuration does not match the validator it signs for.
- A signer that would start without a recorded approval.
- A workload placed in a namespace of the wrong network.
- An image given by tag where a digest is required.

## Adding a workload

1. Write the common settings for the chain and network.
2. Add the node, starting as sync-only.
3. Declare its storage, its secrets, and the workload itself.
4. Render the chart locally and read the output.
5. Merge, deliver the secrets, and confirm they are ready.
6. Start the node and let it catch up.
7. Switch to signing in a separate pull request.

## Related

- [GitOps Topology](/fp-validated-infra/gitops-topology)
- [Ports and Secrets Contract](/chains/shared-kubernetes/ports-and-secrets-contract)
