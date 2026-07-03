import { setTimeout as sleep } from "node:timers/promises";
import { loadConfig } from "./stream-setup";

type StreamedTransaction = {
  version: bigint;
  hash: string;
  events: Array<{ key: string; sequenceNumber: string; type: string }>;
};

type TransactionSource = {
  readFrom(startingVersion: bigint): AsyncGenerator<StreamedTransaction>;
};

class Http2JsonTransactionSource implements TransactionSource {
  constructor(private readonly endpoint: string, private readonly authToken?: string) {}

  async *readFrom(startingVersion: bigint): AsyncGenerator<StreamedTransaction> {
    let nextVersion = startingVersion;
    for (;;) {
      const response = await fetch(`${this.endpoint}/transactions?start_version=${nextVersion.toString()}&limit=100`, {
        headers: this.authToken ? { authorization: `Bearer ${this.authToken}` } : {},
      });
      if (response.status === 204) {
        await sleep(1_000);
        continue;
      }
      if (!response.ok) throw new Error(`transaction stream read failed: ${response.status} ${response.statusText}`);
      const batch = (await response.json()) as Array<{ version: string; hash: string; events?: StreamedTransaction["events"] }>;
      if (batch.length === 0) {
        await sleep(1_000);
        continue;
      }
      for (const item of batch) {
        const transaction = { version: BigInt(item.version), hash: item.hash, events: item.events ?? [] };
        nextVersion = transaction.version + 1n;
        yield transaction;
      }
    }
  }
}

async function readCheckpoint(): Promise<bigint> {
  return BigInt(process.env.APTOS_LAST_COMMITTED_VERSION ?? "0");
}

async function commitTransaction(transaction: StreamedTransaction): Promise<void> {
  console.log(JSON.stringify({ processedVersion: transaction.version.toString(), hash: transaction.hash }));
}

const config = loadConfig();
const checkpoint = await readCheckpoint();
const start = checkpoint > config.startingVersion ? checkpoint + 1n : config.startingVersion;
const source = new Http2JsonTransactionSource(config.endpoint, config.authToken);

for await (const transaction of source.readFrom(start)) {
  await commitTransaction(transaction);
}
