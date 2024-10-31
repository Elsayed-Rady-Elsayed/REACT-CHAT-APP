import React, { useEffect, useState } from "react";
import "./chatlist.css";
import searchImg from "../../../../public/search.png";
import plusImg from "../../../../public/plus.png";
import minusImg from "../../../../public/minus.png";
import avatarImg from "../../../../public/avatar.png";
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../lib/store";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";
const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const { currentUser } = useUserStore();
  useEffect(() => {
    const unsup = onSnapshot(
      doc(db, "userChats", currentUser.id),
      async (res) => {
        const items = doc.data().chats;
        const promises = items.map(async (el) => {
          const docRef = doc(db, "users", el.recieverId);
          const docSnap = await getDoc(docRef);
          const user = docSnap.data();
          return { ...el, user };
        });
        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );
    return () => {
      unsup();
    };
  }, [currentUser.id]);
  return (
    <div className="chatlist">
      <div className="search">
        <div className="searchBar">
          <img src={searchImg} alt="" />
          <input type="text" placeholder="Search" />
        </div>
        <img
          src={addMode ? minusImg : plusImg}
          alt=""
          className="add"
          onClick={() => {
            setAddMode((prev) => !prev);
          }}
        />
      </div>
      {chats.map((el) => {
        return (
          <div key={el.chatid} className="item">
            <img src={avatarImg} alt="" />
            <div className="texts">
              <span>{el.sender}</span>
              <p>{el.lastMessage}</p>
            </div>
          </div>
        );
      })}
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
