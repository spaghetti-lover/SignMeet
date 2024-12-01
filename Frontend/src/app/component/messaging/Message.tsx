import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useSocketIO } from './SocketIO';

// Create socket connection
const socket = io('http://localhost:5000');

const Chat = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [message, setMessage] = useState('');
    const messageInputRef = useRef<HTMLInputElement>(null);
    //   const initializeSocket = useSocketIO()

    useEffect(() => {
    // Create socket connection inside useEffect
  
    // Listen for incoming 'chat message' events
    socket.on('chat message', (msg) => {
      console.log(`Received message: ${msg}`);
      setMessages((prevMessages) => [...prevMessages, msg]); // Add the new message to the state
    });
  
    // Cleanup: Remove the listener when the component unmounts
    return () => {
      // setTimeout(() => {}, 5000)
      socket.off('chat message');  // Remove the 'chat message' listener
      // socket.disconnect();         // Disconnect the socket
    };
  }, []); // Empty dependency array ensures this effect runs only once (on mount)

  const sendMessage = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('chat message', message);
      console.log(message)
    //   messages.push(message)
      setMessage('');
      messageInputRef.current && messageInputRef.current.focus(); // Focus back on input
    }
  };

  return (
    <div className="absolute right-0 top-0 bottom-0 w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Chat</h2>
        <button className="text-gray-400 hover:text-white">✖️</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className="bg-gray-700 text-white p-2 rounded-lg">
            {msg}
          </div>
        ))}

      </div>
      <div className="p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <input
            className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none"
            placeholder="Type a message..."
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            ref={messageInputRef}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
