import axios from "axios";
import React, { useState } from "react";
import "../css/Post.css";
import defaultImage from "../images/defaultImage.png";
import defaultProfile from "../images/defaultProfile.png";
import { useCookies } from "react-cookie";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import PostMenu from "./PostMenu";
import { Motion, spring } from "react-motion";
import PostEdit from "./PostEdit";

function Post({ getList, idx, image, profile, title, content, tag, date }) {
  const [postMenu, setPostMenu] = useState(false);
  const [postEdit, setPostEdit] = useState(false);

  const menuToggle = () => {
    setPostMenu(!postMenu);
  };

  const postEditToggle = () => {
    setPostEdit(!postEdit);
  }
  const [cookies] = useCookies();


  //나중에 유저정보 받아와서 본인의 포스트만 삭제할수있도록 구현해야함.
  const onDelete = async (idx) => {
    await axios
      .post(`http://localhost:8081/board/delete`,
      {idx},
      {
        headers : {
          x_auth : cookies.x_auth
        },
      })
      .then((res) => {
        getList();
      })
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
      {postEdit? <PostEdit  postEditToggle={postEditToggle} idx={idx} content={content} image={image} getList={getList}/> : null}
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

        <h2 className="post-title">{title}</h2>
        <p className="post-content">{content}</p>

        <div className="post-footer-container">
          <div className="post-info-wrap">
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
          <div className="post-interest-wrap">
            <div className="like-box">
              <FavoriteBorderOutlinedIcon className="like-btn MuiSvgIcon-fontSizeInherit" />
              <span className="like-count">3만</span>
            </div>
            <div className="comment-box">
              <CommentOutlinedIcon className="comment-btn MuiSvgIcon-fontSizeInherit" />
              <span className="comment-count">2만</span>
            </div>
          </div>
        </div>
      </div>
      <MoreVertIcon className="more-btn" onClick={menuToggle} />
      <Motion
        style={{
          top: spring(postMenu ? 0 : -40),
          opacity: spring(postMenu ? 1 : 0),
        }}
      >
        {(style) => (
          <PostMenu
            postEditToggle = {postEditToggle}
            menuToggle={menuToggle}
            style={{ top: style.top, opacity: style.opacity }}
            onDelete={onDelete}
            idx={idx}
          />
        )}
      </Motion>
    </div>
  );
}

export default Post;
