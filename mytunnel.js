// Cloudflare Worker code
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = 'wss://https://dash.cloudflare.com/argotunnel?aud=&callback=https%3A%2F%2Flogin.cloudflareaccess.org%2FtKAsG9ruPoeDCJ6B2f-bPI3xGSgGVbNARPVLMlZ3KBE%3D'; // Replace with your tunnel URL
  const socket = new WebSocket(url);

  socket.onopen = event => {
    console.log('WebSocket connection established');
    // Send data or perform other actions once the connection is open 
  };

  socket.onmessage = event => {
    console.log('Received message:', event.data);
    // Process incoming messages from the WebSocket server
  };

  socket.onerror = error => {
    console.error('WebSocket error:', error);
    // Handle WebSocket errors
  };

  // Return a response or perform other actions as needed
}
