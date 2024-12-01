"use client";

import React from "react";
import ToolBar from "@/app/component/enter-meeting/ToolBar";
import VideoArea from "@/app/component/enter-meeting/VideoArea";
import MessageComponent from "@/app/component/messaging/Message";
const VideoCallComponent = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Video Area */}
      <VideoArea />
      {/* <MessageComponent/> */}
      {/* Toolbar */}
      <ToolBar />
    </div>
  );
};

export default VideoCallComponent;
