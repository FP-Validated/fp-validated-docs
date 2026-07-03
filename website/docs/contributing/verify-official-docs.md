---
title: Verify Official Docs
sidebar_position: 3
last_verified: 2026-05-28
---

`last_verified` means a human checked the page against upstream sources on that date. It is not a publication date and it is not a guess based on another chain.

## What to verify

| Claim type | Required source |
| --- | --- |
| Interface availability | Official protocol, client, foundation, or project documentation. |
| Deprecation or migration deadline | Official migration guide, release note, or API reference. |
| Ports and transports | Official client docs, chart defaults, or maintained reference config. |
| Method names and payloads | Official API reference or generated OpenAPI/protobuf/GraphQL schema. |
| Security guidance | Official warning plus FP Validated policy when stricter. |
| Runtime image or chart | Official release repository, registry, or chart source. |

:::warning Blog posts are not enough
Community posts, issue comments, examples, and old tutorials can help discovery, but they do not establish current interface status. Cite official docs at the point of claim.
:::

## Verification workflow

1. Open the current page and list every factual claim about ports, methods, status, deprecation, runtime, and exposure.
2. Check the official upstream source for each claim.
3. Update stale claims and remove claims that no longer have support.
4. Add inline markdown links where the claim appears.
5. Update frontmatter `last_verified: 2026-05-28` only when the page has actually been checked.
6. If upstream docs conflict, prefer the newer official source and explain the operational choice in prose.

## Interface status discipline

Use the shared status words consistently:

| Status | Meaning |
| --- | --- |
| Recommended | Preferred for new integrations. |
| Standard | Supported and normal, but not necessarily preferred. |
| Deprecated | Still present but has a migration path or removal signal. |
| Internal | Intended for operators, backend services, or private networks. |
| Advanced | Safe only for experienced users with additional controls. |

For deprecations, include the replacement and deadline when upstream provides one. For example, Sui JSON-RPC should point readers toward Sui gRPC or GraphQL RPC based on the official Sui API guidance.

## Citation style

Cite inline as plain markdown links:

```md
Ethereum JSON-RPC methods are documented in the [Ethereum JSON-RPC API](https://ethereum.org/developers/docs/apis/json-rpc/).
```

Do not collect all citations at the bottom while leaving claims unsupported in the body.

## Upstream review checklist

| Check | Pass condition |
| --- | --- |
| Source freshness | Official page is current enough to support the claim. |
| Method accuracy | Names, request shape, and transport match upstream. |
| Deprecation status | Deprecated interfaces show replacement and deadline when available. |
| Exposure | Any public/internal/admin claim agrees with `/operations/rpc-exposure-policy` or is stricter. |
| Metadata | `metadata.yaml` matches the verified interface status and ports. |
| Samples | Sample code uses non-deprecated interfaces unless it is explicitly a migration example. |

:::tip When upstream is ambiguous
Document the conservative operational policy and cite the source that created the ambiguity. For endpoint exposure, choose the stricter class until the chain owner approves a narrower exception.
:::
