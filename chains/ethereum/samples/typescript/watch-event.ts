import { createPublicClient, http, webSocket } from 'viem';
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
const token = (process.env.CONTRACT_ADDRESS ?? '0xdAC17F958D2ee523a2206206994597C13D831ec7') as `0x${string}`;
const transport = process.env.WS_URL ? webSocket(process.env.WS_URL) : http(process.env.RPC_URL ?? 'http://127.0.0.1:8545');
const client = createPublicClient({ chain: mainnet, transport });

const unwatch = client.watchContractEvent({
  address: token,
  abi: erc20Abi,
  eventName: 'Transfer',
  onLogs: logs => console.log(logs.map(log => ({ blockNumber: log.blockNumber?.toString(), transactionHash: log.transactionHash, args: log.args }))),
  onError: err => console.error('watch error', err)
});
process.on('SIGINT', () => { unwatch(); process.exit(0); });
