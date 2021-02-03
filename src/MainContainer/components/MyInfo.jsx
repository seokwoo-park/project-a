import React from "react";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import {
  RiLogoutBoxRLine as LogoutIcon,
  RiDraftLine as ListIcon,
  RiFileMarkLine as BookmarkIcon,
  RiHeartLine as HeartIcon,
  RiEdit2Line as EditIcon,
  RiUserSettingsLine as SettingIcon,
} from "react-icons/ri";
import defaultUserImage from "../images/defaultUserInfo.svg";
import "../css/MyInfo.css";

function MyInfo({ user }) {
  return (
    <>
      <div className="my-info-container">
        <div className="my-profile-image-wrapper">
          <img
            className="my-image"
            src={user.profile || defaultUserImage}
            alt="profile image"
          />
          <label htmlFor="my-profile-image" className="user-edit-photo-box">
            <AddAPhotoIcon className="user-info-photoIcon" />
          </label>
          <input
            id="my-profile-image"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>
        <div className="my-info-wrapper">
          <div className="my-nickname-box">
            <div className="nickname">{user.user_id}</div>
            <LogoutIcon className="logout-icon" />
          </div>
          <div className="my-self-box">
            나를 한줄로 표현하자면 어떻게 표현할것인가요? 여기에는 그런 글귀가
            들어가는 자리
          </div>
        </div>
        <div className="my-detail-wrapper">
          <div className="my-detail-item">
            <ListIcon className="list-icon icon" />
            <div>게시물</div>
            <div className="count">13</div>
          </div>
          <div className="my-detail-item">
            <BookmarkIcon className="bookmark-icon icon" />
            <div>북마크</div>
            <div className="count">1</div>
          </div>
          <div className="my-detail-item">
            <HeartIcon className="heart-icon icon" />
            <div>좋아요</div>
            <div className="count">5</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyInfo;
