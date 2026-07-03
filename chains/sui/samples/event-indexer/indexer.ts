import { request } from 'undici';
import { decodeBcsEvent, matchesMoveEvent, type MoveEventEnvelope } from './bcs-decode';
import { PostgresEventWriter } from './postgres-writer';

const endpoint = process.env.SUI_GRPC_ENDPOINT ?? 'http://127.0.0.1:9000';
const eventType = process.env.MOVE_EVENT_TYPE ?? '0x2::coin::CoinMetadata';

async function subscribeFrom(checkpoint: number): Promise<AsyncIterable<string>> {
  const response = await request(`${endpoint}/sui.rpc.v2beta2.SubscriptionService/SubscribeCheckpoints`, {
    method: 'POST',
    body: JSON.stringify({
      checkpoint: { sequenceNumber: checkpoint },
      readMask: { paths: ['sequence_number', 'transactions', 'events'] },
    }),
    headers: { 'content-type': 'application/json' },
  });
  if (response.statusCode >= 400) throw new Error(`SubscribeCheckpoints HTTP ${response.statusCode}: ${await response.body.text()}`);
  return response.body;
}

function extractEvents(message: string): MoveEventEnvelope[] {
  const checkpoint = JSON.parse(message) as any;
  const sequence = Number(checkpoint.sequenceNumber ?? checkpoint.sequence_number ?? 0);
  const events = checkpoint.events ?? [];
  return events.map((event: any, index: number) => ({
    txDigest: event.transactionDigest ?? event.tx_digest ?? event.txDigest,
    eventSeq: Number(event.eventSeq ?? event.event_seq ?? index),
    checkpoint: sequence,
    type: event.type ?? event.eventType,
    bcs: event.bcs ?? event.contents?.bcs ?? '',
  })).filter((event: MoveEventEnvelope) => event.txDigest && event.type && event.bcs);
}

const writer = new PostgresEventWriter();
await writer.migrate();
let nextCheckpoint = (await writer.lastCheckpoint()) + 1;

for (;;) {
  try {
    const stream = await subscribeFrom(nextCheckpoint);
    for await (const chunk of stream) {
      for (const line of Buffer.from(chunk).toString('utf8').split('
').filter(Boolean)) {
        for (const event of extractEvents(line)) {
          if (!matchesMoveEvent(event, eventType)) continue;
          await writer.writeEvent(event, decodeBcsEvent(event));
          nextCheckpoint = Math.max(nextCheckpoint, event.checkpoint + 1);
        }
      }
    }
  } catch (error) {
    console.error('stream failed; reconnecting from checkpoint', nextCheckpoint, error);
    await new Promise((resolve) => setTimeout(resolve, 2_000));
  }
}
