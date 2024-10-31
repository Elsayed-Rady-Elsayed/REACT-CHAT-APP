import React, { useState } from "react";
import "./adduser.css";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import avatarImg from "../../../../../public/avatar.png";
import { useUserStore } from "../../../../lib/store";

const AddUser = () => {
  const [user, setUser] = useState(null);
  const { currentUser } = useUserStore();
  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("name", "==", username));
      const qSnapShot = await getDocs(q);
      if (!qSnapShot.empty) {
        setUser(qSnapShot.docs[0].data());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddUser = async () => {
    const chatRef = collection(db, "chats");
    const userChatRef = collection(db, "userChats");
    try {
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
          isSeen: false,
        }),
      });
      await updateDoc(doc(userChatRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "no",
          receiverId: user.id,
          updatedAt: Date.now(),
          isSeen: false,
        }),
      });

      console.log(newChatRef.id);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="addUser">
      <form action="" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="search for user to add"
          name="username"
        />
        <button>search</button>
      </form>
      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || avatarImg} alt="" />
            <span>sayed rady</span>
          </div>
          <button onClick={handleAddUser}>add user</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
