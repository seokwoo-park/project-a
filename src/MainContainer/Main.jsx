import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "./components/Post";
import PostUpload from "./components/PostUpload";
import UserInfo from "./components/UserInfo";
import "./css/Main.css";
import InfiniteScroll from "react-infinite-scroll-component";
import SpeakerNotesOffIcon from "@material-ui/icons/SpeakerNotesOff";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import * as _ from "lodash";

function Main() {
  const [list, setList] = useState([]);
  const [scrollPage, setScrollPage] = useState(9);
  const [morePost, setMorePost] = useState(true);
  const getList = async () => {
    try {
      console.log("getList()");
      const res = await axios.get("http://localhost:8081/board/list");
      let result = res.data.reverse().slice(0, scrollPage);
      setList([...result]);
      if (res.data.length === list.length) {
        setMorePost(false);
      }
    } catch (error) {
      throw new Error("cannot response", error);
    }
  };

  useEffect(() => {
    console.log("useEffect()");
    getList();
  }, []);

  if (list === null) return null;

  return (
    <section className="content-section">
      <PostUpload getList={getList} />
      <UserInfo />
      {list.map((data) => {
        return (
          <Post
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
