#!/usr/bin/env bash
set -euo pipefail
RPC_URL="${SOLANA_RPC_URL:-http://127.0.0.1:8899}"
TX="${SOLANA_TRANSACTION_BASE64:?set SOLANA_TRANSACTION_BASE64}"
curl -sS "$RPC_URL" -H 'Content-Type: application/json' -d "{"jsonrpc":"2.0","id":1,"method":"sendTransaction","params":["$TX",{"encoding":"base64","skipPreflight":false,"preflightCommitment":"confirmed"}]}"
