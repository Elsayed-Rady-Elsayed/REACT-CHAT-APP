import React, { useEffect, useState } from "react";
import "./chatlist.css";
import searchImg from "../../../../public/search.png";
import plusImg from "../../../../public/plus.png";
import minusImg from "../../../../public/minus.png";
import avatarImg from "../../../../public/avatar.png";
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../lib/store";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
  const [chats, setChats] = useState([]);
  const { currentUser } = useUserStore();
  const { changeChat, chatId } = useChatStore();
  const [serachFriend, setSearchFriend] = useState();
  useEffect(() => {
    if (!currentUser) return;

    const unsup = onSnapshot(
      doc(db, "userChats", currentUser.id),
      async (res) => {
        try {
          const items = res.data().chats;
          const promises = items.map(async (el) => {
            if (!el.receiverId) {
              console.error("Receiver ID is undefined for element:", el);
              return null;
            }
            const docRef = doc(db, "users", el.receiverId);
            const docSnap = await getDoc(docRef);
            const user = docSnap.data();
            return { ...el, user };
          });

          const chatData = await Promise.all(promises);
          const filteredChatData = chatData.filter((chat) => chat !== null);
          setChats(filteredChatData.sort((a, b) => b.updatedAt - a.updatedAt));
        } catch (error) {
          console.error("Error fetching chats:", error);
        }
      }
    );
    return () => {
      unsup();
    };
  }, [currentUser]);
  const handleChangeChat = async (chat) => {
    const userChtas = chats.map((el) => {
      const { user, ...rest } = el;
      return rest;
    });
    const chatIndex = userChtas.findIndex(
      (item) => item.chatId === chat.chatId
    );
    userChtas[chatIndex].isSeen = true;
    const userChatsRef = doc(db, "userChats", currentUser.id);
    try {
      await updateDoc(userChatsRef, {
        chats: userChtas,
      });
      changeChat(chat.chatId, chat.user);
    } catch (error) {
      console.log(error);
    }
  };
  const [viewdList, setViewedList] = useState([]);
  useEffect(() => {
    let filterdChats = chats.filter((e) => e.user.name.includes(serachFriend));

    setViewedList(filterdChats);
  }, [serachFriend]);

  return (
    <div className="chatlist">
      <div className="search">
        <div className="searchBar">
          <img src={searchImg} alt="" />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setSearchFriend(e.target.value);
            }}
          />
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
      {viewdList.length === 0 ? (
        <p></p>
      ) : (
        viewdList.map((el) => (
          <div
            key={el.chatId}
            className="item"
            onClick={() => handleChangeChat(el)}
            style={{
              backgroundColor: el.isSeen ? "transparent" : "#5183fe",
            }}
          >
            <img
              src={
                el.user.blocked.includes(currentUser.id)
                  ? avatarImg
                  : el.user.avatar || avatarImg
              }
              alt=""
            />
            <div className="texts">
              <span>
                {el.user.blocked.includes(currentUser.id)
                  ? "user"
                  : el.user.name}
              </span>
              <p>{el.lastMessage}</p>
            </div>
          </div>
        ))
      )}
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
