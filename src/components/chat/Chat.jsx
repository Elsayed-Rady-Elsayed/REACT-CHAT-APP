import React, { useEffect, useRef, useState } from "react";
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
import {
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/store";
const Chat = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState();
  const endRef = useRef(null);
  const { chatId, user } = useChatStore();
  const { currentUser } = useUserStore();

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  });
  const handleEmoji = (e) => {
    setMessage((prev) => prev + e.emoji);
  };

  useEffect(() => {
    const unSup = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      unSup();
    };
  }, [chatId]);

  const handleSend = async () => {
    if (message == "") {
      return;
    }
    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text: message,
          createdAt: new Date(),
        }),
      });
      const userIds = [currentUser.id, user.id];
      userIds.forEach(async (id) => {
        const userChatRef = doc(db, "userChats", id);
        const userChatSnapShot = await getDoc(userChatRef);
        if (userChatSnapShot.exists()) {
          const userChatData = userChatSnapShot.data();
          const chatIndex = userChatData.chats.findIndex(
            (c) => c.chatId === chatId
          );
          userChatData.chats[chatIndex].lastMessage = message;
          userChatData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatData.chats[chatIndex].updatedAt = Date.now();
          await updateDoc(userChatRef, {
            chats: userChatData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
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
        {chat?.messages?.map((el) => {
          return (
            <div className="message own" key={el.createdAt}>
              <div className="texts">
                {el.img && <img src={el.img} alt="" />}
                <p>{el.text}</p>
                {/* <span>{el.createdAt}</span> */}
              </div>
            </div>
          );
        })}
        <div ref={endRef}></div>
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
        <button className="sendBtn" onClick={handleSend}>
          send
        </button>
      </div>
    </div>
  );
};

export default Chat;
