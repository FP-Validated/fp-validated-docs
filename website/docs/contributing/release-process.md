---
title: Release Process
sidebar_position: 5
last_verified: 2026-05-28
---

The release process keeps documentation, generated references, and sample deployments aligned before publishing.

## Release checklist

| Step | Requirement |
| --- | --- |
| Scope review | Confirm changed chains, shared docs, generated matrices, and samples are intentional. |
| Official verification | Complete `/contributing/verify-official-docs` for changed factual claims. |
| Deployment test | Complete `/contributing/test-deployment` for changed runtime assets. |
| Exposure review | Confirm endpoint guidance links to `/operations/rpc-exposure-policy` and does not publish raw node ports. |
| Generated files | Run the RPC and port matrix generators when metadata changes. |
| Link review | Use absolute site paths and avoid broken references. |
| Security review | Check secrets, admin endpoints, public exposure, and sample credentials. |

## Review expectations

A reviewer should be able to answer:

1. What changed for operators?
2. What changed for developers consuming RPC/API endpoints?
3. Which upstream source supports the factual changes?
4. Which deployment or smoke test proves the instructions work?
5. Does any endpoint exposure become less restrictive?
6. Are generated matrices consistent with metadata?

:::warning Generated references are part of the change
If `chains/<chain>/metadata.yaml` changes, regenerate and review the shared matrices. Do not hand-edit generated output to hide a metadata problem.
:::

## Publish readiness

Before publishing, confirm:

- Frontmatter contains `title`, `sidebar_position`, and `last_verified: 2026-05-28`.
- New docs use real prose, tables, and fenced code where useful.
- Links use absolute paths because the docs route base is `/`.
- No unfinished-work markers remain.
- No real secrets, private endpoints, or unsupported claims appear.
- Chain-specific pages cross-link to shared developer and operations docs instead of duplicating policy.

## Release notes

For material changes, include a short release note with:

| Field | Example |
| --- | --- |
| Summary | Added Sui GraphQL RPC guidance and marked JSON-RPC migration path. |
| Operator impact | New gateway rate-limit recommendation for public GraphQL. |
| Developer impact | New TypeScript sample for paginated object queries. |
| Verification | Checked official Sui API references and ran GraphQL smoke query. |

## After publish

1. Confirm the published route loads.
2. Check one or two deep links from changed pages.
3. Watch for build or deployment alerts.
4. Announce the change to the relevant operator or developer channel.
5. File follow-up issues for non-blocking improvements discovered during review.
