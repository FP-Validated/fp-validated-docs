import { Connection, PublicKey } from '@solana/web3.js';
const connection = new Connection(process.env.SOLANA_RPC_URL ?? 'http://127.0.0.1:8899', 'confirmed');
const address = new PublicKey(process.env.SOLANA_ADDRESS ?? '11111111111111111111111111111111');
let before: string | undefined = process.env.SOLANA_BEFORE_SIGNATURE;
for (let pages = Number(process.env.SOLANA_PAGES ?? 3); pages > 0; pages--) {
  const signatures = await connection.getSignaturesForAddress(address, { before, limit: 100 }, 'confirmed');
  if (signatures.length === 0) break;
  for (const item of signatures) console.log(JSON.stringify({ signature: item.signature, slot: item.slot, err: item.err, blockTime: item.blockTime }));
  before = signatures.at(-1)?.signature;
}
