---
title: Helm Values
sidebar_position: 3
last_verified: 2026-05-28
---

Keep Helm values focused on chain configuration, persistence, resources, and service exposure. Secrets, TLS certificates, and node identity should be injected by the platform secret manager, not copied into values files.

```yaml
image:
  repository: aptoslabs/validator
  tag: production

service:
  api:
    enabled: true
    port: 8080
    public: false
  p2p:
    enabled: true
    port: 6180
    public: true
  metrics:
    enabled: true
    port: 9101
    public: false

persistence:
  enabled: true
  size: 2Ti

resources:
  requests:
    cpu: "4"
    memory: 16Gi
```

Use `/operations/configuration-management` for shared GitOps and secret promotion rules.
