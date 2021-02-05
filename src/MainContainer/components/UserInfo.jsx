import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import defaultUserImage from "../images/defaultUserInfo.svg";
import { fetchUser, editProfileUser } from "../../redux/userRedux/userAction";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
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
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [, , removeCookie] = useCookies();

  const onClickHandler = () => {
    removeCookie("x_auth");
    removeCookie("nickname");
  };

  const onFileChange = (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    formData.append("nickName", user.user_id);
    dispatch(editProfileUser(formData));
  };

  const onErrorImage = (e) => {
    e.target.setAttribute("src", defaultUserImage);
    alert(`Couldn't load the profile picture`);
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="user-info">
      <div className="user-info-profile-container">
        <img
          className="userImage"
          src={user.profile || defaultUserImage}
          onError={onErrorImage}
          alt="profile image"
        />
        <label
          htmlFor="user-info-profile-files"
          className="user-edit-photo-box"
        >
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
          <div className="nickname">{user.user_id}</div>
        <LogoutIcon className="logout-icon" onClick={onClickHandler} />
      </div>
      <div className="icon-box">
        <Link to={`/mypage/${user.user_id}`}>
          <ListIcon className="list-icon icon" />
        </Link>

        <BookmarkIcon className="bookmark-icon icon" />
        <HeartIcon className="heart-icon icon" />
        <EditIcon className="edit-icon icon" />
        <SettingIcon className="setting-icon icon" />
      </div>
    </div>
  );
}

export default React.memo(UserInfo);
