import React, { Component, createRef } from "react";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
class VideoArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zg: null,
    };
    this.remoteVideoRef = createRef();
  }
  componentDidMount() {
    // Tạo ZegoExpressEngine khi component được mount (tải lần đầu tiên)
    this.createZegoExpressEngineOption();
  }

  async createZegoExpressEngineOption() {
    const { generateToken04 } = require("@/app/helpers/zegoServerAssistant");

    const appID = 280263608;
    const server = "1175c6e2e8bec41076e917a9a01a5627";
    const userID = "user-" + Math.floor(Math.random() * 10000);
    const effectiveTimeInSeconds = 3600;
    const payload = "";

    const roomID = "room-1";
    const userName = "ducanh";
    const token = generateToken04(
      appID,
      userID,
      server,
      effectiveTimeInSeconds,
      payload
    );
    const zg = new ZegoExpressEngine(appID, server);
    this.setState({ zg }, async () => {
      // Lắng nghe sự kiện và sau đó đăng nhập vào phòng
      this.initEvent();
      await this.loginToRoom(roomID, token, userID, userName);
    });
  }
  async loginToRoom(roomID, token, userID, userName) {
    const result = await this.state.zg.loginRoom(
      roomID,
      token,
      { userID, userName },
      { userUpdate: true }
    );
    const config = {
      logLevel: "debug",
      remoteLogLevel: "debug",
      logURL: "",
    };
    this.state.zg.setLogConfig(config);
    const localStream = await this.state.zg.createZegoStream();
    localStream.playVideo(document.querySelector("#local-video"));
    // Publish stream
    const streamID = `video_${userID}`;
    this.state.zg.startPublishingStream(streamID, localStream);
  }
  initEvent() {
    // Callback for updates on the status of the streams in the room.
    this.state.zg.on(
      "roomStreamUpdate",
      async (roomID, updateType, streamList, extendedData) => {
        if (updateType === "ADD") {
          // New stream added, start playing the stream.
          const remoteStream = await this.state.zg.startPlayingStream(
            streamList[streamList.length - 1].streamID
          );
          if (remoteStream) {
            this.remoteVideoRef.current.srcObject = remoteStream;
          }
        } else if (updateType === "DELETE") {
        }
      }
    );
  }
  render() {
    return (
      <div className="flex-grow flex items-center justify-between relative">
        <div id="local-video" style={{ width: "70%", height: "auto" }}></div>
        <div className="participant-videos flex flex-wrap justify-center mt-4">
          {[...Array(1)].map((_, index) => (
            <div
              key={index}
              className="participant-video"
              style={{
                width: "300px",
                height: "200px",
                margin: "10px",
                backgroundColor: "#000",
                borderRadius: "8px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Placeholder for participant video */}
              <video
                id="remote-video"
                ref={this.remoteVideoRef}
                autoPlay
                playsInline
                muted
              ></video>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default VideoArea;
