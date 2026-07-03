---
title: Exposure Model
sidebar_position: 2
last_verified: 2026-07-03
---

# Tempo Exposure Model

## Public-safe operating contract

- Treat Tempo as an Internet-facing application edge.
- Publish only through a controlled gateway with authentication, quotas, TLS, and abuse monitoring.
- Keep deployment-specific ports, hostnames, and internal control surfaces private.
- Separate public consumer traffic from internal observability and management traffic.

## Shared controls

Use `/operations/rpc-exposure-policy`, `/operations/security-standards`, and `/developer/api-design-principles` as the baseline for Tempo exposure decisions.
