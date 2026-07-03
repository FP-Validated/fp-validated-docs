#!/usr/bin/env bash
# Health check: the Aptos fullnode liveness/health endpoint.
# Returns 200 when the node is healthy. Use duration_secs to assert freshness:
# the node is considered healthy if its latest ledger version is within
# duration_secs of the current time.
set -euo pipefail
APTOS_NODE_URL="${APTOS_NODE_URL:-https://fullnode.mainnet.aptoslabs.com/v1}"
# Strip a trailing /v1 to reach the node root that serves /-/healthy.
APTOS_NODE_ROOT="${APTOS_NODE_URL%/v1}"
curl -fsS "${APTOS_NODE_ROOT}/-/healthy?duration_secs=10"
