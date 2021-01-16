import React, { useState } from "react";
import "../css/Post.css";
import defaultImage from "../images/defaultImage.png";
import defaultProfile from "../images/defaultProfile.png";

function Post({
  image = defaultImage,
  profile = defaultProfile,
  title,
  content,
  tag,
  date,
}) {
  //null check
  const ifPostImgisNull = (props) =>
    props === null ? (props = defaultImage) : props;
  const ifProfileisNull = (props) =>
    props === null ? (props = defaultProfile) : props;

  const [imgsrc, setImgsrc] = useState({
    postImage: ifPostImgisNull(image),
    profileImage: ifProfileisNull(profile),
  });

  const { postImage, profileImage } = imgsrc;

  //404 error
  const onError = (e) => {
    console.log("경로 에러!!");
    const { name } = e.target;
    setImgsrc({
      ...imgsrc,
      [name]: defaultImage,
    });
  };

  return (
    <div className="post-container">
      <img
        className="post-img"
        name="postImage"
        src={postImage}
        alt=""
        onError={onError}
      />
      <div className="post-wrap">
        <img
          className="profile-img"
          name="profileImage"
          src={profileImage}
          alt=""
          onError={onError}
        />
        <h2 className="post-title">{title}</h2>
        <p className="post-content">{content}</p>
        <div className="post-tags">
          {tag.map((item) => (
            <span className="tag-item">#{item} </span>
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
