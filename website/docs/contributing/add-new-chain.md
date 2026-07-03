---
title: Add New Chain
sidebar_position: 1
last_verified: 2026-05-28
---

Use this flow when adding a new chain to FP Validated. The result should be a complete chain folder, metadata that can drive generated matrices, and runnable samples for the required developer interfaces.

## 1. Copy the template

Start from `/chains/new-chain-template`, then create the chain docs under `website/docs/chains/<chain>/` using the required structure. Keep filenames lowercase and stable because links use absolute paths.

```bash
mkdir -p website/docs/chains/<chain>/{deployment,developer-interfaces,samples,operations,reference}
```

Do not copy chain-specific claims from another chain unless the upstream documentation confirms they apply.

## 2. Fill metadata.yaml

Create `chains/<chain>/metadata.yaml` and validate it against `chains/_schema/metadata.schema.json`. The metadata drives generated reference tables and helps reviewers see whether the docs match the sample deployment.

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
ports:
  - name: p2p
    port: 30303
    protocol: tcp
    public: true
samples:
  required:
    - health-check
    - query-latest-block
    - submit-transaction
```

:::warning Metadata must match docs
If a port, interface, runtime, sample, or status appears in metadata, the matching chain page must document it. If a chain page documents an interface, metadata must include it.
:::

## 3. Add per-chain docs

Mirror the structure in `/chains/new-chain-template`:

- `overview.md`
- `node-architecture.md`
- `deployment/docker.md`
- `deployment/kubernetes.md`
- `deployment/helm-values.md`
- `deployment/argocd.md`
- `developer-interfaces/rpc-api-matrix.md`
- One page per developer interface.
- `developer-interfaces/authentication-exposure-policy.md` linking to `/operations/rpc-exposure-policy`.
- Sample pages for each required sample group.
- Operations pages for initial sync, snapshot restore, upgrade rollback, backup, monitoring, and troubleshooting.
- Reference pages for ports, config flags, images, resources, and official references.

## 4. Generate shared matrices

After metadata is present, run the generator scripts from the repository root:

```bash
npx tsx scripts/generate-rpc-matrix.ts
npx tsx scripts/generate-port-matrix.ts
```

Review the generated diff. A new chain should appear in the RPC matrix and port matrix with the same interface names, statuses, ports, and public/private flags as `metadata.yaml`.

## 5. Add samples

Create or update `chains/<chain>/` sample assets for each required sample. Samples must be realistic: health check, sync-state query, account/object read, transaction query, simulation or dry run when supported, submit transaction, event/log query, streaming, indexer, and production client behavior such as reconnect, backoff, and metrics.

## 6. Verify official docs

Before review, complete `/contributing/verify-official-docs`. Every interface status, deprecation, port, method name, and runtime recommendation should be traceable to official documentation or clearly marked as an FP Validated operational policy.

## Review checklist

| Area | Pass condition |
| --- | --- |
| Metadata | Conforms to schema and matches docs. |
| Structure | Chain folder mirrors the template. |
| Links | Absolute links resolve under route base `/`. |
| Exposure | Public/internal/admin/streaming decisions link to `/operations/rpc-exposure-policy`. |
| Samples | Required samples exist and match documented interfaces. |
| Verification | `last_verified` is current and official references are cited inline. |
