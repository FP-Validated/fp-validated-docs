---
title: Ports and Secrets Contract
sidebar_position: 2
last_verified: 2026-11-26
---

# Ports and Secrets Contract

Two things must be settled before a chain workload is synced: which ports it takes on its node, and which secrets must already exist.

## Ports

Several chain workloads use the host's network directly, because their P2P layer needs a stable, publicly reachable address. With host networking, two workloads on the same node collide if they use the same port, and any port bound to all interfaces is reachable on the node's address.

| Rule | Reason |
| --- | --- |
| Each chain's common values file states its port block. Chains that can share a node get different offsets from the default ports. | Avoids collisions between host-network workloads on one node. |
| Individual ports are not changed without updating the block. | Keeps the allocation readable in one place. |
| RPC, REST, and gRPC on a host-network validator are disabled or bound to loopback. | A port bound to all interfaces would be exposed on the node address. |
| Only P2P, and a storage or service port where the protocol needs one, is opened to the internet. | Everything else is reached inside the cluster. |
| Metrics are scraped inside the cluster by the cluster Prometheus. | Network policy admits the Prometheus pods to the metrics port. |
| Signer and cosigner ports are private. | They are never opened in a firewall or load balancer. |

P2P reaches the internet in one of three ways, depending on the chain and the node: host networking, a host port on the pod, or a load balancer in front of a node port.

Public HTTP endpoints, such as an RPC gateway, do not expose a node port. They go through the public ingress controller with TLS, and the gateway reaches nodes over cluster-internal Services.

For a new chain guide, list the ports by purpose: P2P, RPC, REST or API, gRPC, WebSocket, metrics, signer, cosigner, and anything chain-specific.

## Secrets

Secrets come from Vault through External Secrets. See [Access and Secrets Model](/fp-validated-infra/access-and-secrets#secrets) for the login path and the per-namespace roles.

| Secret class | Used by | Needed when |
| --- | --- | --- |
| Node identity | Any node with a persistent P2P identity. | The node must keep the same peer ID across restarts. |
| Validator key and last signed state | A validator with a local signer. | The node runs in signing mode. |
| Threshold signer share and its transport key | Each cosigner of a threshold signer. | The chain uses threshold signing. |
| Validator keystores and their passwords | A remote signer for Ethereum validators. | Keys are served by the remote signer. |
| Slashing-protection database credential | The remote signer and its database. | A remote signer is deployed. |
| JWT or client auth secret | Execution and consensus client pair, or a gateway. | Two components authenticate to each other. |
| Registry pull credential | Workloads that pull a private image. | The image is not public. |

A guide may name a secret class and say when it is needed. It does not include Vault paths, values, or exports.

## Signer modes

| Mode | How it signs | Where the state is |
| --- | --- | --- |
| Local signer | The validator process holds the key. | The last signed state is in Vault and is handed to the node when it becomes active. The node checks it against the chain height. |
| Threshold signer | Cosigners each hold a share, and a quorum signs. | Each cosigner keeps its own sign state on its host. The order of the cosigner list is fixed, because it determines each share's ID. |
| Remote signer | A signing service holds the keystores, and the validator client asks it to sign. | A slashing-protection database that only the signer's pods can reach. |
| Distributed validator | Operators each hold a key share and take part in a committee. | Each operator has its own disk. Operators are moved one at a time. |
| KMS | The key stays in a cloud KMS, and the service asks the KMS to sign. | None in the cluster. |

Which mode a chain uses depends on what its consensus client supports. Some chains must use a local signer.

## Fail-closed rules

- A missing secret blocks the rollout. Nothing generates a placeholder key.
- A mismatch between a signer and its cosigners or target is an incident, not a warning.
- If it is unclear which instance is active, none signs until it is resolved.
- Signing pods are replaced, not rolled: the old pod stops before the new one starts.
- Deleting an ExternalSecret does not delete the secret in Vault.
