import React, { useEffect } from "react";
import Post from "./components/Post";
import PostUpload from "./components/PostUpload";
import UserInfo from "./components/UserInfo";
import "./css/Main.css";
import InfiniteScroll from "react-infinite-scroll-component";
import SpeakerNotesOffIcon from "@material-ui/icons/SpeakerNotesOff";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { usePostState } from "./components/PostContext";

function Main() {
  // const [state, fetchData] = useAsync(getPost, []);
  const state = usePostState();

  const { data } = state;

  if (!data) return null;

  return (
    <section className="content-section">
      <PostUpload />
      <UserInfo />
      {data.map((post) => {
        return (
          <Post
            key={post.idx}
            idx={post.idx}
            id={post.user_id}
            title={post.user_id}
            content={post.content}
            image={post.image}
            tag={["react", "javascript", "node"]}
            date={post.created}
            profile={post.profile}
          />
        );
      })}
    </section>
  );
}

export default Main;
