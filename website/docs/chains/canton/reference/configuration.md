---
title: Configuration Reference
sidebar_position: 1
last_verified: 2026-05-29
---

# Canton Configuration Reference

This reference describes configuration classes, not private values.

| Configuration class | Examples |
| --- | --- |
| Chain identity | Protocol family, chain ID class, runtime profile. |
| Runtime image | Protocol client or service image version. |
| Ports | P2P, RPC/API, gRPC/WebSocket, metrics, and internal control ports. |
| Storage | Persistent volume class, capacity class, snapshot/restore policy. |
| Secrets | Node identity, signer material, database/API credentials. |
| Observability | ServiceMonitor/PodMonitor labels, dashboards, alert bundles. |
| Exposure policy | Private, gatewayed, public, or never-public interface class. |

Exact private values are managed in internal repositories and secret managers and are not published in external documentation.
