import React, { useState } from "react";
import "./login.css";
import avatar from "../../../public/avatar.png";
const Login = () => {
  const [selectImg, setSelectImg] = useState({
    file: null,
    url: "",
  });
  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setSelectImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  return (
    <div className="login">
      <div className="item">
        <h2>welcome back,</h2>
        <form action="">
          <input type="email" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button>Sign In</button>
        </form>
      </div>
      <div className="separtor"></div>
      <div className="item">
        <h2>Create Account</h2>
        <form action="">
          <input type="email" placeholder="Email" name="email" />
          <input type="text" placeholder="Name" name="name" />
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <label htmlFor="file">
            <img src={selectImg.url || avatar} alt="" />
            uplode personal image
          </label>
          <input type="password" placeholder="Password" name="password" />
          <button>Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
