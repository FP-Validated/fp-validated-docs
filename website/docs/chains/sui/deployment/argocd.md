---
title: Argo CD
sidebar_position: 4
last_verified: 2026-05-28
---

# Argo CD

Use Argo CD to promote reviewed Sui node manifests between environments. Keep mutable runtime data in PVCs and immutable desired state in Git.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: sui-fullnode
spec:
  project: validators
  source:
    repoURL: https://git.example.com/platform/chains.git
    path: sui/overlays/production
    targetRevision: main
  destination:
    namespace: sui
    server: https://kubernetes.default.svc
  syncPolicy:
    automated:
      prune: false
      selfHeal: true
```

:::warning
Disable destructive pruning for PVC-owning resources unless the runbook explicitly covers snapshot validation and restore testing.
:::
