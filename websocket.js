const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('Local WebSocket server connected.');

  ws.on('message', function incoming(message) {
    console.log('Received from local terminal:', message);
    // Forward message to Cloudflare Worker WebSocket
    // Modify this part based on your Cloudflare Worker WebSocket URL
  });
});
