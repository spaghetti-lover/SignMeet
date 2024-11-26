"use client"

import React, { useEffect, useState } from "react";
import { ZIM, ZIMMessage, ZIMSDK, ZIMUserInfo } from "zego-zim-web";

interface ChatProps {
  appID: number;
  token: string;
  userInfo: ZIMUserInfo;
  onMessageReceived?: (messages: { from: string; content: string }[]) => void;
}

const Chat: React.FC<ChatProps> = ({ appID, token, userInfo, onMessageReceived }) => {
  const [zim, setZim] = useState<ZIMSDK |null>(null);
  const [targetID, setTargetID] = useState<string>("");
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<{ from: string; content: string }[]>([]);

  useEffect(() => {
    // Initialize ZIM SDK
    const zimInstance = ZIM.create({ appID });
    setZim(zimInstance);

    // Handle incoming messages
    zimInstance?.on(
      "receivePeerMessage",
      (_, { messageList, fromConversationID }: { messageList: ZIMMessage[]; fromConversationID: string }) => {
        const receivedMessages = messageList.map((msg) => ({
          from: fromConversationID,
          content: typeof msg.message === "string" ? msg.message : new TextDecoder().decode(msg.message),
        }));
        setMessages((prev) => [...prev, ...receivedMessages]);
        if (onMessageReceived) {
          onMessageReceived(receivedMessages);
        }
      }
    );

    return () => {
      zimInstance?.destroy();
    };
  }, [appID, onMessageReceived]);

  const handleLogin = async () => {
    if (!zim) return;

    try {
      await zim.login(userInfo, token);
      alert("Login successful!");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Check console for details.");
    }
  };

  const handleSendMessage = async () => {
    if (!zim || !targetID || !newMessage) return;

    const messageTextObj = { type: 1, message: newMessage }; // 1: Text message
    const conversationType = 0; // Peer-to-peer chat
    const config = { priority: 1 };

    try {
      await zim.sendMessage(messageTextObj, targetID, conversationType, config);
      setMessages((prev) => [...prev, { from: "You", content: newMessage }]);
      setNewMessage("");
    } catch (err) {
      console.error("Message sending failed:", err);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "8px" }}>
      <h2>Chat Component</h2>

      {/* Login */}
      <button onClick={handleLogin}>Login</button>

      {/* Send Message */}
      <div>
        <input
          type="text"
          placeholder="Target User ID"
          value={targetID}
          onChange={(e) => setTargetID(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>

      {/* Messages Display */}
      <div style={{ marginTop: "20px" }}>
        <h3>Messages</h3>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <b>{msg.from}: </b>
              {msg.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chat;
