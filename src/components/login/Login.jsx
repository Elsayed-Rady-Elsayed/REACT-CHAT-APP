import React, { useRef, useState } from "react";
import "./login.css";
import avatar from "../../../public/avatar.png";
import { toast } from "react-toastify";
import { auth, db } from "../../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
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
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      toast.success("logined successfully");
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
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
  const loginRef = useRef();
  const registerRef = useRef();
  return (
    <div className="login">
      <div className="item" ref={loginRef}>
        <h2>welcome back,</h2>
        <form action="" onSubmit={handleLogin}>
          <input type="email" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </button>
          <p>
            don't have an account?
            <span
              onClick={() => {
                loginRef.current.classList.add("hidden");
                registerRef.current.classList.remove("hidden");
              }}
            >
              signup
            </span>
          </p>
        </form>
      </div>
      <div className="separtor"></div>
      <div className="item hidden" ref={registerRef}>
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
          <p>
            have an account?
            <span
              onClick={() => {
                loginRef.current.classList.remove("hidden");
                registerRef.current.classList.add("hidden");
              }}
            >
              signin
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
