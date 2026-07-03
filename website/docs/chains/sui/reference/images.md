---
title: Images
sidebar_position: 3
last_verified: 2026-05-28
---

# Images

Pin image repositories and tags in deployment config.

```yaml
image:
  repository: mysten/sui-node
  tag: stable
  pullPolicy: IfNotPresent
```

For production, replace floating tags with reviewed release tags or digests. Record the binary version in monitoring labels so incidents can correlate behavior with upgrades.
