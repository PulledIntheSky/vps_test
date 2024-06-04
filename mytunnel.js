const WebSocket = require('ws');

async function handleRequest(request) {
  const url = 'wss://https://dash.cloudflare.com/argotunnel?aud=&callback=https%3A%2F%2Flogin.cloudflareaccess.org%2FtKAsG9ruPoeDCJ6B2f-bPI3xGSgGVbNARPVLMlZ3KBE%3D'; // Replace with your tunnel URL
  const socket = new WebSocket(url);
}
// Event handler for WebSocket connection open
socket.on('open', () => {
  console.log('WebSocket connection established');

  // Send a test message
  const message = 'Hello from Node.js!';
  socket.send(message);
});

// Event handler for incoming messages
socket.on('message', (data) => {
  console.log('Received message:', data);
});
