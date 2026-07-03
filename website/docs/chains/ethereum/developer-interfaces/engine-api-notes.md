---
title: Engine API Notes
sidebar_position: 5
last_verified: 2026-05-28
---

The Engine API is the authenticated execution-to-consensus interface standardized with the execution APIs in [ethereum/execution-apis](https://github.com/ethereum/execution-apis). It is used by the consensus client to drive payload creation, fork choice updates, and payload validation in the execution client.

:::danger
Never expose the Engine API publicly. It is an internal control plane and must require the shared JWT secret between the local/private execution and consensus clients.
:::

Operational rules:

- Bind port 8551 to localhost or a private pod/service network.
- Store the JWT secret as a secret volume shared only by the paired clients.
- Exclude Engine API routes from public ingress, load balancers, and service meshes that terminate untrusted traffic.
- Alert on authentication failures; they usually indicate a wrong JWT, wrong endpoint, or unexpected caller.
