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
  },[]);

  if (list === null) return null;

  return (
    <section className="content-section">
      <PostUpload />
      <UserInfo />
      {list.map((data) => {
        return (
          <Post
            key={data.idx}
            id={data.user_id}
            title={data.user_id}
            content={data.content}
            src={data.imge}
            date={data.created}
          />
        );
      })}
    </section>
  );
}

export default Main;
