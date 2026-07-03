#!/usr/bin/env bash
set -euo pipefail
RPC_URL="${SOLANA_RPC_URL:-http://127.0.0.1:8899}"
PROGRAM_ID="${SOLANA_PROGRAM_ID:-11111111111111111111111111111111}"
curl -sS "$RPC_URL" -H 'Content-Type: application/json' -d "{"jsonrpc":"2.0","id":1,"method":"getProgramAccounts","params":["$PROGRAM_ID",{"encoding":"base64","commitment":"confirmed","filters":[{"dataSize":0}]}]}"
