import React from "react";
import "./userinfo.css";
import morePng from "../../../../public/more.png";
import videoPng from "../../../../public/video.png";
import editPng from "../../../../public/edit.png";
import avatar from "../../../../public/avatar.png";
import logout from "../../../../public/logout.png";
import { useUserStore } from "../../../lib/store";
import { auth } from "../../../lib/firebase";
const UserInfo = () => {
  const { currentUser } = useUserStore();

  return (
    <div className="userinfo">
      <div className="user">
        <img src={currentUser.avatar || avatar} alt="" />
        <p>{currentUser.name}</p>
      </div>
      <div className="icons">
        <img src={editPng} alt="" />
        <span className="logout" onClick={() => auth.signOut()}>
          <img src={logout} alt="" />
        </span>
      </div>
    </div>
  );
};

export default UserInfo;
