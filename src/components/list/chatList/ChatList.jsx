import React, { useState } from "react";
import "./chatlist.css";
import searchImg from "../../../../public/search.png";
import plusImg from "../../../../public/plus.png";
import minusImg from "../../../../public/minus.png";
import avatarImg from "../../../../public/avatar.png";
import AddUser from "./addUser/AddUser";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
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
      <div className="item">
        <img src={avatarImg} alt="" />
        <div className="texts">
          <span>jane doe</span>
          <p>hello now</p>
        </div>
      </div>
      <div className="item">
        <img src={avatarImg} alt="" />
        <div className="texts">
          <span>jane doe</span>
          <p>hello now</p>
        </div>
      </div>
      <div className="item">
        <img src={avatarImg} alt="" />
        <div className="texts">
          <span>jane doe</span>
          <p>hello now</p>
        </div>
      </div>
      <div className="item">
        <img src={avatarImg} alt="" />
        <div className="texts">
          <span>jane doe</span>
          <p>hello now</p>
        </div>
      </div>
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
