---
title: Stake ZRO
sidebar_label: Zero
sidebar_position: 9
chain: zero
status: draft
last_verified: 2026-11-24
---

# Stake ZRO on Zero

Zero is LayerZero's blockchain, built for global markets. Validators secure Zero: they agree on every block, and their votes are weighted by the ZRO staked behind them. FP Validated helps secure Zero as a genesis validator, part of the Zero Genesis Validator Program.

ZRO staking opened on 2026-11-23, ahead of Zero's mainnet on 2026-11-30. Genesis validators produce Zero's first blocks using ZRO staked ahead of mainnet. Staking happens only on LayerZero's official staking site, [staking.layerzero.network](https://staking.layerzero.network/).

:::note[Zero is not the LayerZero messaging protocol]
This page is about **Zero**, LayerZero's blockchain, and staking ZRO to secure it. It is not about the LayerZero interoperability protocol that connects other chains. That protocol has no ZRO staking, and its verifier role (DVN) is a separate role from validating Zero. FP Validated's LayerZero DVN is unrelated to this page.
:::

:::info[You cannot choose a validator]
Until the unlock date, expected by 2027-03-31, stake is spread equally across Zero's genesis validators rather than delegated to a single validator. You cannot pick FP Validated or any other validator when you stake. Staking on the official site still helps secure Zero, and FP Validated is one of the genesis validators your stake is spread across.
:::

:::caution[Your ZRO is locked until the unlock date]
From the moment you stake, you cannot unstake, transfer, sell or bridge your ZRO or its rewards until unstaking is enabled, expected by 2027-03-31. There is no early exit, and the date may change. Only stake ZRO you can do without for the whole period.
:::

## Key facts

| Item | Value |
| --- | --- |
| Where to stake | [staking.layerzero.network](https://staking.layerzero.network/) only |
| Validator choice | None. Stake is spread equally across Zero's genesis validators until the unlock date |
| Minimum and maximum | None. You can add to your stake at any time, and adding does not extend the lock-up |
| Lock-up | Until unstaking is enabled, expected by 2027-03-31. No early exit |
| Unstaking | Takes up to 7 days once unstaking is enabled |
| Rewards | New ZRO from Zero's 1% annual target inflation, shared by amount and time staked, from 2026-11-30 00:00 UTC |
| Validator commission | Fixed at 10% of rewards until the unlock date; set by each validator after that |
| Auto-compounding | Yes. Rewards are added to your stake and stay locked with it |
| Slashing | None |
| Liquid staking token | None |
| Supported wallets | Standard wallets (EOAs) that can sign EIP-712 messages, including hardware wallets that support it. Not Safe or other smart contract wallets, and not exchange accounts |
| Costs | Network gas and LayerZero messaging fees, shown before you confirm. No other fee besides the validator commission |
| Facts last verified | 2026-11-24 |

Sources: the [staking site FAQ](https://staking.layerzero.network/) and the [ZRO Staking Terms, version 2026-11-17](https://staking.layerzero.network/zro-staking-terms/2026-11-17.md). If this page and the terms differ, the terms apply.

## Before you start

- **A standard wallet that holds your ZRO.** It must be an externally owned account that can sign EIP-712 messages. Multisig and smart contract wallets such as Safe cannot stake, and neither can accounts whose custodian blocks these signatures. Custodian support is to be added over time, according to the staking site.
- **The same wallet at unlock.** Your staked ZRO moves to the same address on Zero, and you need that wallet to sign when you unstake. Keep its recovery phrase safe.
- **Gas on the chain your ZRO is on,** to pay network gas and the LayerZero messaging fee.
- **Eligibility.** The terms require you to be at least 18, not subject to sanctions and not in a sanctioned country or region, and not to hide your location with a VPN. If you stake for a company, you must be authorized to accept the terms for it.

## Stake

1. Type `staking.layerzero.network` into your browser's address bar. Do not follow links from messages or ads.
2. Select **Connect Wallet** and connect the wallet that holds your ZRO.
3. Select **Complete Wallet Setup** and accept the lock-up and the ZRO Staking Terms.
4. Sign the gasless EIP-712 message. It confirms that this wallet will be able to sign on Zero when you unstake.
5. Enter the amount of ZRO to stake and check the gas and messaging fees shown.
6. Confirm the transaction. Your ZRO is burned on the chain it came from, minted at the same address on Zero, and staked automatically. There is no further step.
7. Check the result on [LayerZero Scan](https://layerzeroscan.com/). After Zero's public launch on 2026-11-30 your stake is also visible in the Zero explorer, and the staking site shows your total.

The button names in steps 2 and 3 are from the staking site before a wallet is connected. Screens after connecting may differ.

## Rewards

- Rewards are calculated for each epoch from 2026-11-30 00:00 UTC. ZRO staked before then earns nothing until that date.
- Your stake earns from its first full epoch after it is staked. Your share of each epoch is your stake divided by the total staked in that epoch, after the 10% validator commission.
- Rewards are added to your stake automatically, so they compound. They stay locked with your stake and cannot be claimed separately before the unlock date.
- The yield falls as more ZRO is staked, because the 1% issuance is shared by more tokens. The calculator on the staking site is an illustration, not a forecast.
- Rewards are not guaranteed and may be zero. The reward rate and commission may change from the unlock date.

## Unstake

1. Wait until unstaking is enabled, expected by 2027-03-31.
2. Unstake from the staking site with the same wallet you staked from.
3. Unstaking takes up to 7 days.

Moving ZRO from Zero back to other chains may not be possible until a later network upgrade, according to the terms.

## Things to know

- **Use only the official site.** Sending ZRO directly to the staking contracts can make it unrecoverable. Do not send ZRO to Zero by other routes before the 2026-11-30 launch. ZRO sent to Zero other than through the staking site is not staked and earns nothing.
- **No governance votes or ATLAS discounts.** Staked ZRO may not count toward ZRO governance voting, and staking gives no LayerZero ATLAS trading fee discounts.
- **Contract and launch risk.** The terms say the staking contracts may not have been audited at launch. If Zero's genesis is delayed, your ZRO stays pending and earns no rewards until it is staked.
- **Price risk.** ZRO's price can fall while it is locked.
- **Taxes.** Rewards added to a locked stake may be taxable when they are credited, even though you cannot withdraw them.
- **Scams.** LayerZero says it will never DM you a link or ask for your recovery phrase.

## FP Validated on Zero

FP Validated helps secure Zero as a genesis validator, part of the Zero Genesis Validator Program. Validators join through that program, which continues to select new validators, and validation and delegation are due to open up more broadly over time. Until the unlock date, ZRO you stake is spread across all genesis validators, including FP Validated. After that date, each validator sets its own commission. This page will be updated when delegation to a single validator is available. For questions, see [Need help?](/staking#need-help).

FP Validated does not run LayerZero ATLAS. LayerZero ATLAS is the first product on Zero, infrastructure that trading venues build on; FP Validated helps secure the blockchain it runs on.

## Official references

- [Zero staking site and FAQ](https://staking.layerzero.network/)
- [ZRO Staking Terms, version 2026-11-17](https://staking.layerzero.network/zro-staking-terms/2026-11-17.md)
- [Zero: Technical Positioning Paper](https://layerzero.network/blog/zero-technical-positioning-paper)
- [LayerZero Scan](https://layerzeroscan.com/)
