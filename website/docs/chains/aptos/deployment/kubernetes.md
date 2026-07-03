---
title: Kubernetes Deployment
sidebar_position: 1
last_verified: 2026-05-29
---

# Aptos Kubernetes Deployment

Aptos fullnode deployment should model the official PFN/VFN runtime expectations: persistent data, public peer networking, private inspection/admin endpoints, and gatewayed REST API.

## Chart source

```text
charts/blockchain-node/examples/aptos-values.yaml
```

## Concrete chart model

| Component | Public value | Official basis |
| --- | --- | --- |
| Image family | `aptoslabs/validator` or pinned operator image | Aptos Docker and Helm docs. |
| Command | `aptos-node -f /opt/aptos/etc/fullnode.yaml` | Aptos Docker PFN docs. |
| Data path | `/opt/aptos/data` | Aptos fullnode config. |
| Public peer port | `6182/TCP` for PFN public network | Aptos PFN requirements. |
| REST API | `8080/TCP` | Aptos API config; expose only through auth/rate limit. |
| Inspection metrics | `9101/TCP`, `/metrics` | Aptos inspection service docs. |
| Admin service | `9102/TCP` | Internal only; never public. |
| Production sizing | high CPU, 128Gi RAM class, multi-TB NVMe for validator/VFN-grade nodes | Aptos node requirements. |

## Render

```bash
helm template aptos charts/blockchain-node \
  -f charts/blockchain-node/examples/aptos-values.yaml
```

## Exposure policy

- Public peer networking can be exposed.
- REST API is private or gatewayed with authentication/rate limiting.
- Inspection and admin services are never public.
- NTP/system clock synchronization is required operationally.
