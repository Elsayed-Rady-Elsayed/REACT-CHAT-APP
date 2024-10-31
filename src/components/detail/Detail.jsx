import React from "react";
import "./detail.css";
import avatar from "../../../public/avatar.png";
import arrow from "../../../public/arrowUp.png";
import arrowDown from "../../../public/arrowDown.png";
import download from "../../../public/download.png";
import { auth, db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useUserStore } from "../../lib/store";

const Detail = () => {
  const { chatId, user, isCurrentUserBlocked, isrecieverBlocked, changeBlock } =
    useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;
    const userDocRef = doc(db, "users", currentUser.id);
    try {
      await updateDoc(userDocRef, {
        blocked: isrecieverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (e) {}
    changeBlock();
  };
  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || avatar} alt="" />
        <h2>{user?.name}</h2>
        <p>hey there</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src={arrow} alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src={arrow} alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src={arrowDown} alt="" />
          </div>
          <div className="photos">
            {[1, 2, 3, 4, 5].map((el) => {
              return (
                <div className="photoItem">
                  <div className="photoDetail">
                    <img
                      src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
                      alt=""
                    />
                    <span>random text</span>
                  </div>
                  <img src={download} alt="" className="downloadImg" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>shared Files</span>
            <img src={arrow} alt="" />
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "you are blocked"
            : isrecieverBlocked
            ? "user blocked"
            : "block"}
        </button>
        <button className="logout" onClick={() => auth.signOut()}>
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Detail;
