---
title: Snapshot Restore
sidebar_position: 2
last_verified: 2026-05-28
---

# Snapshot Restore

Use snapshots to reduce recovery time, not as a substitute for verified backups. Stop the node or follow the storage engine's consistent snapshot procedure before copying data.

```bash
systemctl stop sui-fullnode
rsync -a --numeric-ids persistent data directory/sui/fullnode/ /backup/sui/fullnode/
systemctl start sui-fullnode
```

After restore, verify checkpoint progression with `chains/sui/samples/grpcurl/checkpoint.sh` before serving traffic.
