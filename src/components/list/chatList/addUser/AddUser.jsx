import React from "react";
import "./adduser.css";
const AddUser = () => {
  return (
    <div className="addUser">
      <form action="">
        <input type="text" placeholder="username" name="username" />
        <button>search</button>
      </form>
      <div className="user">
        <div className="detail">
          <img src="" alt="" />
          <span>sayed rady</span>
        </div>
        <button>add user</button>
      </div>
    </div>
  );
};

export default AddUser;
