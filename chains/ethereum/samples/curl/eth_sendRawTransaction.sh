#!/usr/bin/env bash
set -euo pipefail
RPC_URL="${RPC_URL:-http://127.0.0.1:8545}"
RAW_TX="${RAW_TX:?Set RAW_TX to a signed transaction hex string}"
curl -sS "$RPC_URL" -H 'content-type: application/json'   -d "{"jsonrpc":"2.0","id":1,"method":"eth_sendRawTransaction","params":["$RAW_TX"]}"
echo
