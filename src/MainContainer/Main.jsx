import React, { useEffect } from "react";
import Post from "./components/Post";
import PostUpload from "./components/PostUpload";
import UserInfo from "./components/UserInfo";
import "./css/Main.css";
import SpeakerNotesOffIcon from "@material-ui/icons/SpeakerNotesOff";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from '../redux/postRedux/postAction'

function Main() {
  const posts = useSelector(state => state.posts);
  console.log(posts)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  // if (loading) return <div>로딩중</div>;
  // if (error) return <div>error</div>;
  // if (!data) return null;

  return (
    <section className="content-section">
      <PostUpload />
      <UserInfo />
      {posts.map((post) => {
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
