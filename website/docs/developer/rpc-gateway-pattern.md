---
title: RPC Gateway Pattern
sidebar_position: 2
last_verified: 2026-05-28
---

Do not expose raw node RPC ports directly to untrusted clients. Put a gateway layer between callers and node processes so authentication, TLS, rate limits, request shaping, logging, and method policy are applied consistently.

```text
internet / partner network
        |
        v
+-------------------------+
| TLS load balancer       |
| - certificate rotation  |
| - HTTP/2 or WebSocket   |
+-------------------------+
        |
        v
+-------------------------+
| API gateway / proxy     |
| - API key or JWT auth   |
| - token bucket limits   |
| - CORS origin policy    |
| - method allowlist      |
| - request size limits   |
+-------------------------+
        |
        v
+-------------------------+
| private node pool       |
| - read RPC nodes        |
| - WS subscription nodes |
| - submit nodes          |
+-------------------------+
        |
        v
+-------------------------+
| internal-only services  |
| - admin RPC             |
| - metrics               |
| - consensus/engine APIs |
+-------------------------+
```

| Layer | Responsibility | Common implementation |
| --- | --- | --- |
| TLS termination | Public certificates, protocol negotiation, cipher policy | Cloud load balancer, nginx, Envoy |
| Auth proxy | API key validation, JWT validation, partner allowlists | Envoy external auth, nginx auth_request, API gateway plugin |
| Rate limiter | Per-key, per-IP, method, and connection budgets | Envoy rate limit service, Redis token bucket |
| Method policy | Allow public read methods; block admin/debug methods | Gateway route rules or JSON-RPC method filter |
| Upstream pool | Separate read, write, WebSocket, and internal nodes | Kubernetes services, service mesh, DNS pools |

:::warning Exposure boundary
Gateway controls reduce risk, but they do not make unsafe methods safe. Keep admin namespaces, Ethereum Engine API, Beacon API internals, metrics, and validator management ports off public routes.
:::

## Minimal nginx-style shape

```nginx
server {
  listen 443 ssl http2;
  server_name rpc.example.org;

  client_max_body_size 1m;

  location / {
    auth_request /_auth;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Request-Id $request_id;
    proxy_read_timeout 30s;
    proxy_pass http://private-rpc-pool;
  }

  location /ws {
    auth_request /_auth;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 3600s;
    proxy_pass http://private-ws-pool;
  }
}
```

Use [/developer/rate-limiting](/developer/rate-limiting), [/developer/cors-origin-policy](/developer/cors-origin-policy), and [/developer/websocket-scaling](/developer/websocket-scaling) to size the gateway policy.
