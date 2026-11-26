---
title: ArgoCD and Values Pattern
sidebar_position: 1
last_verified: 2026-11-26
---

# ArgoCD and Values Pattern

Every chain workload is declared the same way: one ArgoCD Application per node or role, a Helm chart from the chain repository, and two values files. This page is the contract to follow when adding a chain.

## Where things live

| Item | Repository | Location |
| --- | --- | --- |
| ArgoCD Application | Cluster repository | One file per Application, prefixed with its sync wave number. |
| Namespace, secret store, ExternalSecrets | Cluster repository | One directory per `<chain>-<network>`. |
| Static volumes | Cluster repository | One file per volume. |
| Helm chart | Chain repository | `charts/<chart>` |
| Common values | Chain repository | `variables/<chain>-<network>/common-values.yaml` |
| Node values | Chain repository | `variables/<chain>-<network>/<node>.yaml` |

The chain repository holds no Applications. A values change can alter an existing workload, but adding a workload always takes a change in the cluster repository.

## Charts

| Chart | Used for |
| --- | --- |
| `chain-templates` | Cosmos SDK validators and their threshold signers, Sui validators, Walrus storage nodes, and other single-binary validators. The `protocol` value selects the template. |
| `ethereum-node` | Execution client, consensus client, MEV-Boost, remote signer, and validator client as one composition. |
| `ethereum-common` | SSV operators and shared Ethereum pieces. |
| Chain-specific charts | Aptos, Monad, Stacks, Bitcoin, and others whose layout does not fit the generic templates. |

## Values layering

The Application loads the common file first and the node file second, so the node file wins:

```yaml
source:
  path: charts/chain-templates
  helm:
    valueFiles:
      - /variables/<chain>-<network>/common-values.yaml
      - /variables/<chain>-<network>/<node>.yaml
```

| File | Holds |
| --- | --- |
| Common values | Chain ID, image and version, upgrade plans, ports, bootstrap sources, resource profile, monitoring labels. |
| Node values | Node name and placement, the volume claim, role, signer mode, and references to that node's secrets. |

Some workloads use a single file where there is nothing to share.

## Sync-only node and signing node

A Cosmos validator has two node files for the same node name and the same volume:

| File | Role |
| --- | --- |
| `fullnode-01.yaml` | The node syncs and does not sign. No validator key is mounted. |
| `active.yaml` | The same node with the validator key and signer state, in signing mode. |

Activation is a one-line change to the Application: the second values file switches from the sync-only file to the signing file. That change is reviewed and synced separately, after the node has caught up and after the previous signer has stopped.

## Render guards

Charts fail at render time, before anything reaches the cluster, when values describe an unsafe state. Examples:

- More than one replica of a signer or validator.
- A standby node that references validator keys or signer state.
- A local signer with no explicit handover of its last signed state.
- A threshold signer whose cosigner list or target does not match the validator.
- A signer set to start without an approval reference in its values.
- A namespace that does not contain the network name.
- An image given by tag where the chart requires a digest.

CI also rejects any long-running workload that has no memory limit.

## Adding a workload

1. Create or update the common values file.
2. Add the node values file. Start with the sync-only role.
3. In the cluster repository, add the volume, the secrets Application, and the workload Application. Pick sync wave numbers after the chain's secrets Application.
4. Render the chart locally with both values files and read the output.
5. Merge, then sync the secrets Application and confirm every ExternalSecret is ready.
6. Sync the workload Application and let the node catch up.
7. Switch to the signing values in a separate pull request.

## Checklist

- [ ] The Application points at the right chart and lists the common file before the node file.
- [ ] Namespace, chain, and network in the values match the directory name.
- [ ] Placement is explicit: a node name, or a volume that only one pod can mount.
- [ ] The secrets the node references exist in Vault before sync.
- [ ] Host ports are free on the target node. See [Ports and Secrets Contract](/chains/shared-kubernetes/ports-and-secrets-contract).
- [ ] The ServiceMonitor is enabled and its `alert` value is set on purpose.
- [ ] For a multi-role chain, the sync order is written in the Application file headers.
