import React from "react";
import Post from "./components/Post";
import PostUpload from "./components/PostUpload";
import UserInfo from "./components/UserInfo";
import "./css/Main.css";
import InfiniteScroll from "react-infinite-scroll-component";
import SpeakerNotesOffIcon from "@material-ui/icons/SpeakerNotesOff";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { useFetchData, usePostState } from "./components/PostContext";

function Main() {
  // postContext에서 컨텍스트로 state와 fetchData를 받아옴.
  // state에는 postData 와 userData가 있음.
  const state = usePostState();
  const fetchData = useFetchData();
  const { hasMore } = state;
  const { postData } = state.data;
  console.log(state.data);
  if (!postData) return null;

  return (
    <section className="content-section">
      <PostUpload />
      <UserInfo />
      <InfiniteScroll
        dataLength={postData.length}
        next={() =>
          setTimeout(() => {
            fetchData();
          }, 1000)
        }
        hasMore={hasMore}
        loader={
          <p className="content-loading">
            Loading <AutorenewIcon />
          </p>
        }
        endMessage={
          <p className="content-loading">
            You have seen all the posts <SpeakerNotesOffIcon />{" "}
          </p>
        }
        className="content-section"
      >
        {postData.map((post) => {
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
      </InfiniteScroll>
    </section>
  );
}

export default Main;
