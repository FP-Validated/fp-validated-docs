---
title: Resource Matrix
sidebar_position: 4
last_verified: 2026-07-03
---

These are public-safe starting envelopes for production planning, not live cluster sizing or node placement. Validate them with chain sync lag, RPC p95 latency, disk growth, compaction pressure, and peer count before committing an SLO.

| Chain | Node type | CPU | RAM | Disk | Primary scale signal |
| --- | --- | --- | --- | --- | --- |
| Ethereum | Full execution + consensus | 4-8 vCPU | 16-32 GiB | 2+ TiB NVMe | Head lag, peer count, RPC latency |
| Ethereum | Archive / trace | 16+ vCPU | 64+ GiB | Many TiB NVMe | Trace latency, compaction stalls, free space |
| Sei | Validator/full node | Chain-specific | Chain-specific | Fast persistent storage sized for state growth | Block lag, peer count, RPC/API latency, signer safety |
| Stable | Validator/full node plus EVM-facing services | Chain-specific | Chain-specific | Fast persistent storage sized for state and EVM data growth | Consensus lag, EVM RPC p95, disk growth, signer safety |
| Initia | Validator/full node | Chain-specific | Chain-specific | Fast persistent storage sized for state growth | Block lag, peer count, RPC/API latency, signer safety |
| Walrus | Storage node | Chain-specific; storage-heavy profile | Chain-specific | Environment-specific storage sized for blob/checkpoint growth | Storage availability, checkpoint lag, disk pressure, metrics health |
| Canton | Participant/synchronizer services | Chain-specific | Chain-specific | Persistent storage sized for ledger and participant state | Participant health, synchronization lag, API latency, storage growth |
| Sui | Full node | 4-8 vCPU | 16-32 GiB | Fast SSD sized for checkpoint growth | Checkpoint lag, RocksDB pressure, API latency |
| Sui | Archive / long-retention API | 8-16 vCPU | 32-64 GiB | Multi-TiB SSD/NVMe | Historical query latency, checkpoint retention growth |
| Aptos | Fullnode | 4 vCPU | 16 GiB | 2+ TiB SSD | REST p95, sync lag, storage growth |
| Aptos | Archive / indexer-backed API | 8+ vCPU plus DB capacity | 32+ GiB | Multi-TiB SSD plus indexer database | Processor lag, GraphQL latency, database saturation |
| Solana | Full RPC node | 16+ vCPU | 128+ GiB | Fast local NVMe | Slot lag, account index memory, RPC p95 |
| Solana | Archive / historical RPC | 32+ vCPU | 256+ GiB | Large NVMe set plus ledger retention capacity | Ledger retention, blockstore growth, replay latency |

:::tip
Separate heavy indexing, tracing, and public RPC traffic from validator-critical or consensus-adjacent workloads. Saturating disk or CPU on a node process usually shows up as sync lag before it shows up as a clean crash.
:::
