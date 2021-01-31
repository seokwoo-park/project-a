import React, { useEffect } from "react";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/postRedux/postAction";

function PostList() {
  const posts = useSelector((state) => state.posts);
  console.log(posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
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
    </>
  );
}

export default PostList;
