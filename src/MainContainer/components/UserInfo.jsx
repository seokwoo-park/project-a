import React, { useState, useRef, useEffect } from "react";
import { useCookies } from "react-cookie";
import defaultUserImage from "../images/defaultUserInfo.svg";
import CreateIcon from '@material-ui/icons/Create';
import Tooltip from '@material-ui/core/Tooltip';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

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



function UserInfo({userData,getUser}) {

  const [mySelf,setMySelf] = useState('');
  const [showMySelf,setShowMySelf] =useState(true)
 
  const [cookies, , removeCookie] = useCookies();
  const myselfEl = useRef();
  const onClickHandler = () => {
    removeCookie("x_auth");
    removeCookie("nickname");
  };
  

  const onFileChange = (e)=> {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    formData.append("nickName", userData.user_id)

    axios.post('http://localhost:8081/user/updateprofile',formData,{
      headers : {
        x_auth : cookies.x_auth
      }
    }).then((res)=>{console.log(res); getUser();})
    .catch((error)=> console.log(error))
  }
  

  const mySelfHandler = async() => {
    axios.post('http://localhost:8081/user/updateprofile',{myself : mySelf ,nickName : userData.user_id},{
      headers : {
        x_auth : cookies.x_auth
      }
    }).then((res)=>{console.log(res);
       getUser();
      showMySelfToggle();
      })
    .catch((error)=> console.log(error))
  }


  const showMySelfToggle = () => {
    setShowMySelf(!showMySelf);
  }

  


  return (
    <div className="user-info">
      <div className="user-info-profile-container">
        <img className="userImage" src={userData.profile || defaultUserImage} alt="profile image" />
        <label htmlFor="user-info-profile-files">
          <AddAPhotoIcon className="user-info-photoIcon"/>
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
        <div className="nickname">{userData.user_id}</div>
        <LogoutIcon className="logout-icon" onClick={onClickHandler} />
      </div>
      <div className="icon-box">
        <ListIcon className="list-icon icon" />
        <BookmarkIcon className="bookmark-icon icon" />
        <HeartIcon className="heart-icon icon" />
        <EditIcon className="edit-icon icon" />
        <SettingIcon className="setting-icon icon" />
      </div>

        {showMySelf
        ?
        <div className="myself-container">
          {userData.myself == '' || null ?
           <p style={{color: "gray", fontStyle : "italic"}}>How was your day? Share your day!</p> 
           :<p>{userData.myself}</p> }
          <Tooltip title="Click to Change" aria-label="add">
            <CreateIcon className="myself-btn" onClick={showMySelfToggle}/> 
          </Tooltip>
        </div>

        : 
        <div className="myself-edit-container">
          <textarea
            className="introduce-myself"
            ref={myselfEl}
            type="text"
            onChange={(e)=>{setMySelf(e.target.value);console.log(mySelf)}}
            value={mySelf}
            maxLength="45"
            placeholder="describe your moods or days!"
          />
          <div>
            <button className="myself-edit-btn" type="submit" onClick={mySelfHandler}><DoneIcon/></button>
            <button className="myself-edit-btn" onClick={showMySelfToggle} style={{backgroundColor : "rgb(194, 46, 46)"}}><CloseIcon/></button>
          </div>
        </div>}

 
        
    </div>
  );
}

export default React.memo(UserInfo);
