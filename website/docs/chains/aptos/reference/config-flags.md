---
title: Config Flags
sidebar_position: 2
last_verified: 2026-05-28
---

Keep Aptos configuration in versioned files mounted into the runtime. Operators should review network selection, storage path, REST listen address, metrics listen address, p2p listen address, and any indexer/transaction-stream settings during promotion.

```yaml
api:
  enabled: true
  address: 0.0.0.0:8080
inspection_service:
  port: 9101
```

Treat this page as an operator checklist; exact config keys vary by Aptos release and should be validated against release-specific upstream examples.
