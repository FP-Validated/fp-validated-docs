---
title: Argo CD
sidebar_position: 4
last_verified: 2026-05-28
---

Use Argo CD to keep manifests, values, secret references, and monitoring objects in sync.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: solana-rpc
spec:
  destination:
    namespace: solana
    server: https://kubernetes.default.svc
  source:
    repoURL: https://example.invalid/fp-validated-docs.git
    path: charts/solana
    targetRevision: main
    helm:
      valueFiles: [values-production.yaml]
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```
