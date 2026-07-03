---
title: Sui RPC Migration Operator Notes
chain: sui
topics:
  - rpc
  - graphql
  - migration
kind: operator-note
review_status: approved
last_reviewed: 2026-06-18
confidence: medium
summary: Sui interface guidance should present JSON-RPC status together with GraphQL migration context so developers do not design against an interface that is moving.
sources:
  - type: internal
    label: FP Validated Sui interface review
  - type: official
    label: Sui developer documentation
    url: https://docs.sui.io/
---

# Sui RPC Migration Operator Notes

## Operator judgment

When users ask for Sui RPC, show both current endpoint patterns and migration guidance. The useful answer is not only which endpoint works today, but what interface will remain safe for future integration.

## Developer-facing guidance

- Put GraphQL migration context next to JSON-RPC examples.
- Mark deprecated or transitional interfaces clearly.
- Tie examples to SDK versions and endpoint availability.
- Show operational impact for gateway, rate limiting, and indexing.
