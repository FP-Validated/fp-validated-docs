#!/usr/bin/env bash
set -euo pipefail
RPC_URL="${RPC_URL:-http://127.0.0.1:8545}"
ADDRESS="${1:-0x0000000000000000000000000000000000000000}"
BLOCK="${2:-latest}"
curl -sS "$RPC_URL" -H 'content-type: application/json'   -d "{"jsonrpc":"2.0","id":1,"method":"eth_getBalance","params":["$ADDRESS","$BLOCK"]}"
echo
