import { JsonRpcProvider, Contract } from 'ethers';

const rpcUrl = process.env.RPC_URL ?? 'http://127.0.0.1:8545';
const token = process.env.CONTRACT_ADDRESS ?? '0xdAC17F958D2ee523a2206206994597C13D831ec7';
const provider = new JsonRpcProvider(rpcUrl);
const erc20 = new Contract(token, ['function symbol() view returns (string)', 'function decimals() view returns (uint8)'], provider);

const [blockNumber, symbol, decimals] = await Promise.all([
  provider.getBlockNumber(),
  erc20.symbol(),
  erc20.decimals()
]);
console.log({ blockNumber, token, symbol, decimals: Number(decimals) });
