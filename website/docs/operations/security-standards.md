---
title: Security Standards
sidebar_position: 4
last_verified: 2026-05-28
---

Security standards apply to every chain runtime and every developer interface. Chain-specific pages can tighten these controls, but they must not weaken the shared baseline.

## Network segmentation

| Zone | Allowed traffic | Examples |
| --- | --- | --- |
| Public edge | HTTPS through gateway, WAF, or load balancer | Public JSON-RPC with controls, public documentation, status pages. |
| Peer network | Chain P2P ports only | Ethereum execution P2P, Solana gossip, Sui P2P. |
| Internal services | Private RPC, consensus APIs, databases, metrics | Beacon API, Sui gRPC, Aptos indexer database, Prometheus scrape targets. |
| Admin plane | SSH, Kubernetes API, secret manager, CI deploy access | Restricted by identity, device posture, and audit logging. |

:::danger No raw node ports public
Do not expose raw node RPC, metrics, admin, engine, database, or consensus API ports directly to the internet. Public access must terminate at a controlled gateway with TLS, rate limits, request limits, logging, and an allowlist or authentication policy appropriate to the interface class.
:::

## Firewall baseline

- Default-deny inbound traffic.
- Permit chain P2P only where the node role requires public peers.
- Permit metrics only from Prometheus or the monitoring collector.
- Permit admin access only from managed bastions, VPN, or private control planes.
- Block metadata service access from workloads unless explicitly required.
- Keep RPC backends on private networks behind gateways.

```yaml
# Kubernetes NetworkPolicy shape for private metrics access.
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-prometheus-to-node-metrics
spec:
  podSelector:
    matchLabels:
      app: chain-node
  policyTypes: [Ingress]
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              name: monitoring
      ports:
        - protocol: TCP
          port: 9184
```

## Secrets handling

| Secret | Storage | Rotation trigger |
| --- | --- | --- |
| API keys | Secret manager or sealed secret system | Employee departure, suspected leak, partner offboarding, scheduled rotation. |
| Engine/JWT secrets | Secret manager mounted at runtime | Client migration, host compromise, accidental disclosure. |
| Validator/signing keys | Dedicated signing system or approved secret workflow | Policy only; never ad hoc copy. |
| Database credentials | Secret manager with per-environment separation | Schema migration, access change, suspected leak. |

Never commit secrets to documentation, examples, Helm values, Docker Compose files, support bundles, or screenshots. Sample configs must use obvious non-secret values such as `REPLACE_ME` only where the surrounding prose explains how to provide a real secret securely.

## Container image supply chain

Externally provided images (for example, foundation-provided client images) must be admitted through the internal registry and its vulnerability scan gate, not deployed directly from a public or foundation registry.

- Mirror the external image into the internal registry under an explicit tag or digest.
- Require an automatic vulnerability scan on push.
- Block pulls of images that reach or exceed the defined severity threshold, so a vulnerable image cannot be deployed.
- Reference the internal image in deployment state and pull it with a scoped, pull-only credential.

See [Container Image Supply Chain](/fp-validated-infra/image-supply-chain) for the full architecture and gate behaviour.

## RPC hardening

Use `/operations/rpc-exposure-policy` as the canonical classification. At minimum:

- Public-safe endpoints still require TLS, rate limits, request body limits, method allowlists, logging, and abuse response.
- Internal-only endpoints must not have a public route.
- Admin/authenticated endpoints require identity, authorization, audit logs, and narrow source networks.
- Streaming endpoints require connection caps, idle timeouts, backpressure handling, and per-consumer quotas.

:::warning Method allowlists
For JSON-RPC, method namespace exposure matters as much as port exposure. Do not publish debug, trace, admin, personal, miner, unsafe transaction injection, or node-management methods unless a chain-specific page explicitly classifies them behind admin/authenticated controls.
:::

## Operational access

- Use individual identities, not shared operator accounts.
- Require MFA for consoles, Git hosting, CI/CD, cloud, and secret manager access.
- Keep production deploy permissions separate from read-only observability.
- Log administrative actions and retain audit logs outside the node host.
- Remove access promptly during offboarding or role changes.
