import { Connection, PublicKey } from '@solana/web3.js';
const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
const connection = new Connection(process.env.SOLANA_RPC_URL ?? 'http://127.0.0.1:8899', 'confirmed');
const owner = new PublicKey(process.env.SOLANA_ACCOUNT ?? '11111111111111111111111111111111');
const response = await connection.getTokenAccountsByOwner(owner, { programId: TOKEN_PROGRAM_ID }, 'confirmed');
console.log(JSON.stringify(response.value.map(({ pubkey, account }) => ({ tokenAccount: pubkey.toBase58(), lamports: account.lamports, dataLength: account.data.length })), null, 2));
