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
    // Tạo ZegoExpressEngine khi component được mount
    this.createZegoExpressEngineOption();
  }

  async createZegoExpressEngineOption() {
    const { generateToken04 } = require("@/app/helpers/zegoServerAssistant");

    const appID = 280263608; // App ID của bạn
    const server = "1175c6e2e8bec41076e917a9a01a5627"; // Server URL của bạn
    const userID = "user-" + Math.floor(Math.random() * 10000); // Tạo user ID ngẫu nhiên
    const effectiveTimeInSeconds = 3600;
    const payload = "";

    const roomID = "room-1";
    const userName = "ducanh";
    const token = await generateToken04(
      appID,
      userID,
      server,
      effectiveTimeInSeconds,
      payload
    );

    const zg = new ZegoExpressEngine(appID, server);
    zg.setLogConfig({
      logLevel: 'warn',
      remoteLogLevel: 'warn'
    })
    this.setState({ zg }, async () => {
      // Lắng nghe sự kiện và đăng nhập vào phòng
      this.initEvent(roomID, token, userID, userName);
      await this.loginToRoom(roomID, token, userID, userName);
    });
  }

  async loginToRoom(roomID, token, userID, userName) {
    // Đăng nhập vào phòng
    const result = await this.state.zg.loginRoom(
      roomID,
      token,
      { userID, userName },
      { userUpdate: true }
    );

    // Tạo stream với cả video và audio
    const localStream = await this.state.zg.createStream({
      camera: {
        audio: true, // Bật mic
        video: true, // Bật camera
      },
    });

    // Gắn stream vào video local
    const localVideo = document.querySelector("#local-video");
    if (localVideo) {
      localVideo.srcObject = localStream;
    }

    // Publish stream
    const streamID = `video_${userID}`;
    this.state.zg.startPublishingStream(streamID, localStream);
  }

  async sendBroadcastMessage(zg, roomID, inputMessage) {
    try {
      const isSent = await zg.sendBroadcastMessage(roomID, inputMessage)
      console.log('>>> sendMsg success,', isSent);
    } catch (error) {
        console.log('>>> sendMsg, error:', error);
    };
  }

  async receiveBroadcastMessage(zg, roomID, chatData) {
    zg.on('IMRecvBroadcastMessage', () => {
      console.log('IMRecvBroadcastMessage', roomID, chatData);
      let message = {
          ID:'zego' + chatData[0].fromUser.userID + chatData[0].sendTime,
          name: chatData[0].fromUser.userName,
          time: format(chatData[0].sendTime),
          content: chatData[0].message +'(broadcast sending)'
      }
      this.setData({
          messageList: [...this.data.messageList, message],
          scrollToView: message.ID,
      });
    });
  }

  // TODO: Hàm này sẽ thực hiện share màn hình bằng cách query thẻ div có tag là screen-video rồi nhét luồng stream đó vào bên trong thẻ div đó
  /* Hiện tại code đã test là cho thẳng vào luồng khi user login luôn (hàm zg.loginRoom()) 
   * Khi chạy, cần gọi hàm startScreenSharing với tham số là zg: ZegoExpressEngine
   * Code tham khảo:
      const shareButton = document.getElementById("start-sharing");
      if (shareButton) {
          shareButton.addEventListener("click", () => startScreenSharing(zg));
      } else {
          console.error("Share button not found!");
      }
  
  */
  async startScreenSharing(zg) {
    try {
        const screenStream = await zg.createZegoStream({
            screen: {
                audio: {
                    ANS: false, // Active Noise Suppression
                    AGC: false, // Automatic Gain Control
                    AEC: false, // Acoustic Echo Cancellation
                },
                video: {
                    quality: 3,
                    width: { ideal: 1920 },
                    height: { ideal: 1080 },
                    frameRate: 30,
                    optimizationMode: "detail",
                },
            },
        });

        // Generate a unique stream ID
        const streamID = `screenStream-${new Date().getTime()}`;

        // Publish the screen stream
        zg.startPublishingStream(streamID, screenStream);
        console.log("Screen sharing started with streamID:", streamID);

        // Attach the screen stream to a local video element for preview
        const screenVideoElement = document.getElementById("screen-video");
        if (screenVideoElement) {
            screenStream.playVideo(screenVideoElement)
        }

        // Handle screen sharing ended event
        zg.on("screenSharingEnded", () => {
            console.log("Screen sharing ended!");
            zg.stopPublishingStream(streamID);
        });
    } catch (error) {
        console.error("Failed to start screen sharing:", error);
    }
  }



  async initEvent() {
    // Lắng nghe sự kiện cập nhật stream trong phòng
    this.state.zg.on(
      "roomStreamUpdate",
      async (roomID, updateType, streamList) => {
        console.log("Stream update:", roomID, updateType, streamList);

        if (updateType === "ADD") {
          // Nếu có luồng mới, bắt đầu phát luồng đó
          const remoteStream = await this.state.zg.startPlayingStream(
            streamList[0].streamID
          );

          // Gắn luồng remote vào video và bật audio
          if (this.remoteVideoRef.current) {
            this.remoteVideoRef.current.srcObject = remoteStream;
            this.remoteVideoRef.current.muted = false; // Đảm bảo bật âm thanh từ stream
          }
        
          
          // Create an AudioContext
          const audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();
          const source = audioContext.createMediaStreamSource(remoteStream);

          // Create a processor node
          const processor = audioContext.createScriptProcessor(4096, 1, 1);
          processor.onaudioprocess = (event) => {
            const audioData = event.inputBuffer.getChannelData(0);
            // Send audioData to your speech-to-text model
            this.processAudioData(audioData);
          };

          // const streamDest = audioContext.createMediaStreamDestination()
          // source.connect(streamDest)
          // console.log(source.stream)

          // Connect the audio stream to the processor
          source.connect(processor);
          processor.connect(audioContext.destination);
        } else if (updateType === "DELETE") {
          // Nếu luồng bị xóa, xóa liên kết đến video
          if (this.remoteVideoRef.current) {
            this.remoteVideoRef.current.srcObject = null;
          }
        }
      }
    );

  }

  processAudioData(audioData) {
    if (audioData) {
      // Xử lý dữ liệu âm thanh ở đây
      console.log("Audio data:", audioData);
    }
  }

  

  
  render() {
    return (
      <div className="flex-grow flex items-center justify-between relative">
        {/* Video local */}
        <video
          id="local-video"
          style={{ width: "70%", height: "auto" }}
          autoPlay
          playsInline
          muted
        ></video>

        {/* Video remote */}
        <div className="participant-videos flex flex-wrap justify-center mt-4">
          <div
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
            <video
              id="remote-video"
              ref={this.remoteVideoRef}
              autoPlay
              playsInline
            ></video>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoArea;
