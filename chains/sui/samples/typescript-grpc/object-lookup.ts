import { SuiGrpcClient } from './client';

const objectId = process.argv[2] ?? process.env.OBJECT_ID;
if (!objectId) throw new Error('Usage: tsx object-lookup.ts <object-id>');

const client = new SuiGrpcClient();
const object = await client.unary(
  'sui.rpc.v2beta2.StateService',
  'GetObject',
  {
    objectId,
    readMask: { paths: ['object_id', 'version', 'digest', 'owner', 'object_type', 'contents'] },
  },
);

console.log(JSON.stringify(object, null, 2));
