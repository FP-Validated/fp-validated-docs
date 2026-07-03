---
title: Overview
sidebar_position: 1
last_verified: 2026-05-29
---

# Sei Overview

Sei documentation follows the same chain-first structure used by Ethereum: understand the node role, deploy it through Kubernetes, expose only the right developer interfaces, and operate it with clear monitoring and safety controls.

## What this chain page covers

| Area | Public guidance |
| --- | --- |
| Node role | Cosmos/EVM validator with RPC/API/gRPC and EVM JSON-RPC surfaces. |
| Deployment model | Kubernetes workload managed through GitOps and Helm-style values. |
| Developer interfaces | Chain RPC/API/gRPC/WebSocket or service endpoints exposed through private or gatewayed access. |
| Operations | Monitoring, signer safety, rollout discipline, backup/restore, and incident response. |
| Sensitive details | Server names, node names, private addresses, exact secret paths, and local storage paths are intentionally omitted. |

## Operator workflow

```text
Review chain role
→ Render Kubernetes deployment values
→ Confirm secret classes exist
→ Deploy through GitOps
→ Verify chain and Kubernetes health
→ Expose developer interfaces through approved gateway policy
```

Use this page as the entry point. Use the subpages for architecture, deployment, interface, monitoring, and configuration details.
