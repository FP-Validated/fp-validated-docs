---
title: Auth and API Keys
sidebar_position: 5
last_verified: 2026-05-28
---

Authentication identifies the caller before the gateway spends node capacity. Authorization decides which methods, quotas, networks, and upstream pools that caller may use.

| Mechanism | Use when | Notes |
| --- | --- | --- |
| API key | Server-to-server read RPC, partner access, sample app quotas | Easy to issue and revoke; send over HTTPS only. |
| JWT | Short-lived delegated access or internal service identity | Validate issuer, audience, expiry, and signing key rotation. |
| mTLS | Internal service mesh or high-trust partner integration | Strong identity, higher operational overhead. |
| Network allowlist | Admin, validator, and internal-only APIs | Use with auth, not instead of auth. |

API keys should be scoped: environment, chain, methods, quota tier, and optional origin or CIDR restrictions. Store only hashed keys in the control plane, show the secret once, and support revocation without redeploying the gateway.

```json
{
  "key_id": "prod-indexer-01",
  "chains": ["ethereum", "solana"],
  "methods": ["read", "simulate", "submit"],
  "rate_limit_per_second": 50,
  "expires_at": "2026-12-31T00:00:00Z"
}
```

Ethereum Engine API is a separate case: execution and consensus clients authenticate Engine API calls with a shared JWT secret and the interface must remain internal ([Execution APIs](https://github.com/ethereum/execution-apis)). Do not reuse public API keys for Engine API, validator, or admin traffic.

:::danger Secret handling
Never put API keys, JWT secrets, or Engine API JWT files in sample repositories, screenshots, browser bundles, or public documentation examples. Use environment variables or secret stores.
:::
