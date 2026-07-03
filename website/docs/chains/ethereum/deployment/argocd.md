---
title: Argo CD
sidebar_position: 4
last_verified: 2026-05-28
---

Use Argo CD to pin client images, chart versions, and environment-specific values. Put secrets in the cluster secret manager and reference them from manifests; do not commit JWT secrets or validator keys.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: ethereum-node
spec:
  destination:
    namespace: ethereum
    server: https://kubernetes.default.svc
  source:
    repoURL: https://git.example.com/platform/ethereum.git
    targetRevision: main
    path: charts/ethereum-node
    helm:
      valueFiles:
        - values-production.yaml
  syncPolicy:
    automated:
      prune: false
      selfHeal: true
```

Gate image changes with sync windows during protocol upgrades and keep rollback manifests for both execution and consensus clients.
