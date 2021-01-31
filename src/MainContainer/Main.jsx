import React from "react";
import PostUpload from "./components/PostUpload";
import UserInfo from "./components/UserInfo";
import PostList from "./components/PostList";

import "./css/Main.css";

function Main() {
  return (
    <section className="content-section">
      <PostUpload />
      <UserInfo />
      <PostList />
    </section>
  );
}

export default Main;
