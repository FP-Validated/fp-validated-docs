---
title: FP Validated Documentation Model
sidebar_position: 1
last_verified: 2026-11-26
---

# FP Validated documentation model

This site exists for two readers:
1. Infrastructure and operations teams who run blockchain nodes on Kubernetes.
2. Developers and integrators who use the RPC, API, gRPC, GraphQL, and WebSocket interfaces those nodes expose.
3. Delegators who stake with FP Validated and want to know how to do it and how the validator is run.

## What this site is

- Organized by chain. Deployment shape, runtime behavior, interfaces, and operational risks differ by chain, so the chain is the main unit.
- Based on what we run. The [FP Validated Infra](/fp-validated-infra/overview) section describes our own platform: clusters, GitOps, secrets, Guard, monitoring, and incident response.
- Usable by developers. Chain guides cover interfaces, exposure rules, and samples.

## What this site is not

- It is not a copy of our internal systems. Addresses, hostnames, credentials, and private topology are left out. The list is in the [redaction policy](/fp-validated-infra/access-and-secrets#what-these-docs-leave-out).
- It is not a replacement for a chain's official documentation. Where this site and the official docs differ, follow the official docs.

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
