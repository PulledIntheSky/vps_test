const WebSocket = require('ws');

async function handleRequest(request) {
  const url = 'http://futureprojects.cloudns.org:3000'; // Replace with your tunnel URL
  const socket = new WebSocket(url);

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
}

// Call the handleRequest function
handleRequest(/* pass your request object here */);
