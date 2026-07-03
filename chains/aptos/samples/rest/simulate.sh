#!/usr/bin/env bash
set -euo pipefail
APTOS_NODE_URL="${APTOS_NODE_URL:-https://fullnode.mainnet.aptoslabs.com/v1}"
PAYLOAD_JSON="${1:?usage: simulate.sh <signed-transaction-json-file>}"
curl -fsS -X POST "$APTOS_NODE_URL/transactions/simulate" -H "content-type: application/json" --data-binary "@$PAYLOAD_JSON"
