---
title: Backup Standards
sidebar_position: 3
last_verified: 2026-05-28
---

Backups protect node availability, not protocol correctness. A backup is useful only if it can be restored into a node that rejoins the intended network and passes chain-specific health checks.

## Backup classes

| Data | Backup method | Restore expectation |
| --- | --- | --- |
| Node state | Filesystem snapshot, volume snapshot, or client-supported state export | Restore to a compatible client version, then resume sync from peers. |
| Configuration | Git-tracked manifests plus sealed or externalized secrets | Recreate the node without copying mutable host state. |
| Keys and secrets | Secret manager backup with access audit | Restore only through approved secret workflows; never into plaintext files in Git. |
| Indexer data | Database snapshot plus migration version | Restore with schema compatibility and replay from a known checkpoint. |

:::danger Key material
Validator keys, JWT secrets, API keys, database credentials, and private RPC credentials are not ordinary files. Store and restore them through the approved secret manager only. Do not include secrets in node snapshots, sample repos, support bundles, or incident notes.
:::

## Snapshot cadence

| Node role | Cadence | Retention | Notes |
| --- | --- | --- | --- |
| Production RPC full node | Daily snapshot plus pre-change snapshot | 7 daily, 4 weekly | Keep at least one restore point before client upgrades. |
| Archive or indexer node | Daily database or volume snapshot | Based on rebuild cost and storage budget | Archive rebuilds are expensive; validate capacity before extending retention. |
| Validator or signer-adjacent node | Pre-change and after successful upgrade | Policy-driven | Prioritize key handling and rollback safety over fast cloning. |
| Development/test node | Best effort | Short retention | Use for convenience, not disaster recovery. |

## Restore drills

Run restore drills on a schedule, not during the first outage.

1. Select a recent backup without modifying production retention.
2. Restore into an isolated network or non-production namespace.
3. Start the node with the documented image and config version.
4. Confirm the node reaches the expected network and resumes sync.
5. Run the chain-specific RPC smoke tests.
6. Record restore duration, storage consumed, and any manual steps.

```bash
# Generic post-restore checklist; commands are examples, not a replacement for chain docs.
df -h
curl -fsS "$HEALTH_URL"
curl -fsS "$RPC_URL" -H 'content-type: application/json' -d "$RPC_SMOKE_PAYLOAD"
```

## Backup validation checklist

| Check | Pass condition |
| --- | --- |
| Inventory | Each production node role has a named backup source and owner. |
| Encryption | Backups are encrypted at rest and in transit. |
| Access | Restore permissions are limited and audited. |
| Compatibility | Backup metadata records chain, network, client, version, data path, and snapshot height/checkpoint/slot. |
| Restore evidence | A restore drill has completed within the required interval. |
| Deletion | Retention expiry removes old backups without manual cleanup. |

:::warning Snapshot consistency
Do not assume a crash-consistent disk snapshot is application-consistent for every client or database. Prefer client-supported export, database-native backup, or a stopped/quiesced node when the chain client requires it.
:::

## Before major changes

Create or verify a recent backup before:

- Client upgrades or downgrades.
- Data directory migrations.
- Database schema migrations for indexers.
- Pruning mode changes.
- Storage class or persistent volume changes.
- Moving nodes between runtimes.

Link backup evidence in the change record and incident timeline when the backup becomes part of a recovery path.
