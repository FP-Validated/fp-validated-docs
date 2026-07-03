import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

const network = (process.env.APTOS_NETWORK ?? "mainnet").toUpperCase() as keyof typeof Network;
export const aptos = new Aptos(new AptosConfig({ network: Network[network] }));

const ledger = await aptos.getLedgerInfo();
console.log(JSON.stringify({ chain_id: ledger.chain_id, ledger_version: ledger.ledger_version }, null, 2));
