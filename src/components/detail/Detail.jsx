import React from "react";
import "./detail.css";
import avatar from "../../../public/avatar.png";
import arrow from "../../../public/arrowUp.png";
import arrowDown from "../../../public/arrowDown.png";
import download from "../../../public/download.png";

const Detail = () => {
  return (
    <div className="detail">
      <div className="user">
        <img src={avatar} alt="" />
        <h2>sayed rady</h2>
        <p>Lorem ipsum, dolor sit amet consectetur</p>
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
        <button>block</button>
      </div>
    </div>
  );
};

export default Detail;
