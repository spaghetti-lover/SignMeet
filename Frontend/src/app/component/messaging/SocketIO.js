const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],         // Allow these HTTP methods
        allowedHeaders: ["Content-Type"],
    }
});


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
    
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(5000, () => {
  console.log('server running at http://localhost:5000');
});