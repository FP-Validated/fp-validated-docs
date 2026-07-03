#!/usr/bin/env bash
set -euo pipefail

ENDPOINT="${SUI_GRPC_ENDPOINT:-127.0.0.1:9000}"
PROTO_DIR="${SUI_PROTO_DIR:-./proto}"
START_CHECKPOINT="${START_CHECKPOINT:-0}"

grpcurl -plaintext   -import-path "$PROTO_DIR"   -proto sui/rpc/v2beta2/subscription_service.proto   -d "{"checkpoint":{"sequence_number":"$START_CHECKPOINT"},"read_mask":{"paths":["sequence_number","digest","transactions","events"]}}"   "$ENDPOINT" sui.rpc.v2beta2.SubscriptionService/SubscribeCheckpoints
