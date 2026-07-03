---
title: Monitoring
sidebar_position: 5
last_verified: 2026-05-28
---

# Monitoring

Monitor both node health and API usefulness.

| Signal | Why it matters |
| --- | --- |
| Latest checkpoint and lag | Detects stale reads. |
| Peer count and P2P errors | Detects network isolation. |
| gRPC latency/error rate by service | Protects backend clients and indexers. |
| GraphQL latency, status, query cost | Protects public read APIs. |
| Disk growth and I/O latency | Prevents sync stalls and database corruption risk. |

:::tip
Alert on symptoms users feel: stale checkpoint, high API error rate, and failed transaction submission. Process uptime alone is not enough.
:::
