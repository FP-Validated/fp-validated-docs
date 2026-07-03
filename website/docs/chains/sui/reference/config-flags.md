---
title: Config Flags
sidebar_position: 2
last_verified: 2026-05-28
---

# Config Flags

Track these settings in reviewable configuration rather than ad hoc command lines.

| Setting | Operator intent |
| --- | --- |
| Network/genesis config path | Selects production/test environment and trusted genesis material. |
| Database path | Points at persistent storage for node state. |
| P2P listen address | Controls peer reachability. |
| gRPC listen address | Controls backend API exposure. |
| Metrics listen address | Controls Prometheus access. |
| GraphQL service binding | Controls public read API placement when enabled. |

Keep concrete flags aligned with the Sui release you deploy and cite release notes in your internal runbook.
