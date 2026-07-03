---
title: Canton Validator Splice Operations
sidebar_position: 1
last_verified: 2026-05-29
---

# Canton Validator Splice Operations

Canton uses a multi-source ArgoCD Application that composes upstream Splice charts with local validator overrides.

## Application composition

`argocd/applications/canton/validator-splice-standard-01.yaml` combines four sources:

1. chain-template values.
2. `splice-postgres`.
3. `splice-participant`.
4. local `charts/splice-validator`.

The Application enables ServerSideApply and namespace creation.

## Common values

`variables/canton/common-values.yaml` and `variables/canton/common-values.yaml` define:

- protocol and network identity.
- chart source `ghcr.io/digital-asset/decentralized-canton-sync/helm`.
- chart version `0.5.18`.
- Authentik ingress auth.
- Vault-backed TLS and app secrets.
- Postgres, participant, and validator runtime settings.
- local-path storage: Postgres `80Gi`, validator PVC `10G`.

## Node overlay

`variables/canton/validator-splice-standard-01.yaml` defines:

- namespace and app name.
- node placement.
- wallet/CNS ingress hosts.
- Vault key prefixes for Postgres, auth, and onboarding.
- connectivity metadata.

## Services and ports

`charts/splice-validator/templates/validator.yaml` exposes:

| Service | Port |
| --- | ---: |
| Validator API/service | 5003 |
| Metrics | 10013 |

DB credentials are consumed via `secretKeyRef`; the validator should not start successfully with missing DB secrets.

## Deployment status

The primary Canton Application is active under `argocd/applications/canton`. Discovery did not find active `argocd/applications/canton/*` application files in the explicit app tree; document the secondary values set as values-ready but not active unless that changes.

## Preflight checklist

- [ ] Confirm all four sources resolve and render together.
- [ ] Confirm Vault key prefixes exist for Postgres, auth, onboarding, and TLS.
- [ ] Confirm Authentik ingress policy is configured before exposing wallet/CNS hosts.
- [ ] Confirm Postgres and validator PVC storage classes and sizes.
- [ ] Confirm metrics endpoint is scraped only by monitoring.
