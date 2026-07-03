---
title: REST API Samples
sidebar_position: 1
last_verified: 2026-05-28
---

The REST samples use `APTOS_NODE_URL` and default to Aptos Labs public production when unset. They cover ledger info, account reads, resources, transaction lookup, simulation, and submission against the fullnode REST API documented at [Aptos REST API reference](https://aptos.dev/rest-api).

```bash
export APTOS_NODE_URL=https://fullnode.production.aptoslabs.com/v1
./chains/aptos/samples/rest/ledger-info.sh
./chains/aptos/samples/rest/get-account.sh 0x1
./chains/aptos/samples/rest/account-resources.sh 0x1
./chains/aptos/samples/rest/get-transaction.sh 0xTRANSACTION_HASH
```

Simulation and submission require signed transaction bytes. The shell samples intentionally accept caller-provided JSON/BCS payload paths so signing remains in the application or SDK boundary.
