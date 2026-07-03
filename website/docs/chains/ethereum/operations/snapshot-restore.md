---
title: Snapshot Restore
sidebar_position: 2
last_verified: 2026-05-28
---

Snapshot restore reduces initial sync time when the snapshot source is trusted. Stop both clients, restore execution and consensus data directories separately, verify ownership, then start clients with public RPC disabled until health checks pass.

```bash
systemctl stop ethereum-execution ethereum-consensus
rsync -a --delete /mnt/snapshot/geth/ persistent data directory/geth/
rsync -a --delete /mnt/snapshot/beacon/ persistent data directory/beacon/
systemctl start ethereum-execution ethereum-consensus
```

Validate chain ID, head block, and finality before re-enabling traffic.
