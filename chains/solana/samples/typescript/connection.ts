import { Connection } from '@solana/web3.js';
const rpcUrl = process.env.SOLANA_RPC_URL ?? 'http://127.0.0.1:8899';
const commitment = (process.env.SOLANA_COMMITMENT ?? 'confirmed') as 'processed' | 'confirmed' | 'finalized';
export const connection = new Connection(rpcUrl, { commitment, confirmTransactionInitialTimeout: 60_000 });
console.log(JSON.stringify({ rpcUrl, commitment, health: await connection.getHealth(), slot: await connection.getSlot(commitment) }, null, 2));
