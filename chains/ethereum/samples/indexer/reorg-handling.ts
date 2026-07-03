import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

type StoredBlock = { number: bigint; hash: string; parentHash: string };
const client = createPublicClient({ chain: mainnet, transport: http(process.env.RPC_URL ?? 'http://127.0.0.1:8545') });
const chain: StoredBlock[] = [];
const depth = Number(process.env.REORG_WINDOW ?? '64');

async function ingest(number: bigint) {
  const block = await client.getBlock({ blockNumber: number, includeTransactions: false });
  const previous = chain.at(-1);
  if (previous && block.parentHash !== previous.hash) {
    console.warn('reorg detected', { at: number.toString(), expectedParent: previous.hash, actualParent: block.parentHash });
    while (chain.length && chain.at(-1)!.hash !== block.parentHash) {
      const removed = chain.pop()!;
      console.warn('rollback block', { number: removed.number.toString(), hash: removed.hash });
    }
  }
  chain.push({ number, hash: block.hash!, parentHash: block.parentHash });
  while (chain.length > depth) chain.shift();
  console.log('stored', { number: number.toString(), hash: block.hash });
}

const start = BigInt(process.env.START_BLOCK ?? '0');
for (let offset = 0n; offset < 10n; offset++) await ingest(start + offset);
