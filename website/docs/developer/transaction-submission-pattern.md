---
title: Transaction Submission Pattern
sidebar_position: 12
last_verified: 2026-05-28
---

Transaction submission is a workflow, not a single RPC call. A production submit path validates input, simulates when possible, signs with controlled key material, submits once, watches for inclusion, and reports a stable outcome.

| Step | Purpose | Examples |
| --- | --- | --- |
| Build | Create chain-specific transaction payload | EVM calldata, Solana message, Sui transaction block, Aptos entry function |
| Estimate/simulate | Detect failures before spending fees | EVM gas estimate, Solana simulateTransaction, Sui dry run, Aptos simulation |
| Sign | Use controlled keys and correct chain id/domain | HSM, wallet, custody service, local dev key |
| Submit | Send through a submit-capable private or authenticated endpoint | JSON-RPC, REST, SDK |
| Track | Poll or subscribe until finality threshold | Receipt, signature status, checkpoint/version |
| Reconcile | Handle timeout, duplicate, replacement, or rejection | Idempotency table keyed by client request id |

EVM submissions must manage nonce, gas, chain id, and replacement rules. Solana submissions must account for recent blockhash expiry. Sui and Aptos submissions should use their transaction simulation/dry-run facilities before broadcast where appropriate ([Sui API references](https://docs.sui.io/references/sui-api), [Aptos APIs](https://aptos.dev/build/apis)).

```sql
CREATE TABLE submitted_transactions (
  client_request_id text PRIMARY KEY,
  chain text NOT NULL,
  transaction_id text,
  status text NOT NULL,
  submitted_at timestamptz NOT NULL DEFAULT now()
);
```

:::danger Blind resubmission is unsafe
If the submit call times out, the transaction may already be accepted. Query by nonce, signature, digest, hash, or client id before creating a replacement.
:::
