import React from "react";
import "./userinfo.css";
import morePng from "../../../../public/more.png";
import videoPng from "../../../../public/video.png";
import editPng from "../../../../public/edit.png";
import avatar from "../../../../public/avatar.png";
import { useUserStore } from "../../../lib/store";
const UserInfo = () => {
  const { currentUser } = useUserStore();

  return (
    <div className="userinfo">
      <div className="user">
        <img src={currentUser.avatar || avatar} alt="" />
        <h3>{currentUser.name}</h3>
      </div>
      <div className="icons">
        <img src={morePng} alt="" />
        <img src={videoPng} alt="" />
        <img src={editPng} alt="" />
      </div>
    </div>
  );
};

export default UserInfo;
