---
title: Helm Values Schema
sidebar_position: 6
last_verified: 2026-07-03
---

The shared `charts/blockchain-node` values contract is chain-independent. Chain charts should map their metadata, images, ports, and persistence requirements into this shape instead of inventing per-chain deployment keys.

## Top-level contract

```yaml
image:
  repository: ghcr.io/example/blockchain-node
  tag: v0.0.0
  pullPolicy: IfNotPresent

resources:
  requests:
    cpu: "4"
    memory: 16Gi
  limits:
    cpu: "8"
    memory: 32Gi

persistence:
  enabled: true
  storageClassName: environment-specific
  size: 2Ti
  accessModes:
    - ReadWriteOnce
  mountPath: persistent data directory/blockchain

service:
  type: ClusterIP
  ports:
    - name: rpc
      port: 8545
      targetPort: 8545
      protocol: TCP
      public: false

ingress:
  enabled: false
  className: nginx
  hosts:
    - host: rpc.example.com
      paths:
        - path: /
          pathType: Prefix
  tls: []

env:
  - name: RUST_LOG
    value: info
```

## Field reference

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `image.repository` | string | Yes | Container image repository for the node or sidecar process. |
| `image.tag` | string | Yes | Immutable version tag or digest selected by the chain release process. |
| `image.pullPolicy` | string | No | Kubernetes pull policy; default should be `IfNotPresent` for pinned images. |
| `resources.requests.cpu` | string | Yes | CPU reserved for scheduling. Use the resource matrix as a starting point. |
| `resources.requests.memory` | string | Yes | Memory reserved for scheduling. |
| `resources.limits.cpu` | string | No | CPU limit. Omit for latency-sensitive nodes unless cluster policy requires it. |
| `resources.limits.memory` | string | Recommended | Memory limit high enough to avoid routine OOM during sync and compaction. |
| `persistence.enabled` | boolean | Yes | Whether the node uses a PersistentVolumeClaim. Production nodes normally set this to `true`. |
| `persistence.storageClassName` | string | Recommended | Environment-specific storage class. Verify binding mode, expansion behavior, backup/snapshot workflow, and restore expectations before rollout; do not assume one class name exists across clusters. |
| `persistence.size` | string | Yes when persistence is enabled | PVC size such as `2Ti`. |
| `persistence.accessModes` | string[] | Yes when persistence is enabled | Usually `ReadWriteOnce` for single-writer node databases. |
| `persistence.mountPath` | string | Yes when persistence is enabled | Container path where chain data is stored. |
| `service.type` | string | Yes | Kubernetes Service type. Prefer `ClusterIP`; expose externally through ingress/gateway components. |
| `service.ports[].name` | string | Yes | Stable DNS/service port name, matching metadata where possible. |
| `service.ports[].port` | integer | Yes | Service port. |
| `service.ports[].targetPort` | integer/string | Yes | Container port or named port. |
| `service.ports[].protocol` | string | Yes | `TCP` or `UDP`. |
| `service.ports[].public` | boolean | Yes | Whether this port is intended for controlled public exposure. |
| `ingress.enabled` | boolean | Yes | Enables HTTP(S)/WebSocket ingress for public RPC-style traffic. |
| `ingress.className` | string | No | IngressClass name for the target cluster. |
| `ingress.hosts[]` | object[] | Required when ingress is enabled | Host/path routing rules. |
| `ingress.tls[]` | object[] | Recommended when ingress is enabled | TLS secret mapping for public endpoints. |
| `env[]` | object[] | No | Explicit environment variables. Secrets should reference Kubernetes Secrets rather than inline values. |

:::danger
Do not place private keys, JWT secrets, validator credentials, or RPC basic-auth passwords directly in `values.yaml`. Use Kubernetes Secrets, external secret operators, or the platform secret manager and mount them by reference.
:::

## Port exposure rule

`service.ports[].public` is an intent flag, not a security boundary. A port marked public still needs ingress authentication, rate limiting, method filtering, TLS, and abuse monitoring. Ports marked private must stay cluster-internal unless a chain-specific page explicitly documents a controlled exception.
