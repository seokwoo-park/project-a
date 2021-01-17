import React from "react";
import defaultUserInfo from "../images/defaultUserInfo.png";
import "../css/UserInfo.css";

function UserInfo() {
  return (
    <div className="user-info">
      <div className="user-detail">
        <img src={defaultUserInfo} alt="profile image" />
        <div className="nickname">koo님</div>
        <span className="logout-icon"></span>
      </div>
      <div className="icons-container">
        <img src="/images/icons/list-outline.svg" className="list-icon"></img>
        <img
          src="/images/icons/list-outline.svg"
          className="bookmark-icon"
        ></img>
        <span className="heart-icon"></span>
        <span className="edit-introduce-icon"></span>
        <span className="edit-profile-icon"></span>
      </div>
      <span className="introduce-myself">
        나를 한줄로 표현하자면 어떻게 표현할것인가요? 여기에는 그런 글귀가
        들어가는 자리 랍니다.
      </span>
    </div>
  );
}

export default UserInfo;
