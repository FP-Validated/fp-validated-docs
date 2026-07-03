import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

const erc20Abi = [
  { type: 'function', name: 'symbol', stateMutability: 'view', inputs: [], outputs: [{ type: 'string' }] },
  { type: 'function', name: 'decimals', stateMutability: 'view', inputs: [], outputs: [{ type: 'uint8' }] },
  { type: 'event', name: 'Transfer', inputs: [
    { indexed: true, name: 'from', type: 'address' },
    { indexed: true, name: 'to', type: 'address' },
    { indexed: false, name: 'value', type: 'uint256' }
  ] }
] as const;
const rpcUrl = process.env.RPC_URL ?? 'http://127.0.0.1:8545';
const token = (process.env.CONTRACT_ADDRESS ?? '0xdAC17F958D2ee523a2206206994597C13D831ec7') as `0x${string}`;
const client = createPublicClient({ chain: mainnet, transport: http(rpcUrl) });

const [blockNumber, symbol, decimals] = await Promise.all([
  client.getBlockNumber(),
  client.readContract({ address: token, abi: erc20Abi, functionName: 'symbol' }),
  client.readContract({ address: token, abi: erc20Abi, functionName: 'decimals' })
]);
console.log({ blockNumber: blockNumber.toString(), token, symbol, decimals });
