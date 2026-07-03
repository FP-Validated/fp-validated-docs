---
title: Incident Response
sidebar_position: 6
last_verified: 2026-05-28
---

Incident response turns alerts into coordinated action. The goal is to restore safe service, protect users and keys, and leave an audit trail that improves the next response.

## Severity levels

| Severity | Definition | Examples | Response |
| --- | --- | --- | --- |
| SEV1 | Critical production impact or security risk requiring immediate coordination | Widespread RPC outage, validator key exposure, corrupt production state, public admin endpoint exposure | Page incident commander, technical lead, security owner, and communications lead. Start timeline immediately. |
| SEV2 | Material degradation with workaround or limited blast radius | One region down, elevated RPC errors, sync lag on part of fleet, failed upgrade affecting redundant nodes | Page on-call and chain owner. Escalate if user impact grows or no recovery path is clear. |
| SEV3 | Minor production issue or urgent operational risk | Backup job failure, low peer count on non-critical node, dashboard regression | Ticket with owner and due date; page only if it threatens higher severity. |
| SEV4 | Informational follow-up | Documentation correction, non-production issue, completed upstream advisory review | Track in normal work queue. |

:::danger Security incidents
If secrets, signing keys, admin credentials, or privileged endpoints may be exposed, treat the event as security-impacting until disproven. Preserve evidence, restrict access, and avoid posting secrets or exploit details in broad channels.
:::

## Incident roles

| Role | Responsibility |
| --- | --- |
| Incident commander | Owns severity, coordination, decisions, and timeline hygiene. |
| Technical lead | Directs diagnosis and remediation. Keeps operators focused on one recovery path at a time. |
| Communications lead | Sends internal and external updates, status page notes, and stakeholder summaries. |
| Scribe | Records timeline, commands, observations, decisions, and links to dashboards or PRs. |
| Security owner | Leads containment when credentials, keys, data exposure, or abuse are possible. |

One person can hold multiple roles for small incidents, but SEV1 incidents should split command, technical work, and communications.

## Runbook structure during an incident

1. State the impact in user terms.
2. Declare severity and roles.
3. Freeze unrelated deploys for affected systems.
4. Capture baseline evidence: dashboards, logs, recent changes, alerts, and upstream status.
5. Choose the safest immediate mitigation: drain, rollback, rate-limit, disable endpoint, restore, or fail over.
6. Validate recovery with monitoring and real smoke tests.
7. Communicate status and next update timing.
8. Close only after impact has ended and follow-up owners are assigned.

```bash
# Example timeline entry format for incident notes.
2026-05-28T14:03Z SEV2 declared: Ethereum public JSON-RPC p95 latency above SLO in us-east.
2026-05-28T14:06Z Drained rpc-geth-03 from gateway; error ratio dropped from 8% to 1.2%.
2026-05-28T14:12Z Smoke test passed against remaining pool; monitoring continues.
```

## Communications cadence

| Audience | Content | Cadence |
| --- | --- | --- |
| Operators | Current hypothesis, assigned actions, blockers, next decision | As work changes; avoid noisy speculation. |
| Internal stakeholders | Impact, severity, mitigation, next update | At declaration and material changes. |
| External users | User-visible impact, affected endpoints, workaround, recovery status | For SEV1/SEV2 user impact or contractual obligations. |
| Post-incident readers | Timeline, root cause, contributing factors, action items | After resolution. |

:::tip Write for the next responder
A good incident note lets another operator understand what happened without reconstructing Slack, dashboards, and terminal history. Include links, exact endpoint names, and validation evidence.
:::

## Post-incident review

Every SEV1 and SEV2 should produce a short review:

- What happened and how users were affected.
- Detection source and why it did or did not work.
- Root cause and contributing factors.
- What mitigated the incident.
- What made response slower or riskier.
- Action items with owners and verification criteria.

Action items should fix systems, runbooks, alerts, tests, or ownership gaps. Avoid action items that only ask people to be more careful.
