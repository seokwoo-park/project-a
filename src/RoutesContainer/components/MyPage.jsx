import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MyInfo from "../../MainContainer/components/MyInfo";
import { getMyPosts } from "../../redux/postRedux/postAction";
import Post from "../../MainContainer/components/Post";
import AppBar from "../../MainContainer/components/AppBar";

function MyPage() {
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts.postList);
  const dispatch = useDispatch();
  console.log(posts);

  useEffect(() => {
    dispatch(getMyPosts());
  }, []);

  return (
    <div className="my-page">
      <AppBar />
      <MyInfo user={user} />
      <section className="content-section">
        {posts.map((post) => {
          return (
            <Post
              className="content-section"
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
    </div>
  );
}

export default MyPage;
