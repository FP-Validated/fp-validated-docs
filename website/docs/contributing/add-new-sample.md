---
title: Add New Sample
sidebar_position: 2
last_verified: 2026-05-28
---

Samples show how developers should use a chain interface in production-shaped code. Add samples when a chain exposes a new interface, a common workflow is missing, or an upstream deprecation changes the recommended client path.

## Sample requirements

| Requirement | Standard |
| --- | --- |
| Real workflow | Demonstrates a useful task such as health check, sync query, account/object read, transaction lookup, simulation, submit, events, streaming, or indexing. |
| Correct interface | Uses the chain's recommended API and method names from official docs. |
| Operational behavior | Handles timeout, retry or reconnect where appropriate, structured errors, and basic metrics/logging. |
| Reproducibility | Includes dependencies, environment variables, and run command. |
| Safety | Does not include real secrets, private keys, production endpoints, or unsafe admin methods. |

:::warning No toy one-liners
A sample should teach the production shape of a client. A single request without error handling is documentation noise unless the page is explicitly a smoke-test snippet.
:::

## Add the sample

1. Choose the chain and interface the sample belongs to.
2. Check `chains/<chain>/metadata.yaml` and confirm the sample name belongs under `samples.required` or an optional sample group.
3. Add the runnable sample asset under the chain sample repository.
4. Add or update the matching docs page under `website/docs/chains/<chain>/samples/`.
5. Link the sample page from the relevant developer interface page.
6. Run the sample against a non-production endpoint and record the command in the docs.

```bash
# Example documentation pattern for a sample command.
RPC_URL=http://127.0.0.1:8545 npm run sample:health-check
```

## Documentation checklist

| Page section | Include |
| --- | --- |
| Purpose | What the sample proves and when to use it. |
| Prerequisites | Runtime, dependency install, endpoint, auth variable if needed. |
| Configuration | Environment variables with safe example values. |
| Run | Exact command in a fenced `bash` block. |
| Expected output | Shape of a successful response without hard-coding volatile values. |
| Failure handling | Common errors and what they mean. |
| Production notes | Rate limits, retries, reconnect behavior, metrics, or pagination. |

## Metadata update

If the sample is required for the chain, update metadata:

```yaml
samples:
  required:
    - health-check
    - query-latest-block
    - submit-transaction
```

Keep names stable and machine-friendly. Prefer `query-latest-block` over `latest block example`.

## Review checklist

- The sample runs against a local or test endpoint.
- The docs cite the official method or API page when making interface claims.
- The sample does not require production credentials.
- The sample does not expose admin or internal-only endpoints.
- The sample behavior matches `/operations/rpc-exposure-policy`.
