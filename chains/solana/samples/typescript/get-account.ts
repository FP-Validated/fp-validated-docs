import { Connection, PublicKey } from '@solana/web3.js';
const connection = new Connection(process.env.SOLANA_RPC_URL ?? 'http://127.0.0.1:8899', 'confirmed');
const publicKey = new PublicKey(process.env.SOLANA_ACCOUNT ?? '11111111111111111111111111111111');
const account = await connection.getAccountInfo(publicKey, 'confirmed');
console.log(JSON.stringify({ address: publicKey.toBase58(), exists: account !== null, lamports: account?.lamports, owner: account?.owner.toBase58(), executable: account?.executable, dataLength: account?.data.length }, null, 2));
