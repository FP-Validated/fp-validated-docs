---
title: Argo CD
sidebar_position: 4
last_verified: 2026-05-28
---

Deploy Aptos with Argo CD when the desired state is stored in Git and promoted by environment. Keep application manifests chain-specific but reuse shared sync windows, health checks, and notification policy from `/operations/gitops`.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: aptos-fullnode
spec:
  project: chains
  source:
    repoURL: https://github.com/4pillars/fp-validated-docs
    path: chains/aptos/kubernetes
    targetRevision: main
  destination:
    server: https://kubernetes.default.svc
    namespace: aptos
  syncPolicy:
    automated:
      prune: false
      selfHeal: true
```

:::note
Disable prune for stateful chain workloads unless the storage-retention policy explicitly allows destructive cleanup.
:::
