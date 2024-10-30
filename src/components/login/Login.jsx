import React, { useState } from "react";
import "./login.css";
import avatar from "../../../public/avatar.png";
import { toast } from "react-toastify";
import { auth, db } from "../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import uplode from "../../lib/uplode";
const Login = () => {
  const [selectImg, setSelectImg] = useState({
    file: null,
    url: "",
  });
  const [loading, setLoading] = useState(false);
  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setSelectImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();
    toast.warn("hello");
    toast.success("ggg");
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { name, email, password } = Object.fromEntries(formData);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const imgUrl = await uplode(selectImg.file);

      await setDoc(doc(db, "users", response.user.uid), {
        name,
        email,
        avatar: imgUrl,
        id: response.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, "userChats", response.user.uid), {
        chats: [],
      });

      toast.success("Your Account Created Successfully");
      setLoading(false);
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login">
      <div className="item">
        <h2>welcome back,</h2>
        <form action="" onSubmit={handleLogin}>
          <input type="email" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </div>
      <div className="separtor"></div>
      <div className="item">
        <h2>Create Account</h2>
        <form action="" onSubmit={handleRegister}>
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
          <button disabled={loading}>
            {" "}
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
