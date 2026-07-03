---
title: Authentication and Exposure Policy
sidebar_position: 99
last_verified: 2026-05-28
---

Expose only the interfaces required by consumers, and expose them through a controlled gateway rather than raw client ports.

| Port | Interface | Exposure |
| --- | --- | --- |
| 30303 | Execution P2P | Public, client peer traffic only. |
| 8545 | JSON-RPC HTTP | Private or authenticated public gateway. |
| 8546 | JSON-RPC WebSocket | Private or authenticated public gateway with connection limits. |
| 5052 | Beacon API | Internal/protected only. |
| 8551 | Engine API | Internal only; JWT required. |
| 6060 | Metrics | Internal monitoring only. |

:::warning Method policy
Allow `eth`, `net`, and `web3` for general RPC. Keep `debug`, `trace`, `admin`, `personal`, and miner-related namespaces disabled on public endpoints.
:::

Use `/developer/authentication`, `/developer/rate-limiting`, and `/operations/monitoring` for shared controls.
