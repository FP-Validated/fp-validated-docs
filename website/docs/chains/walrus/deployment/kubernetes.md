---
title: Kubernetes Deployment
sidebar_position: 1
last_verified: 2026-05-29
---

# Walrus Kubernetes Deployment

Walrus needs a storage-node oriented chart profile, not a generic RPC-node profile. The public values use `charts/blockchain-node/examples/walrus-values.yaml` and follow the official Walrus operator model.

## Chart source

```text
charts/blockchain-node/examples/walrus-values.yaml
```

## Concrete chart model

| Component | Public value | Official basis |
| --- | --- | --- |
| Command | `walrus-node run --config-path /opt/walrus/config/walrus-node.yaml` | Walrus operator guide. |
| Storage path | `/opt/walrus/db` inside the container | Walrus stores slivers in RocksDB at configured storage path. |
| Storage service | `9185/TCP` | Walrus REST/storage API example. |
| Metrics | `9184/TCP`, `/metrics` | Walrus operator monitoring guide. |
| Env | `RUST_BACKTRACE=1`, `RUST_LOG=info` | Walrus operator example. |
| File limit | high file descriptor limit required | Official systemd example sets `LimitNOFILE=65536`; Kubernetes operators should apply equivalent node/pod policy where supported. |

## Render

```bash
helm template walrus charts/blockchain-node \
  -f charts/blockchain-node/examples/walrus-values.yaml
```

## Required private values

- Walrus node config secret.
- Sui client configuration secret where required.
- Storage class and size matching retention policy.
- Public service policy if the storage API is intentionally reachable.

## Exposure policy

- Storage service exposure must be explicit and reviewed.
- Metrics are private monitoring-only.
- Config and key material are delivered through secret controllers, not committed to public Git.
