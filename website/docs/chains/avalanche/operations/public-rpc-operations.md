---
title: Public RPC Operations
sidebar_position: 2
last_verified: 2026-07-03
---

# Avalanche Public RPC Operations

## Operating focus

The public-safe operating goal is simple: keep the Avalanche RPC surface healthy for application traffic without exposing raw node interfaces.

## Control points

- Route clients through a controlled gateway.
- Separate public traffic from trusted backend traffic where possible.
- Apply batch, body-size, timeout, and connection limits before requests hit the node.
- Monitor latency, error rate, and reconnect storms for WebSocket clients.
- Keep admin/debug/trace methods private unless an explicitly authenticated design exists.

## Documentation boundary

This page describes the public operational contract only. Exact upstream layout, node count, hostnames, and private endpoints stay out of the public docs.
