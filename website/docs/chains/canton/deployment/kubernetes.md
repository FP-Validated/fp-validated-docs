---
title: Kubernetes Deployment
sidebar_position: 1
last_verified: 2026-05-29
---

# Canton Kubernetes Deployment

Canton/Splice validator deployment is a multi-component Kubernetes service, not a single node binary. The public `charts/canton-validator` chart shell captures the minimum operator-facing structure while keeping real secrets and ingress details private.

## Chart source

```text
charts/canton-validator/
  values.yaml
  templates/all.yaml
```

## Concrete chart model

| Component | Public value | Official basis |
| --- | --- | --- |
| Validator service | `5003/TCP` | Splice validator Helm docs. |
| Participant JSON API | `7575/TCP` optional | Splice ingress docs. |
| Metrics | `10013/TCP` style validator metrics port | Splice validator chart patterns. |
| Database | Postgres with persistent volume | Splice Helm docs require Postgres secret and DB storage. |
| Onboarding | Kubernetes secret class | Splice onboarding secret docs. |
| OIDC/JWT auth | Kubernetes secret class | Splice docs recommend authentication for production. |
| Pruning/top-up | participant pruning and traffic top-up values | Splice Helm docs. |
| Runtime user | non-root 1001-style security context | Splice chart docs. |

## Render

```bash
helm template canton charts/canton-validator
```

## Exposure policy

- Validator and participant APIs are exposed only through authenticated ingress when required.
- Disallow ingress to all other services.
- Database and onboarding secrets are private runtime secrets.
- Static egress/IP allowlisting requirements are environment-specific and not published here.
