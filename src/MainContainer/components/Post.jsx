import axios from "axios";
import React, { useState } from "react";
import "../css/Post.css";
import defaultImage from "../images/defaultImage.png";
import defaultProfile from "../images/defaultProfile.png";
import { useCookies } from "react-cookie";
import MoreVertIcon from '@material-ui/icons/MoreVert';

function Post({getList,idx, image, profile, title, content, tag, date }) {

  const [postMenu,setPostMenu] = useState(false);
  const menuToggle = () => {setPostMenu(!postMenu)}
  const [cookies] = useCookies();


  const onDelete = async (idx) => {
    await axios.post(`http://localhost:8081/board/delete`,{idx:idx})
    .then((res)=>{console.log(res,'deleted')})
    .then(()=>{getList()})
  };

  //404 error
  const onError = (e) => {
    console.log("경로 에러!!");
    switch (e.target.name) {
      case "postImage":
        return (e.target.src = defaultImage);
      case "profileImage":
        return (e.target.src = defaultProfile);
      default:
        throw new Error(
          "Cannot changed default image. onError from ",
          e.target.name
        );
    }
  };
  return (
    <div className="post-container">
      <img
        className="post-img"
        name="postImage"
        src={image ? image : defaultImage}
        alt="postImage"
        onError={onError}
      />
      <div className="post-wrap">
        <img
          className="profile-img"
          name="profileImage"
          src={profile ? profile : defaultProfile}
          alt="profileImage"
          onError={onError}
        />
        <MoreVertIcon className="post-menu" onClick={menuToggle}/>
        {postMenu? 
          <div className="post-menu-list">
            <ul>
              <li>Edit Post</li>
              {title === cookies.nickname
              ?<li onClick={()=>onDelete(idx)}>Delete Post</li> 
              : null}
            </ul>
          </div>
        : null
        }
        <h2 className="post-title">{title}</h2>
        <p className="post-content">{content}</p>
        <div className="post-tags">
          {tag.map((item, i) => (
            <span key={i} className="tag-item">
              #{item}{" "}
            </span>
          ))}
        </div>
        <div className="post-date">
          {date.slice(0, 10).replaceAll("-", ". ")}
        </div>
      </div>
    </div>
  );
}

export default Post;
