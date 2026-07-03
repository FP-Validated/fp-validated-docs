#!/usr/bin/env bash
set -euo pipefail
APTOS_NODE_URL="${APTOS_NODE_URL:-https://fullnode.mainnet.aptoslabs.com/v1}"
curl -fsS "$APTOS_NODE_URL"
