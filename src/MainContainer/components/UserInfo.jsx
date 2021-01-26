import React, { useState, useRef, useEffect } from "react";
import { useCookies } from "react-cookie";
import defaultUserImage from "../images/defaultUserInfo.svg";
import CreateIcon from "@material-ui/icons/Create";
import Tooltip from "@material-ui/core/Tooltip";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";

import {
  RiLogoutBoxRLine as LogoutIcon,
  RiDraftLine as ListIcon,
  RiFileMarkLine as BookmarkIcon,
  RiHeartLine as HeartIcon,
  RiEdit2Line as EditIcon,
  RiUserSettingsLine as SettingIcon,
} from "react-icons/ri";
import "../css/UserInfo.css";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import axios from "axios";

function UserInfo() {
  const [mySelf, setMySelf] = useState("");
  const [showMySelf, setShowMySelf] = useState(true);

  const [cookies, , removeCookie] = useCookies();
  const myselfEl = useRef();
  const onClickHandler = () => {
    removeCookie("x_auth");
    removeCookie("nickname");
  };

  const onFileChange = (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    formData.append("nickName", "userData.user_id");

    axios
      .post("http://localhost:8081/user/updateprofile", formData, {
        headers: {
          x_auth: cookies.x_auth,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  const mySelfHandler = async () => {
    axios
      .post(
        "http://localhost:8081/user/updateprofile",
        { myself: mySelf, nickName: "userData.user_id" },
        {
          headers: {
            x_auth: cookies.x_auth,
          },
        }
      )
      .then((res) => {
        console.log(res);
        showMySelfToggle();
      })
      .catch((error) => console.log(error));
  };

  const showMySelfToggle = () => {
    setShowMySelf(!showMySelf);
  };

  return (
    <div className="user-info">
      <div className="user-info-profile-container">
        <img className="userImage" src={defaultUserImage} alt="profile image" />
        <label htmlFor="user-info-profile-files">
          <AddAPhotoIcon className="user-info-photoIcon" />
        </label>
        <input
          id="user-info-profile-files"
          onChange={onFileChange}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>
      <div className="user-detail">
        <div className="nickname">test</div>
        <LogoutIcon className="logout-icon" onClick={onClickHandler} />
      </div>
      <div className="icon-box">
        <ListIcon className="list-icon icon" />
        <BookmarkIcon className="bookmark-icon icon" />
        <HeartIcon className="heart-icon icon" />
        <EditIcon className="edit-icon icon" />
        <SettingIcon className="setting-icon icon" />
      </div>
    </div>
  );
}

export default React.memo(UserInfo);
