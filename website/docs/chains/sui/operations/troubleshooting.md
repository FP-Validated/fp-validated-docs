---
title: Troubleshooting
sidebar_position: 6
last_verified: 2026-05-28
---

# Troubleshooting

Start with the failing plane: P2P sync, local storage, gRPC, GraphQL, or client behavior.

| Symptom | First checks |
| --- | --- |
| Node behind network | Peer count, P2P port `8080`, disk I/O, checkpoint logs. |
| gRPC unavailable | Listener on `9000`, HTTP/2 load balancer support, health script. |
| GraphQL slow | Query depth, pagination size, gateway cache, checkpoint lag. |
| Event indexer gaps | Last committed checkpoint, stream reconnect logs, Postgres transaction errors. |
| Transaction submission failures | Serialized bytes, signatures, gas object state, `TransactionExecutionService` errors. |

Use the sample scripts as black-box checks before changing configuration.
