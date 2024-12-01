
// Handle socket connections
import express, { Express } from 'express';
import http, { Server as HTTPServer } from 'http';
import { useEffect } from 'react';
import { Server as SocketIOServer, Socket } from 'socket.io';

const app: Express = express();
const server: HTTPServer = http.createServer(app);
const io: SocketIOServer = new SocketIOServer(server);

interface ChatMessage {
  msg: string;
}

interface ServerToClientEvents {
  'chat message': (msg: string) => void;
}

interface ClientToServerEvents {
  'chat message': (msg: string) => void;
}

io.on('connection', (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
  console.log('a user connected');

  // Listen for incoming chat messages
  socket.on('chat message', (msg: string) => {
    console.log('message:', msg);
    io.emit('chat message', msg);  // Broadcast message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Start the server
server.listen(5000, () => {
  console.log('Server is running at http://localhost:5000');
});

export const useSocketIO = () => {
  useEffect(() => {
    // Initialize the socket connection
    
  }, []);

  // Return socket instance so that other components can use it
  
};