export type MoveEventEnvelope = {
  txDigest: string;
  eventSeq: number;
  checkpoint: number;
  type: string;
  bcs: string;
};

export function matchesMoveEvent(event: MoveEventEnvelope, expectedType: string): boolean {
  return event.type === expectedType || event.type.endsWith(`::${expectedType}`);
}

export function decodeBcsEvent(event: MoveEventEnvelope): Record<string, unknown> {
  const bytes = Buffer.from(event.bcs, 'base64');
  return {
    txDigest: event.txDigest,
    eventSeq: event.eventSeq,
    checkpoint: event.checkpoint,
    type: event.type,
    bcsHex: `0x${bytes.toString('hex')}`,
  };
}
