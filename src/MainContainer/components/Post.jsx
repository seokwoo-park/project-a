import axios from "axios";
import React from "react";
import "../css/Post.css";
import defaultImage from "../images/defaultImage.png";
import defaultProfile from "../images/defaultProfile.png";

function Post({ image, profile, title, content, tag, date }) {
  const onDelete = async (idx) => {
    await axios.post(`http://localhost:8081/board/delete/${idx}`);
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
