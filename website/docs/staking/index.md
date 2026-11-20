---
title: Stake with FP Validated
sidebar_label: Overview
sidebar_position: 0
slug: /staking
status: draft
last_verified: 2026-11-20
---

# Stake with FP Validated

FP Validated runs validators for proof-of-stake networks and accepts delegation from individuals and institutions. You keep custody of your tokens at all times: staking is a transaction you sign from your own wallet or custody platform, and FP Validated never holds your keys or funds.

## Choose how you stake

| Path | Best for | How it works |
| --- | --- | --- |
| Your own wallet | Individuals and small teams | Pick FP Validated in your wallet's staking screen and sign the transaction. Each chain guide below lists the wallets we have checked. |
| Custody platforms | Institutions holding assets at a qualified custodian | Stake from the custodian's console. Contact FP Validated to confirm the validator is listed for your custodian. |

## Chain guides

| Network | Token | Guide | Status |
| --- | --- | --- | --- |
| Sui | SUI | [Stake SUI](/staking/sui) | draft |
| Walrus | WAL | [Stake WAL](/staking/walrus) | draft |
| Sei | SEI | [Stake SEI](/staking/sei) | draft |
| Injective | INJ | [Stake INJ](/staking/injective) | draft |
| Initia | INIT | [Stake INIT](/staking/initia) | draft |
| Aptos | APT | [Stake APT](/staking/aptos) | draft |
| Monad | MON | [Stake MON](/staking/monad) | draft |

Every guide uses the same layout: key facts, what you need, how to stake, rewards, unstaking, fees, risks, institutional options, FAQ and official references. The key facts table is generated from `chains/<chain>/staking.yaml`, so the validator address and commission shown here come from one reviewed source.

## Risks that apply to every chain

- **Validator performance.** Rewards depend on the validator staying online and following the protocol. Some networks reduce rewards or slash stake when a validator misbehaves. Each guide states the exact rule for that network.
- **Commission changes.** Validators can change their commission. Each guide links to an explorer that shows the live rate.
- **Lock-up and liquidity.** Many networks keep staked tokens locked for a period after you unstake. Plan withdrawals around the unstaking period in each guide.
- **Wallet and signing risk.** Only sign transactions you understand. Check the validator address against this page before you sign.

FP Validated's incident response targets and slashing accountability model are described in [Responsiveness and Slashing Policy](/fp-validated-infra/responsiveness-and-slashing-policy).

## Keeping these pages accurate

Each guide shows the date its facts were last verified. If a value on a guide does not match what your wallet or an explorer shows, trust the chain and tell us so we can correct the page.
