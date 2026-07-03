#!/usr/bin/env bash
set -euo pipefail

: "${OBJECT_ID:?Set OBJECT_ID to the Sui object ID, for example 0x2}"
ENDPOINT="${SUI_GRPC_ENDPOINT:-127.0.0.1:9000}"
PROTO_DIR="${SUI_PROTO_DIR:-./proto}"

grpcurl -plaintext   -import-path "$PROTO_DIR"   -proto sui/rpc/v2beta2/state_service.proto   -d "{"object_id":"$OBJECT_ID","read_mask":{"paths":["object_id","version","digest","owner","object_type","contents"]}}"   "$ENDPOINT" sui.rpc.v2beta2.StateService/GetObject
