import React from "react";
import "../css/Post.css";
import defaultImage from "../images/defaultImage.png";
import defaultProfile from "../images/defaultProfile.png";

function Post({
  image,
  profile,
  title,
  content,
  tag,
  date,
}) {

  //404 error
  const onError = (e) => {
    console.log("경로 에러!!");
    const { name,src } = e.target;
    name==="profileImage"? 
    src=defaultProfile
    :src=defaultImage
  };

  return (
    <div className="post-container">
      <img
        className="post-img"
        name="postImage"
        src={image? image: defaultImage}
        alt="postImage"
        onError={onError}
      />
      <div className="post-wrap">
        <img
          className="profile-img"
          name="profileImage"
          src={profile? profile: defaultProfile}
          alt="profileImage"
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
