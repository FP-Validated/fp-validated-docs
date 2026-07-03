---
title: gRPC Samples
sidebar_position: 1
last_verified: 2026-05-28
---

# gRPC samples

The repository scripts in `chains/sui/samples/grpcurl/` target the full node gRPC API described in the [Full Node gRPC protocol](https://docs.sui.io/references/fullnode-protocol). Set `SUI_GRPC_ENDPOINT` to your node, usually `localhost:9000` on a private network.

```bash
export SUI_GRPC_ENDPOINT=127.0.0.1:9000
bash chains/sui/samples/grpcurl/health.sh
bash chains/sui/samples/grpcurl/checkpoint.sh
OBJECT_ID=0x... bash chains/sui/samples/grpcurl/object-lookup.sh
TX_BYTES_B64=... SIGNATURES_JSON='["..."]' bash chains/sui/samples/grpcurl/submit-tx.sh
START_CHECKPOINT=100 bash chains/sui/samples/grpcurl/subscribe.sh
```

| Script | Service | Purpose |
| --- | --- | --- |
| `health.sh` | gRPC health | Verifies the listener and service health. |
| `checkpoint.sh` | `LedgerService` | Reads latest checkpoint metadata. |
| `object-lookup.sh` | `StateService` | Fetches an object by ID. |
| `submit-tx.sh` | `TransactionExecutionService` | Submits serialized transaction bytes and signatures. |
| `subscribe.sh` | `SubscriptionService` | Streams checkpoints from a starting cursor. |

:::note
Method names in the scripts follow the protobuf service names published by Sui. If your installed proto set uses a newer package or RPC name, update the local `PROTO_DIR` without changing endpoint policy.
:::
