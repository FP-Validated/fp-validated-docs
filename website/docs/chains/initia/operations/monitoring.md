---
title: Monitoring
sidebar_position: 1
last_verified: 2026-05-29
---

# Initia Monitoring

Initia monitoring combines Kubernetes workload health with chain-specific liveness checks.

## Signals

| Signal | Why it matters |
| --- | --- |
| Workload availability | Confirms the Kubernetes workload is running and ready. |
| Restart count | Detects crash loops or unstable runtime flags. |
| Storage pressure | Prevents chain data or service state exhaustion. |
| Peer/connectivity health | Detects degraded chain networking. |
| Height or checkpoint progression | Confirms the chain/service is making progress. |
| Interface availability | Confirms RPC/API/gRPC/WebSocket surfaces behave as expected. |
| Signer safety | Confirms signing topology is unambiguous where applicable. |

## Alert handling

Critical signing or slashing-risk signals follow the FP Validated responsiveness policy. Availability and interface alerts are routed through the standard incident loop and verified with dashboard evidence.
