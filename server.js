const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const pty = require('node-pty');
const path = require('path');
const fs = require('fs');
const privateKey = fs.readFileSync('vps_test/certificates/my-key.pem', 'utf8');
const certificate = fs.readFileSync('vps_test/certificates/my-cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const app = express();
const server = http.createServer(credentials, app);
const wss = new WebSocket.Server({ server });

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// WebSocket connection
wss.on('connection', (ws) => {
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
});

// Start the server
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
