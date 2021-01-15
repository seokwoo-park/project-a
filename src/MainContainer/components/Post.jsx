import React from "react";
import "../css/Post.css";

function Post({ id, src, title, content, date, tag }) {
  console.log("[post]: ", title, content, date, tag, src);
  return (
    <div className="post-container">
      <div className="post-img"></div>
      <div className="post-wrap">
        <div className="profile-img"></div>
        <h2 className="post-title">{title}</h2>
        <p className="post-content">{content}</p>
        <div className="post-tags">{tag}</div>
        <div className="post-date">{date}</div>
      </div>
    </div>
  );
}

export default Post;
