---
title: Transaction Stream gRPC
sidebar_position: 4
last_verified: 2026-05-28
---

The Transaction Stream API is a gRPC API for streaming historical and real-time transaction data into indexing processors ([Aptos API documentation](https://aptos.dev/build/apis)). It is the right feed for backfills, event processors, and read-model builders.

```text
transaction stream -> decoder -> idempotent processor -> checkpoint store -> database
```

Processors should store the last committed version/checkpoint only after their database transaction commits. On restart, resume from the stored cursor and tolerate duplicate delivery.
