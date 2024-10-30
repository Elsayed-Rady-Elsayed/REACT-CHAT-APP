import React, { useState } from "react";
import "./chat.css";
import avatarImg from "../../../public/avatar.png";
import phoneImg from "../../../public/phone.png";
import videoImg from "../../../public/video.png";
import infoImg from "../../../public/info.png";
import emoji from "../../../public/emoji.png";
import imgImg from "../../../public/img.png";
import cameraImg from "../../../public/camera.png";
import micImg from "../../../public/mic.png";
import EmojiPicker from "emoji-picker-react";
const Chat = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const handleEmoji = (e) => {
    setMessage((prev) => prev + e.emoji);
  };
  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={avatarImg} alt="" />
          <div className="texts">
            <span>sayed rady</span>
            <p>hello world</p>
          </div>
        </div>
        <div className="icons">
          <img src={phoneImg} alt="" />
          <img src={videoImg} alt="" />
          <img src={infoImg} alt="" />
        </div>
      </div>
      <div className="center">
        <div className="message">
          <img src={avatarImg} alt="" />
          <div className="texts">
            <p>hello bto</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src={avatarImg} alt="" />
          <div className="texts">
            <p>hello bto</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>hello bto</p>
            <span>1 min ago</span>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src={imgImg} alt="" />
          <img src={cameraImg} alt="" />
          <img src={micImg} alt="" />
        </div>
        <input
          type="text"
          value={message}
          placeholder="write message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="emojies">
          <img src={emoji} alt="" onClick={() => setOpen((prev) => !prev)} />
          <div className="emojieContainer">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendBtn">send</button>
      </div>
    </div>
  );
};

export default Chat;
