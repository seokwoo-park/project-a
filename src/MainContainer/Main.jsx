import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "./components/Post";
import PostUpload from "./components/PostUpload";
import UserInfo from "./components/UserInfo";

import "./css/Main.css";

function Main() {
  const [list, setList] = useState(null);

  const getList = async () => {
    try {
      const res = await axios.get("http://localhost:8081/board/list");
      setList(res.data);
    } catch (error) {
      throw new Error("cannot response", error);
    }
  };

  useEffect(() => {
    getList();
    console.log('렌더링됐습니다.')
  },[]);

  if (list === null) return null;
  return (
    <section className="content-section">
      <PostUpload/>
      <UserInfo />
      {list.reverse().map((data) => {
        return (
          <Post
            isPosted
            key={data.idx}
            id={data.user_id}
            title={data.user_id}
            content={data.content}
            image={data.image}
            tag={["react", "javascript", "node"]}
            date={data.created}
            profile={data.profile}
          />
        );
      })}
    </section>
  );
}

export default Main;
