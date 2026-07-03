---
title: Upgrade and Rollback
sidebar_position: 3
last_verified: 2026-05-28
---

Protocol upgrades require compatible execution and consensus client versions. Read both client release notes, stage images, and upgrade one node at a time behind the load balancer.

Rollback must preserve database compatibility. If a client release performs an irreversible database migration, test restore from snapshot before production rollout.

```bash
kubectl -n ethereum rollout status statefulset/geth
kubectl -n ethereum rollout status statefulset/lighthouse
```

Keep Engine JWT and data volumes unchanged across image rollbacks.
