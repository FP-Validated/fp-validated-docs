import WebSocket from 'ws';
type Json = Record<string, unknown>;
export function connectWithBackoff(url: string, buildRequest: () => Json): void {
  let attempt = 0;
  const connect = () => {
    const ws = new WebSocket(url);
    ws.on('open', () => { attempt = 0; ws.send(JSON.stringify(buildRequest())); });
    ws.on('message', (data) => console.log(data.toString()));
    ws.on('close', () => setTimeout(connect, Math.min(30_000, 500 * 2 ** attempt++)));
    ws.on('error', (err) => { console.error(err.message); ws.close(); });
  };
  connect();
}

connectWithBackoff(process.env.SOLANA_WS_URL ?? 'ws://127.0.0.1:8900', () => ({ jsonrpc: '2.0', id: 1, method: 'accountSubscribe', params: [process.env.SOLANA_ACCOUNT ?? '11111111111111111111111111111111', { encoding: 'base64', commitment: 'confirmed' }] }));
