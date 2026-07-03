import WebSocket from 'ws';

async function sleep(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)); }
function wsUrl() { return process.env.WS_URL ?? 'ws://127.0.0.1:8546'; }
let attempt = 0;
async function connect() {
  const ws = new WebSocket(wsUrl());
  ws.on('open', () => {
    attempt = 0;
    ws.send(JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_subscribe', params: ['newHeads'] }));
  });
  ws.on('message', data => console.log(data.toString()));
  ws.on('close', async () => {
    const delay = Math.min(30000, 1000 * 2 ** attempt++);
    await sleep(delay);
    connect();
  });
  ws.on('error', err => console.error('websocket error', err.message));
}
connect();
