#!/usr/bin/env bash
set -euo pipefail
RPC_URL="${SOLANA_RPC_URL:-http://127.0.0.1:8899}"
ACCOUNT="${SOLANA_ACCOUNT:?set SOLANA_ACCOUNT}"
curl -sS "$RPC_URL" -H 'Content-Type: application/json' -d "{"jsonrpc":"2.0","id":1,"method":"getAccountInfo","params":["$ACCOUNT",{"encoding":"base64","commitment":"confirmed"}]}"
