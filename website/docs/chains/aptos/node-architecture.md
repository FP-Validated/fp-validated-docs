---
title: Node Architecture
sidebar_position: 2
last_verified: 2026-05-28
---

An Aptos fullnode validates and serves ledger data, accepts transactions through its REST service, peers over the Aptos network, and emits metrics for operators. The REST API is a RESTful API for client apps to interact with the chain and covers state reads, transaction submit, and transaction simulation ([Aptos REST API reference](https://aptos.dev/rest-api)).

| Component | Purpose | Operator boundary |
|---|---|---|
| Fullnode REST | Ledger info, account/state reads, transaction simulation/submission | Expose only through HTTPS gateway and policy controls |
| P2P network | Fullnode/validator synchronization | Public TCP `6180`, restricted by network policy where possible |
| Metrics | Prometheus metrics | Private monitoring network only |
| Indexer stack | Derived query data for apps | Separate database and processor lifecycle from fullnode |

:::tip
Keep the fullnode replaceable: persistent storage, network identity, and configuration should be the only durable assets. Application-specific indexes belong outside the fullnode process.
:::

## Data flow

```text
Aptos peers -> fullnode storage -> REST API -> clients
                      |-> transaction stream -> processors -> app database -> GraphQL
                      |-> metrics -> Prometheus/Grafana
```

For general production runbooks, link this page from `/operations/monitoring`, `/operations/backups`, and `/operations/incident-response` rather than duplicating global SRE policy.
