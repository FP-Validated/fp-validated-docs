---
title: Troubleshooting
sidebar_position: 6
last_verified: 2026-05-28
---

| Symptom | Check | Likely fix |
| --- | --- | --- |
| `429` | Gateway/provider rate metrics | Backoff, reduce scans, add private capacity. |
| `403` | Auth and block policy | Correct credentials or traffic source. |
| Stale reads | `getSlot` at `confirmed` and `finalized` | Route away from lagging node. |
| WS drops | Connection count and idle timeout | Reconnect with backoff and resubscribe. |
