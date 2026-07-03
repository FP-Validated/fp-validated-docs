#!/usr/bin/env bash
set -euo pipefail
RPC_URL="${RPC_URL:-http://127.0.0.1:8545}"
FROM_BLOCK="${1:-0x0}"
TO_BLOCK="${2:-latest}"
ADDRESS="${3:-0xdAC17F958D2ee523a2206206994597C13D831ec7}"
TRANSFER_TOPIC="0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
curl -sS "$RPC_URL" -H 'content-type: application/json'   -d "{"jsonrpc":"2.0","id":1,"method":"eth_getLogs","params":[{"fromBlock":"$FROM_BLOCK","toBlock":"$TO_BLOCK","address":"$ADDRESS","topics":["$TRANSFER_TOPIC"]}]}"
echo
