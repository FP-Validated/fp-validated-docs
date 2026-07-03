#!/usr/bin/env bash
set -euo pipefail

ENDPOINT="${SUI_GRPC_ENDPOINT:-127.0.0.1:9000}"
grpcurl -plaintext "$ENDPOINT" grpc.health.v1.Health/Check
