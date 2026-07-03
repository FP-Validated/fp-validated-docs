#!/usr/bin/env bash
set -euo pipefail

ENDPOINT="${SUI_GRPC_ENDPOINT:-127.0.0.1:9000}"
PROTO_DIR="${SUI_PROTO_DIR:-./proto}"

grpcurl -plaintext   -import-path "$PROTO_DIR"   -proto sui/rpc/v2beta2/ledger_service.proto   -d '{"read_mask":{"paths":["sequence_number","digest","timestamp"]}}'   "$ENDPOINT" sui.rpc.v2beta2.LedgerService/GetLatestCheckpoint
