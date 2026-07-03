---
title: Faucet API
sidebar_position: 5
last_verified: 2026-05-28
---

The Faucet API mints devnet/test environment tokens for development and test workflows ([Aptos API documentation](https://aptos.dev/build/apis)). It is not a production payment, reward, or production funding interface.

```bash
curl -sS -X POST "$APTOS_FAUCET_URL/mint?address=$APTOS_ADDRESS&amount=100000000"
```

:::danger
Never deploy or advertise faucet endpoints for production. In shared devnet/test environment environments, require authentication and quotas to prevent a single client from exhausting faucet capacity.
:::
