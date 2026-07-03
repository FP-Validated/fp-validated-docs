---
title: Public RPC Operations
sidebar_position: 2
last_verified: 2026-07-03
---

# Optimism Public RPC Operations

## Operating focus

The public-safe operating goal is to keep the Optimism RPC surface healthy for application traffic while preserving strict separation between public edge traffic and internal rollup operations.

## Control points

- Route public clients through a controlled gateway.
- Keep batch, timeout, and method controls outside the node process.
- Treat WebSocket clients as streaming consumers with connection quotas.
- Keep rollup-control, peer, metrics, and admin surfaces private.

## Documentation boundary

This page describes the public operational contract only. Exact upstream layout, sequencer/backing-node topology, hostnames, and private endpoints stay out of the public docs.
