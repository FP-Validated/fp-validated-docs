#!/usr/bin/env bash
set -euo pipefail
APTOS_NODE_URL="${APTOS_NODE_URL:-https://fullnode.mainnet.aptoslabs.com/v1}"
HASH="${1:?usage: get-transaction.sh <transaction-hash>}"
curl -fsS "$APTOS_NODE_URL/transactions/by_hash/$HASH"
