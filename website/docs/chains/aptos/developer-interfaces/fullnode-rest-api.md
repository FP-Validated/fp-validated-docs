---
title: Fullnode REST API
sidebar_position: 2
last_verified: 2026-05-28
---

The fullnode REST API is built into the Aptos fullnode and provides low-level access for state reads, transaction submission, and transaction simulation ([Aptos API documentation](https://aptos.dev/build/apis), [Aptos REST API reference](https://aptos.dev/rest-api)). It is the default interface for wallets, backend services, and operational health checks.

| Operation | REST pattern | Sample |
|---|---|---|
| Ledger health | `GET /v1` | `chains/aptos/samples/rest/ledger-info.sh` |
| Account read | `GET /v1/accounts/{address}` | `get-account.sh` |
| Resources | `GET /v1/accounts/{address}/resources` | `account-resources.sh` |
| Transaction lookup | `GET /v1/transactions/by_hash/{hash}` | `get-transaction.sh` |
| Simulation | `POST /v1/transactions/simulate` | `simulate.sh` |
| Submission | `POST /v1/transactions` | `submit.sh` |

```bash
APTOS_NODE_URL=https://fullnode.production.aptoslabs.com/v1 \
  ./chains/aptos/samples/rest/ledger-info.sh
```

:::warning
Simulation and submission endpoints accept attacker-controlled payloads. Enforce body-size limits and per-identity rate limits before traffic reaches the node.
:::
