---
title: Upgrade and Rollback
sidebar_position: 3
last_verified: 2026-05-28
---

Upgrade one Aptos fullnode at a time behind the gateway. Drain application traffic, stop the node, replace the image/config, start, and compare ledger progress and error rates before re-admitting traffic.

Rollback means returning to the previous image and configuration with the same data volume unless the release notes require a storage migration plan.
