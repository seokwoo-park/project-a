import React, { useEffect, useRef, useState } from "react";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { fetchMorePosts, getPosts } from "../../redux/postRedux/postAction";
import InfiniteScroll from "react-infinite-scroll-component";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import SpeakerNotesOffIcon from "@material-ui/icons/SpeakerNotesOff";

function PostList() {
  const posts = useSelector((state) => state.posts);
  const [scrollPage, setScrollPage] = useState(15);
  const nextPost = useRef(15);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
      <InfiniteScroll
        className="content-section"
        dataLength={posts.postList.length}
        next={() => {
          setTimeout(() => {
            dispatch(fetchMorePosts(scrollPage));
            setScrollPage(nextPost.current += 6);
            // nextPost.current += 6;
          }, 1000);
        }}
        hasMore={posts.hasMore}
        loader={
          <p className="content-loading">
            {" "}
            Loading <AutorenewIcon />
          </p>
        }
        endMessage={
          <p className="content-loading">
            You have seen it all the posts <SpeakerNotesOffIcon />
          </p>
        }
      >
        {posts.postList.map((post) => {
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
    </>
  );
}

export default PostList;
