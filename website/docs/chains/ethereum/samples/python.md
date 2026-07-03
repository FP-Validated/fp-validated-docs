---
title: Python Samples
sidebar_position: 3
last_verified: 2026-05-28
---

The Python samples use web3.py for operational checks and backend jobs.

```bash
export RPC_URL=http://127.0.0.1:8545
python chains/ethereum/samples/python/connect.py
python chains/ethereum/samples/python/get_block.py latest
python chains/ethereum/samples/python/call_contract.py
python chains/ethereum/samples/python/filter_logs.py
```

Use Python scripts for controlled automation, not as an unauthenticated public proxy to the node.
