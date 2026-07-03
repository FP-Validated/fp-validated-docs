#!/usr/bin/env bash
set -euo pipefail

: "${TX_BYTES_B64:?Set TX_BYTES_B64 to BCS transaction bytes encoded as base64}"
: "${SIGNATURES_JSON:?Set SIGNATURES_JSON to a JSON array of base64 signatures}"
ENDPOINT="${SUI_GRPC_ENDPOINT:-127.0.0.1:9000}"
PROTO_DIR="${SUI_PROTO_DIR:-./proto}"

jq -n --arg tx "$TX_BYTES_B64" --argjson sigs "$SIGNATURES_JSON"   '{transaction:$tx, signatures:$sigs, read_mask:{paths:["digest","effects","events"]}}' |
grpcurl -plaintext   -import-path "$PROTO_DIR"   -proto sui/rpc/v2beta2/transaction_execution_service.proto   -d @   "$ENDPOINT" sui.rpc.v2beta2.TransactionExecutionService/ExecuteTransaction
