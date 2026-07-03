import { SuiGrpcClient } from './client';

const transaction = process.env.TX_BYTES_B64;
const signatures = JSON.parse(process.env.SIGNATURES_JSON ?? '[]') as string[];
if (!transaction || signatures.length === 0) {
  throw new Error('Set TX_BYTES_B64 and SIGNATURES_JSON before submitting');
}

const client = new SuiGrpcClient();

const dryRun = await client.unary('sui.rpc.v2beta2.TransactionExecutionService', 'SimulateTransaction', {
  transaction,
  readMask: { paths: ['effects', 'events', 'balance_changes'] },
});
console.error('simulation:', JSON.stringify(dryRun, null, 2));

const submitted = await client.unary('sui.rpc.v2beta2.TransactionExecutionService', 'ExecuteTransaction', {
  transaction,
  signatures,
  readMask: { paths: ['digest', 'effects', 'events'] },
});
console.log(JSON.stringify(submitted, null, 2));
