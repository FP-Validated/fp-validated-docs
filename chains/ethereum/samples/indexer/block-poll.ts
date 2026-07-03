import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

const client = createPublicClient({ chain: mainnet, transport: http(process.env.RPC_URL ?? 'http://127.0.0.1:8545') });
const confirmations = BigInt(process.env.CONFIRMATIONS ?? '12');
let next = BigInt(process.env.START_BLOCK ?? '0');

while (true) {
  const head = await client.getBlockNumber();
  const safeHead = head > confirmations ? head - confirmations : 0n;
  while (next <= safeHead) {
    const block = await client.getBlock({ blockNumber: next, includeTransactions: false });
    console.log({ number: block.number?.toString(), hash: block.hash, parentHash: block.parentHash });
    next++;
  }
  await new Promise(resolve => setTimeout(resolve, 5000));
}
