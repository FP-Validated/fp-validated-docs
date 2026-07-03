---
title: CORS Origin Policy
sidebar_position: 6
last_verified: 2026-05-28
---

CORS is a browser safety policy, not an authentication system. Use it to restrict which browser origins may call public read RPC from frontend code, while still requiring rate limits and authentication for protected tiers.

| Endpoint type | CORS policy | Rationale |
| --- | --- | --- |
| Public read-only RPC | Explicit allowlist for known app origins; optional low-quota public demo origin | Prevents casual browser misuse and credential leakage. |
| Authenticated partner RPC | Exact origin allowlist per key or tenant | Avoids one partner origin using another partner's browser credentials. |
| Private/indexer RPC | No browser CORS; server-to-server only | Backends do not need CORS. |
| Admin/internal APIs | No CORS and no public route | Browsers should never call these APIs. |

```nginx
add_header Access-Control-Allow-Origin "https://app.example.org" always;
add_header Access-Control-Allow-Methods "POST, OPTIONS" always;
add_header Access-Control-Allow-Headers "content-type, authorization, x-api-key" always;
add_header Access-Control-Max-Age "600" always;
```

:::warning Wildcards and credentials
Do not combine `Access-Control-Allow-Origin: *` with credentialed requests. For API-key or JWT traffic, return the exact allowed origin after validating tenant policy.
:::

Browser clients should still implement [/developer/rate-limiting](/developer/rate-limiting) and [/developer/retry-timeout-backoff](/developer/retry-timeout-backoff) behavior because CORS does not protect node capacity.
