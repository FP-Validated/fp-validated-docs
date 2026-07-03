#!/usr/bin/env bash
set -euo pipefail
RPC_URL="${RPC_URL:-http://127.0.0.1:8545}"
CONTRACT="${1:-0xdAC17F958D2ee523a2206206994597C13D831ec7}"
BLOCK="${2:-latest}"
# ERC-20 totalSupply(): 0x18160ddd
curl -sS "$RPC_URL" -H 'content-type: application/json'   -d "{"jsonrpc":"2.0","id":1,"method":"eth_call","params":[{"to":"$CONTRACT","data":"0x18160ddd"},"$BLOCK"]}"
echo
