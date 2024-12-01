"use client"

import React from "react";
import Chat from "@/app/component/messaging/Message";
import { ZIMUserInfo } from "zego-zim-web";
import { generateToken } from "@/app/component/token/TokenGenerator";
import { generateToken04 } from "@/app/helpers/zegoServerAssistant";

const Home: React.FC = () => {
    const appID = 280263608; // App ID của bạn
    const server = "1175c6e2e8bec41076e917a9a01a5627"; // Server URL của bạn
    const userInfo = { userID: "user123", userName: "John Doe", userAvatarUrl: "https://example.com/avatar.jpg" };
    const token = generateToken04(
        appID,
        userInfo.userID,
        server,
        3600,
    );

    const handleMessages = (receivedMessages: { from: string; content: string }[]) => {
        console.log("New messages received:", receivedMessages);
        // Here you can implement your logic for handling incoming messages
        receivedMessages.forEach(message => {
          console.log(`Message from ${message.from}: ${message.content}`);
        });
    };
    return (
        <div>
        <h1>Welcome to My App</h1>
        <Chat appID={appID} token={token} onMessageReceived={handleMessages} userInfo={userInfo} />
        </div>
    );
};

export default Home;
