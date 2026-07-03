---
title: Monitoring
sidebar_position: 1
last_verified: 2026-07-03
---

Monitor BSC RPC as a managed application edge, not as a node-internal control plane. The most useful signals are gateway availability, RPC latency, error rates, and subscription stability. If a backend exposes additional node metrics, keep them private and use them only for operator dashboards.

::::warning Public-safe monitoring boundary
Do not expose raw metrics, peer state, debug output, or client internals on the public route. Monitoring data should come from private observability systems and the gateway layer.
::::

| Signal | Source | Alert condition |
| --- | --- | --- |
| RPC availability | `eth_blockNumber` or a lightweight gateway health probe | Requests fail, stall, or drift away from expected head freshness. |
| Sync freshness | `eth_syncing` when the provider exposes it | A serving endpoint unexpectedly reports syncing or lags too far behind peers. |
| Read latency | `eth_call`, `eth_getBalance`, `eth_getLogs` timings | Latency rises above the service objective or tails become unstable. |
| Error rate | Gateway and application logs | 5xx spikes, repeated timeouts, or 429 saturation. |
| Subscription health | WebSocket disconnect and reconnect counters | Reconnect storms, dropped subscriptions, or missed replay windows. |
| Query shape | `eth_getLogs` range size and batch size | Overly large scans or batch requests that threaten node stability. |

## Response pattern

- Page operators if availability or head freshness drops.
- Rate-limit or temporarily disable abusive callers before the node becomes unstable.
- Reconnect and backfill WebSocket consumers instead of assuming subscriptions survive disconnects.
- Keep alert thresholds simple and tied to the managed RPC contract.
