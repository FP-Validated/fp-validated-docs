---
title: Backup
sidebar_position: 4
last_verified: 2026-05-28
---

# Backup

Back up the node configuration, genesis/network files, and database snapshots. API credentials, gateway config, and Postgres indexer state are separate backup domains.

| Artifact | Backup method | Restore check |
| --- | --- | --- |
| Full node config | Git or secret-managed config bundle | Node starts with expected network and ports. |
| Node database | Consistent volume snapshot | Checkpoint advances after restore. |
| Event indexer Postgres | Database dump or PITR | Last checkpoint and event rows match. |

Keep restore drills in `/operations/disaster-recovery` rather than relying on backup success logs.
