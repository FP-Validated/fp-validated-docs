---
title: FP Validated Documentation Model
sidebar_position: 1
last_verified: 2026-05-28
---

# FP Validated documentation model

This site exists for two readers:
1. **Infrastructure and operations teams** deploying institution-grade blockchain nodes on Kubernetes.
2. **Developers and integrators** consuming the RPC / API / gRPC / GraphQL / WebSocket interfaces exposed by those nodes.

## What this site is

- **Chain-first.** The main unit of organization is a protocol, because deployment shape, runtime behavior, interfaces, and operational risks differ by chain.
- **Infrastructure-backed.** Public FP Validated operating patterns are documented alongside each protocol, including Guard, monitoring, response policy, and shared Kubernetes deployment structure.
- **Developer-usable.** Every protocol includes interface guidance, exposure patterns, and sample-oriented references for external consumers.

## What this site is not

- It is **not** a generic infrastructure marketing page. The goal is to publish reusable operating knowledge and deployment patterns that external teams can actually follow.
- It is **not** a dump of internal systems. Sensitive environment details, server identities, credentials, and internal-only topology are intentionally excluded.
- It is **not** a replacement for official chain documentation. It curates, structures, and operationalizes upstream material for institution-grade deployment and integration.

## Document flow

```text
FP Validated infrastructure principles
→ Protocol overview
→ Kubernetes deployment
→ Public interface exposure
→ Developer integration patterns
→ Monitoring, backup, and recovery
→ Incident response and safety policy
```

## Verification posture

Each protocol page carries frontmatter:

```yaml
status: draft | in-review | verified
last_verified: YYYY-MM-DD
```

Treat `draft` as unverified. Reconfirm upstream protocol behavior before production rollout.
