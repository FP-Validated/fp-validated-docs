import { request } from 'undici';

const endpoint = process.env.SUI_GRPC_ENDPOINT ?? 'http://127.0.0.1:9000';
const start = Number(process.env.START_CHECKPOINT ?? '0');

const response = await request(`${endpoint}/sui.rpc.v2beta2.SubscriptionService/SubscribeCheckpoints`, {
  method: 'POST',
  body: JSON.stringify({
    checkpoint: { sequenceNumber: start },
    readMask: { paths: ['sequence_number', 'digest', 'transactions', 'events'] },
  }),
  headers: { 'content-type': 'application/json' },
});

if (response.statusCode >= 400) throw new Error(`SubscribeCheckpoints HTTP ${response.statusCode}: ${await response.body.text()}`);

for await (const chunk of response.body) {
  const line = Buffer.from(chunk).toString('utf8').trim();
  if (!line) continue;
  console.log(line);
}
