---
title: Test Deployment
sidebar_position: 4
last_verified: 2026-05-28
---

Deployment tests prove that documentation, sample assets, metadata, and runtime manifests agree. Test with disposable infrastructure or a non-production network before requesting review.

## Test layers

| Layer | What to validate | Evidence |
| --- | --- | --- |
| Docker Compose | Container starts, volumes mount, ports match metadata, health check works | `docker compose config` and a successful local smoke test. |
| Kubernetes | Manifests render, probes and resources are valid, network policy matches exposure class | `kubectl apply --dry-run=server` or equivalent cluster validation. |
| Helm | Values render without missing templates and match documented defaults | `helm template` output reviewed for ports, images, volumes, and secrets. |
| Argo CD | Application points to the intended chart/path and namespace | Rendered Application manifest and sync policy review. |
| RPC smoke | Documented endpoint answers a safe method | HTTP, WebSocket, gRPC, GraphQL, or REST smoke command output. |

:::warning Do not test against production first
A deployment guide is not ready if its first full run is a production change. Use a local node, devnet, test environment, or isolated namespace.
:::

## Docker Compose validation

```bash
docker compose -f chains/<chain>/docker-compose.yml config
docker compose -f chains/<chain>/docker-compose.yml up -d
```

After startup, check logs and run the chain-specific health or sync query documented in the sample page.

## Helm validation

```bash
helm template <release> chains/<chain>/helm \
  --namespace <namespace> \
  --values chains/<chain>/helm/values.yaml
```

Review the rendered output for:

- Image repository and tag.
- Persistent volume claims.
- Service ports and names.
- Probes.
- Secret references without inline secret values.
- NetworkPolicy or equivalent controls for private ports.

## RPC smoke validation

Use the safest read-only method for the interface:

```bash
# JSON-RPC example
curl -fsS "$RPC_URL" \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"web3_clientVersion","params":[]}'
```

```bash
# REST example
curl -fsS "$REST_URL/v1/-/healthy"
```

```bash
# GraphQL example
curl -fsS "$GRAPHQL_URL" \
  -H 'content-type: application/json' \
  -d '{"query":"query { chainIdentifier }"}'
```

For streaming interfaces, validate connection setup and clean shutdown; do not leave unbounded subscriptions running after the test.

## Pass criteria

| Area | Pass condition |
| --- | --- |
| Runtime | The documented runtime starts from a clean checkout. |
| Ports | Exposed ports match `metadata.yaml` and `/operations/rpc-exposure-policy`. |
| Secrets | No real secrets appear in rendered manifests or compose files. |
| Health | Node health check succeeds or reports expected sync progress. |
| RPC | At least one documented smoke query succeeds. |
| Cleanup | Test resources can be stopped and removed cleanly. |
