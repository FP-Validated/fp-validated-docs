#!/usr/bin/env bash
set -euo pipefail
APTOS_NODE_URL="${APTOS_NODE_URL:-https://fullnode.mainnet.aptoslabs.com/v1}"
SIGNED_BCS="${1:?usage: submit.sh <signed-transaction.bcs>}"
curl -fsS -X POST "$APTOS_NODE_URL/transactions" -H "content-type: application/x.aptos.signed_transaction+bcs" --data-binary "@$SIGNED_BCS"
