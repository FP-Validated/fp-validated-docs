---
title: Images
sidebar_position: 3
last_verified: 2026-05-28
---

Use pinned Aptos images rather than floating tags. Record image repository, tag, digest, network, and rollout date in the environment manifest.

| Runtime | Image policy |
|---|---|
| Docker | Pin tag and digest in compose/systemd wrapper |
| Kubernetes | Pin digest in workload spec or Helm values |
| Argo CD | Promote image changes through Git review |

Scan images and keep rollback tags available until the new version has survived an operational soak.
