const http = require('http');
const express = require('express');
const WebSocket = require('ws');
const pty = require('node-pty');
const path = require('path');
const fs = require('fs');

const app = express();

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  console.log('Local WebSocket server connected.');

  const shell = process.env.SHELL || '/bin/bash';
  const ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 24,
    cwd: process.env.HOME,
    env: process.env
  });

  ptyProcess.on('data', (data) => {
    ws.send(data);
  });

  ws.on('message', (msg) => {
    ptyProcess.write(msg);
  });

  ws.on('close', () => {
    ptyProcess.kill();
  });

  ws.on('message', function incoming(message) {
    console.log('Received from local terminal:', message);
    // Forward message to Cloudflare Worker WebSocket
    // Modify this part based on your Cloudflare Worker WebSocket URL
  });
});

server.listen(80, () => {
  console.log('Server is listening on port 80');
});
