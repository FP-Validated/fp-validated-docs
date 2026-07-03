---
title: New Chain Template
sidebar_position: 5
last_verified: 2026-05-28
---

Use this template when adding `website/docs/chains/<chain>/` and the matching `chains/<chain>/metadata.yaml`. It is the source checklist for `/contributing/add-new-chain`.

## Required document tree

```text
website/docs/chains/<chain>/
├── overview.md
├── node-architecture.md
├── deployment/
│   ├── docker.md
│   ├── kubernetes.md
│   ├── helm-values.md
│   └── argocd.md
├── developer-interfaces/
│   ├── rpc-api-matrix.md
│   ├── <interface>.md
│   └── authentication-exposure-policy.md
├── samples/
│   └── <sample-group>.md
├── operations/
│   ├── initial-sync.md
│   ├── snapshot-restore.md
│   ├── upgrade-rollback.md
│   ├── backup.md
│   ├── monitoring.md
│   └── troubleshooting.md
└── reference/
    ├── ports.md
    ├── config-flags.md
    ├── images.md
    ├── resources.md
    └── official-references.md
```

Every markdown file needs frontmatter:

```yaml
---
title: Human Title
sidebar_position: 1
last_verified: 2026-05-28
---
```

The chain `overview.md` also carries chain metadata in frontmatter:

```yaml
---
title: Example Chain
sidebar_position: 1
last_verified: 2026-05-28
chain: example
category: evm
status: draft
supported_runtimes: [docker, kubernetes, helm, argocd]
developer_interfaces: [json-rpc, websocket]
sample_languages: [typescript, bash]
---
```

## Page content checklist

| Page | Required content |
| --- | --- |
| `overview.md` | What the chain is, supported networks, node roles, supported runtimes, developer interfaces, sample index, and official references. |
| `node-architecture.md` | Node roles, data flow, storage, networking, and operator boundaries. |
| `deployment/docker.md` | Compose or Docker run flow, volumes, ports, environment variables, startup, validation, and cleanup. |
| `deployment/kubernetes.md` | Workloads, services, PVCs, probes, resources, secrets, and network policy. |
| `deployment/helm-values.md` | Important values, image tags, resources, persistence, service exposure, and secret references. |
| `deployment/argocd.md` | Application shape, sync policy, namespace, values source, and promotion guidance. |
| `developer-interfaces/rpc-api-matrix.md` | Interface matrix with status words: Recommended, Standard, Deprecated, Internal, or Advanced. |
| Interface pages | Transport, port, auth, safe methods, smoke tests, client examples, limits, and official citations. |
| `developer-interfaces/authentication-exposure-policy.md` | Chain-specific endpoint table that links to `/operations/rpc-exposure-policy`. |
| Sample pages | Purpose, prerequisites, environment variables, run command, expected output, errors, and production notes. |
| Operations pages | Initial sync, snapshot restore, upgrade rollback, backup, monitoring, and troubleshooting procedures. |
| Reference pages | Ports, flags, images, resource sizing, and official upstream links. |

:::warning Keep policy shared
Do not duplicate broad security, monitoring, backup, incident, or exposure policy in every chain. Link to `/operations/security-standards`, `/operations/monitoring-standards`, `/operations/backup-standards`, `/operations/incident-response`, and `/operations/rpc-exposure-policy`.
:::

## Sample metadata.yaml

Create `chains/<chain>/metadata.yaml` with the same operational facts documented in the chain pages. Validate it against `chains/_schema/metadata.schema.json` when the schema is present.

```yaml
chain: example
category: evm
status: draft
lastVerified: 2026-05-28
runtimes:
  - docker
  - kubernetes
  - helm
  - argocd
developerInterfaces:
  - name: JSON-RPC
    status: recommended
    transport: http
    port: 8545
  - name: WebSocket
    status: standard
    transport: websocket
    port: 8546
  - name: Engine API
    status: internal
    transport: http
    port: 8551
ports:
  - name: p2p
    port: 30303
    protocol: tcp
    public: true
  - name: json-rpc
    port: 8545
    protocol: tcp
    public: false
  - name: websocket
    port: 8546
    protocol: tcp
    public: false
  - name: metrics
    port: 6060
    protocol: tcp
    public: false
samples:
  required:
    - health-check
    - query-latest-block
    - query-account
    - simulate-transaction
    - submit-transaction
    - subscribe-events
```

## Minimum links

Each new chain should link to these shared pages where relevant:

- `/operations/rpc-exposure-policy`
- `/operations/security-standards`
- `/operations/monitoring-standards`
- `/operations/backup-standards`
- `/operations/common-runbooks`
- `/contributing/verify-official-docs`
- `/contributing/test-deployment`

## Final review

Before requesting review, confirm the chain docs, `metadata.yaml`, generated matrices, and sample assets agree. The chain is not ready if an interface appears in only one of those places.
