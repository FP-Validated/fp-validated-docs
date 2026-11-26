---
title: Alert Control Runbook
sidebar_position: 7
last_verified: 2026-11-26
---

Alert control is done in Git. To stop or resume alerts for a target, an operator changes that target's alert switch in a reviewed pull request. A silence is a fallback for when the Git path is too slow. It is not the record of planned maintenance.

## Control model

Whether a target can alert is decided where the target is defined, not in the alerting system. A target that is switched off is still measured and still visible on dashboards. It cannot fire.

| Principle | Reason |
| --- | --- |
| The switch is in Git, next to the target. | The reason and the author of every change are in the history, and the change is reviewed. |
| The switch is as narrow as the work. | Maintenance on one chain target does not hide alerts for the host, and host maintenance does not hide a host that disappears. |
| Node-down detection is separate. | Turning off a host's resource alerts does not turn off detection of the host disappearing. |

## Planned maintenance

1. Open a pull request that switches off alerts for the one target under maintenance, and say why.
2. Merge and apply it before the work starts.
3. Do the work.
4. Confirm the target is healthy on its dashboard.
5. Open a pull request that switches the alerts back on.

Step 5 is part of the maintenance. A target left switched off is a gap in coverage.

## Retiring a target

When a workload is removed for good, its monitoring entries are removed in the same change. Otherwise the missing target raises an alert.

## Silences

A silence is used when an alert is firing now and the Git path would take too long.

- It is created through [FP Validated Guard](/fp-validated-infra/fp-validated-guard), under the name of the person who asked for it.
- It matches one specific target, not a whole chain or severity.
- It has a reason and an end time.
- If the work will outlast the silence, the switch in Git is changed and the silence is allowed to expire.

## Related

- [Monitoring Architecture](/fp-validated-infra/monitoring-architecture)
- [Monitoring Standards](/operations/monitoring-standards)
