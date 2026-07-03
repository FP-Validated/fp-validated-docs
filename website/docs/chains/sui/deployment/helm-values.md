---
title: Helm Values
sidebar_position: 3
last_verified: 2026-07-03
---

# Helm Values

Keep values files declarative: image tag, chain config, resource requests, PVC size, service exposure, and API enablement.

```yaml
image:
  repository: mysten/sui-node
  tag: stable

service:
  p2p:
    enabled: true
    port: 8080
    public: true
  grpc:
    enabled: true
    port: 9000
    public: false
  metrics:
    enabled: true
    port: 9184
    public: false

persistence:
  enabled: true
  size: 2Ti
  storageClass: environment-specific
```

Keep storage class names environment-specific. Before rollout, verify the cluster's binding mode, expansion behavior, and snapshot/restore workflow instead of assuming a shared `fast-ssd` style class exists everywhere.

Do not encode secrets in values files. Put TLS keys, gateway credentials, and database passwords in your secret manager and reference `/fp-validated-infra/access-and-secrets` for shared handling.
