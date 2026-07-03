import { createWalletClient, http, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';

const privateKey = process.env.PRIVATE_KEY as `0x${string}` | undefined;
if (!privateKey) throw new Error('Set PRIVATE_KEY to a funded account private key');
const to = (process.env.TO_ADDRESS ?? '0x0000000000000000000000000000000000000000') as `0x${string}`;
const value = parseEther(process.env.ETH_VALUE ?? '0.001');
const account = privateKeyToAccount(privateKey);
const wallet = createWalletClient({ account, chain: mainnet, transport: http(process.env.RPC_URL ?? 'http://127.0.0.1:8545') });

const hash = await wallet.sendTransaction({ to, value });
console.log({ hash });
