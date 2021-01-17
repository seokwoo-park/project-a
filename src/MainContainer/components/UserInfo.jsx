import React, { useState, useRef } from "react";
import { useCookies } from "react-cookie";
import defaultUserImage from "../images/defaultUserInfo.svg";
import {
  RiLogoutBoxRLine as LogoutIcon,
  RiDraftLine as ListIcon,
  RiFileMarkLine as BookmarkIcon,
  RiHeartLine as HeartIcon,
  RiEdit2Line as EditIcon,
  RiUserSettingsLine as SettingIcon,
} from "react-icons/ri";
import "../css/UserInfo.css";

function UserInfo() {
  const [myself, setMyself] = useState(
    "나를 한줄로 표현하자면 어떻게 표현할것인가요? 여기에는 그런 글귀가 들어가는 자리"
  );
  const [, , removeCookie] = useCookies(["x_auth"]);
  const myselfEl = useRef();
  const onClickHandler = () => {
    removeCookie("x_auth");
  };

  const onChange = (e) => {
    setMyself(e.target.value);
  };

  return (
    <div className="user-info">
      <img className="userImage" src={defaultUserImage} alt="profile image" />
      <div className="user-detail">
        <div className="nickname">koo님</div>
        <LogoutIcon className="logout-icon" onClick={onClickHandler} />
      </div>
      <div className="icon-box">
        <ListIcon className="list-icon icon" />
        <BookmarkIcon className="bookmark-icon icon" />
        <HeartIcon className="heart-icon icon" />
        <EditIcon className="edit-icon icon" />
        <SettingIcon className="setting-icon icon" />
      </div>
      <textarea
        className="introduce-myself"
        ref={myselfEl}
        type="text"
        onChange={onChange}
        value={myself}
        placeholder="당신을 소개해 주세요"
      />
    </div>
  );
}

export default React.memo(UserInfo);
