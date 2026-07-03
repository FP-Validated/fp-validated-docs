---
title: Backup
sidebar_position: 4
last_verified: 2026-05-28
---

Back up configuration, node identity material, Helm/Kubernetes manifests, and any indexer database. Fullnode ledger data is usually reproducible from peers or snapshots, but local backups can reduce recovery time.

:::danger
Do not store private keys or node identity material in plaintext backups. Use the platform secret manager and access audit logs.
:::
