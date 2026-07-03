export type TransactionStreamConfig = {
  endpoint: string;
  startingVersion: bigint;
  authToken?: string;
};

export function loadConfig(): TransactionStreamConfig {
  const endpoint = process.env.APTOS_TRANSACTION_STREAM_ENDPOINT ?? "http://127.0.0.1:50051";
  const startingVersion = BigInt(process.env.APTOS_STARTING_VERSION ?? "0");
  return { endpoint, startingVersion, authToken: process.env.APTOS_TRANSACTION_STREAM_TOKEN };
}
