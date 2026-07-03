---
title: Backup
sidebar_position: 4
last_verified: 2026-05-28
---

Back up configuration, JWT secret, slashing-protection/validator data when present, and enough database snapshots to rebuild service quickly. Full execution state is large; document restore time and snapshot cadence.

```bash
kubectl -n ethereum create secret generic ethereum-engine-jwt --from-file=jwt.hex=jwt.hex --dry-run=client -o yaml
```

Never store validator keys or JWT secrets in public object storage or repository history.
