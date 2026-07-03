---
title: Ports and Secrets Contract
sidebar_position: 2
last_verified: 2026-07-03
---

# Ports and Secrets Contract

Production chain guides must document two public-safe contracts before deployment: host-network ports and runtime secret path conventions.
## Port governance

Cosmos-style validators in `chain deployment repository` use `hostNetwork: true`; port collisions happen at the node level, not only inside Kubernetes. The repo therefore uses a canonical base plus per-chain offset model.

| Chain | Offset / note | Operational implication |
| --- | --- | --- |
| Sei production | Offset `0` | Uses the base Cosmos/Horcrux allocation. |
| Initia production | Offset `200` | Avoids collisions with other host-network validators. |
| Stable production | Offset `300` | Includes Cosmos API/gRPC plus Stable EVM RPC/WebSocket surfaces. |
| Canton | Exempt | Not modeled as host-network validator ports in the same registry. |
| Walrus test environment | Exemption note in registry | Treat public exposure separately from validator host-port governance. |

For every new chain guide, include a port table with: P2P, RPC, REST/API, gRPC, WebSocket, Prometheus, signer, cosigner, and any chain-specific EVM or service ports.

## ExternalSecret contract

Vault and External Secrets remain the default runtime secret-delivery pattern. Public docs may publish the *path convention* and *secret class* so operators know what must exist before rollout, but they must never publish secret values, private key material, live credential payloads, or unredacted secret exports.

Cosmos-style chains share the same public-safe secret classes:

| Secret class | Used by | Required when |
| --- | --- | --- |
| Node identity secret | Validator/full node | Node has persistent identity. |
| Local validator signing secret/state | Validator | `signerMode: local`. |
| Distributed signer shard + recovery material | Horcrux-style signer | `signerMode: horcrux` or signer overlay. |
| Sign-state recovery material | Recovery flow | Sign-state restoration/cutover. |
| JWT / client auth secret | Internal service handoff | Consensus/execution or gateway/API authentication is enabled. |

The standardized Horcrux sign-state path format is:

```text
<protocol>/<network>/horcrux/sign-state/<chain-id>/shards/<ordinal>
```

The signer-set ID format is:

```text
<protocol>/<network>/<chain-id>/horcrux
```

Public guides may show path conventions and placeholder examples such as `remoteKey=REPLACE_ME`, but they must not publish actual secret values, live credential payloads, or unredacted backup material.
## Fail-closed rules

- A missing Vault key should block rollout; do not generate placeholder signing material.
- A signer or cosigner path mismatch is an incident, not a warning.
- Ambiguous validator activity should result in no validator signing rather than two validators signing.
- ExternalSecret deletion policy should retain backing secret material unless an explicit key-rotation runbook says otherwise.
