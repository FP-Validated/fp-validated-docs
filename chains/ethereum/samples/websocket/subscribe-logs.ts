import WebSocket from 'ws';

async function sleep(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)); }
function wsUrl() { return process.env.WS_URL ?? 'ws://127.0.0.1:8546'; }
const address = process.env.CONTRACT_ADDRESS ?? '0xdAC17F958D2ee523a2206206994597C13D831ec7';
const transferTopic = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
let attempt = 0;
async function connect() {
  const ws = new WebSocket(wsUrl());
  ws.on('open', () => {
    attempt = 0;
    ws.send(JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_subscribe', params: ['logs', { address, topics: [transferTopic] }] }));
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
