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
import uplode from "../../lib/uplode";
const Chat = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState();
  const endRef = useRef(null);
  const { chatId, user, isCurrentUserBlocked, isrecieverBlocked } =
    useChatStore();
  const { currentUser } = useUserStore();
  const [img, setImg] = useState({
    file: null,
    url: "",
  });
  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
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
    let imgUrl = null;
    try {
      if (img.file) {
        imgUrl = await uplode(img.file);
      }
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text: message,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
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
    setImg({
      file: null,
      url: "",
    });
    setMessage("");
  };
  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={user?.avatar || avatarImg} alt="" />
          <div className="texts">
            <span>{user?.name}</span>
            <p>hey there send me </p>
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
            <div
              className={
                el.senderId === currentUser.id ? "message own" : "message"
              }
              key={el.createdAt}
            >
              <div className="texts">
                {el.img && <img src={el.img} alt="" />}
                <p>{el.text}</p>
                {/* <span>{el.createdAt}</span> */}
              </div>
            </div>
          );
        })}
        {img.url && (
          <div
            className={
              message.senderId === currentUser.id ? "message own" : "message"
            }
          >
            <div className="texts">
              <img src={img.url} alt="" />
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src={imgImg} alt="" />
          </label>
          <input
            type="file"
            onChange={handleImg}
            id="file"
            style={{ display: "none" }}
          />
          <img src={cameraImg} alt="" />
          <img src={micImg} alt="" />
        </div>
        <input
          type="text"
          value={message}
          placeholder="write message"
          disabled={isCurrentUserBlocked || isrecieverBlocked}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="emojies">
          <img src={emoji} alt="" onClick={() => setOpen((prev) => !prev)} />
          <div className="emojieContainer">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button
          className="sendBtn"
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isrecieverBlocked}
        >
          send
        </button>
      </div>
    </div>
  );
};

export default Chat;
