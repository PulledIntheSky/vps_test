const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

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
