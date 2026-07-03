---
title: Docker Deployment
sidebar_position: 1
last_verified: 2026-05-28
---

Use Docker for a single fullnode, local validation, or a simple edge node where the host owns storage and systemd/supervision. Mount persistent Aptos data and configuration into the container, publish REST only behind a reverse proxy, and keep metrics private.

```yaml
services:
  aptos-fullnode:
    image: aptoslabs/validator:production
    command: ["aptos-node", "-f", "application directory/aptos/etc/fullnode.yaml"]
    ports:
      - "6180:6180"
      - "127.0.0.1:8080:8080"
      - "127.0.0.1:9101:9101"
    volumes:
      - ./fullnode.yaml:application directory/aptos/etc/fullnode.yaml:ro
      - aptos-data:application directory/aptos/data
volumes:
  aptos-data: {}
```

:::warning
Do not bind `8080` or `9101` directly to the public internet. Route REST through TLS, auth, and rate limiting; scrape metrics from a private network.
:::
