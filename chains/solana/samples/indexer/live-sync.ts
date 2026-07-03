import WebSocket from 'ws';
const wsUrl = process.env.SOLANA_WS_URL ?? 'ws://127.0.0.1:8900';
const programId = process.env.SOLANA_PROGRAM_ID ?? '11111111111111111111111111111111';
let highestSlot = Number(process.env.SOLANA_START_SLOT ?? 0);
function connect(attempt = 0): void {
  const ws = new WebSocket(wsUrl);
  ws.on('open', () => ws.send(JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'logsSubscribe', params: [{ mentions: [programId] }, { commitment: 'confirmed' }] })));
  ws.on('message', (data) => { const message = JSON.parse(data.toString()); const slot = message?.params?.result?.context?.slot; if (typeof slot === 'number') highestSlot = Math.max(highestSlot, slot); console.log(JSON.stringify({ highestSlot, message })); });
  ws.on('close', () => setTimeout(() => connect(attempt + 1), Math.min(30_000, 500 * 2 ** attempt)));
  ws.on('error', () => ws.close());
}
connect();
