---
title: Storage Matrix
sidebar_position: 5
last_verified: 2026-05-28
---

Storage behavior differs more by chain than by deployment runtime. Use this matrix to decide whether a node can be pruned, must retain historical state, or should delegate historical queries to an indexer.

| Chain | Disk growth profile | Snapshot / restore expectation | Retention and pruning guidance |
| --- | --- | --- | --- |
| Ethereum | Execution state grows continuously; archive and trace modes expand into many TiB. Consensus client data is separate from execution data. | Prefer client-native snapshots or volume snapshots only when client processes are stopped or quiesced. Validate both execution and consensus data after restore. | Pruned full nodes are appropriate for most RPC and validator-support use cases. Archive/trace nodes are a separate capacity class and should not share disks with high-traffic public RPC. |
| Sui | Checkpoint and object storage growth depends on network throughput, pruning configuration, and API retention needs. RocksDB compaction can create bursty write amplification. | Restore from a known-good database snapshot when available, then verify checkpoint progress and API reads before adding traffic. | Keep enough checkpoint/object history for the advertised API contract. Use pruning for normal full nodes; long-retention API nodes require explicit capacity planning. |
| Aptos | Ledger state, state sync data, and indexer databases grow independently. GraphQL/indexer workloads often outgrow fullnode storage first. | Restore fullnode data and indexer database snapshots as separate artifacts; verify ledger version and processor lag after restore. | Prune fullnodes according to operational requirements. Archive and indexer-backed query service should be treated as separate storage tiers with database backup policy. |
| Solana | Ledger/blockstore and account indexes are high-throughput, disk-IO-sensitive workloads. Retaining long history materially changes disk requirements. | Use validator/RPC snapshot flows for fast bootstrapping, then confirm slot catch-up and account index readiness before serving RPC. | Most RPC nodes use bounded ledger retention. Historical/archive service needs a deliberate retention policy and substantially larger NVMe capacity. |

:::warning
Volume snapshots are not automatically application-consistent. For every chain, document whether the node was stopped, what height/checkpoint/slot was captured, and which API checks proved the restored data before promoting the node.
:::
