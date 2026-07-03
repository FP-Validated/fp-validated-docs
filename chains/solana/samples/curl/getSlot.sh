#!/usr/bin/env bash
set -euo pipefail
RPC_URL="${SOLANA_RPC_URL:-http://127.0.0.1:8899}"
COMMITMENT="${SOLANA_COMMITMENT:-confirmed}"
curl -sS "$RPC_URL" -H 'Content-Type: application/json' -d "{"jsonrpc":"2.0","id":1,"method":"getSlot","params":[{"commitment":"$COMMITMENT"}]}"
