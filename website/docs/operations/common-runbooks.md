---
title: Common Runbooks
sidebar_position: 1
last_verified: 2026-05-28
---

Common runbooks keep chain operations predictable across Ethereum, Sui, Aptos, and Solana. Chain pages provide command details; this page defines the shared structure every operator should follow.

## Required runbook sections

| Section | Purpose | Minimum content |
| --- | --- | --- |
| Trigger | When to start the runbook | Alert name, dashboard panel, manual observation, or upstream advisory. |
| Scope | What the runbook affects | Chain, network, node role, customer-facing endpoint, and expected blast radius. |
| Preconditions | Safety checks before action | Current sync status, peer count, recent backups, maintenance window, and rollback path. |
| Procedure | Ordered steps | Commands, expected output, timeout, and where to stop if output differs. |
| Validation | How success is proven | Health checks, RPC smoke tests, metrics recovery, and log patterns. |
| Rollback | How to return to the previous state | Previous image/config, snapshot, DNS or load balancer reversal, and data-dir handling. |
| Escalation | Who gets involved | On-call owner, chain specialist, security owner, and communications lead. |

:::warning Safety boundary
Never improvise destructive actions against a validator, archive node, or production RPC fleet. If a runbook does not cover the condition, pause at the first safe boundary and escalate using `/operations/incident-response`.
:::

## Common operational flows

### Node restart

1. Confirm the node is safe to restart: it is not the only healthy node behind a production endpoint, and the peer set has redundancy.
2. Drain traffic from the gateway or load balancer when the node serves RPC.
3. Capture current status: block height or checkpoint, peer count, process image, and recent error logs.
4. Restart with the deployment runtime documented on the chain page.
5. Validate local health and sync recovery before returning traffic.

```bash
# Example smoke pattern; replace the URL and method with the chain-specific endpoint.
curl -fsS http://127.0.0.1:8545 \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"eth_syncing","params":[]}'
```

### Configuration change

1. Review the chain-specific reference pages for ports, flags, and images.
2. Apply the change to a non-production node first.
3. Render or preview the deployment artifact before applying.
4. Roll one node at a time unless the change is a security emergency.
5. Keep the previous config and image tag available until validation completes.

### Upgrade or rollback

Use the chain page for version-specific instructions. The shared rule is simple: separate binary upgrades from state changes whenever possible, and prove a rollback path before touching production.

| Check | Upgrade | Rollback |
| --- | --- | --- |
| Backup | Fresh snapshot or volume backup exists | Snapshot from before the upgrade is available |
| Compatibility | Upstream release notes reviewed | Downgrade is supported or data restore is planned |
| Traffic | Node drained before restart | Node remains drained until healthy |
| Validation | Sync resumes and RPC smoke passes | Previous version serves expected responses |

## Cross-links

- Use `/operations/monitoring-standards` for alert and dashboard expectations.
- Use `/operations/backup-standards` before state-changing work.
- Use `/operations/security-standards` before exposing any endpoint.
- Use `/operations/rpc-exposure-policy` for the canonical endpoint exposure classes.
