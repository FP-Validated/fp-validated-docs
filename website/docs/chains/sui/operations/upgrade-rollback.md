---
title: Upgrade and Rollback
sidebar_position: 3
last_verified: 2026-05-28
---

# Upgrade and Rollback

Pin the Sui node image or binary version and roll one environment at a time. Before upgrade, record current image, config checksum, latest checkpoint, and database snapshot reference.

```bash
kubectl -n sui rollout status statefulset/sui-fullnode
kubectl -n sui logs statefulset/sui-fullnode --tail=200
```

:::danger
Rollback is safe only when the older binary supports the on-disk database version. If release notes mention storage migration, restore from the pre-upgrade snapshot instead of downgrading in place.
:::
