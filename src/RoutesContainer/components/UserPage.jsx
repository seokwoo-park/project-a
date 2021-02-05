import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserPageInfo from "../../MainContainer/components/UserPageInfo";
import { getUserPosts } from "../../redux/postRedux/postAction";
import Post from "../../MainContainer/components/Post";
import AppBar from "../../MainContainer/components/AppBar";
import {Cookies} from 'react-cookie';
import axios from "axios";

const cookies = new Cookies();

function UserPage({match}) {
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts.postList);
  const dispatch = useDispatch();

  const userName = match.params.user;
  const [userInfo,setUserInfo] = useState();
  const [isMyPage,setIsMyPage] = useState();

  
  const getUserInfo = async() => {
   if(userName !== user.user_id){
     console.log('본인의 페이지가 아닙니다.');
     setIsMyPage(false);
     await axios.post(
      "http://localhost:8081/user/myprofile",
          { nickName: userName },
          {
              headers: {
              x_auth:cookies.get("x_auth"),
              },
          }
      ).then((res)=>{setUserInfo(...res.data)})
   } else {
     console.log('본인의 페이지 입니다.');
     setIsMyPage(true);
   }
  }

  console.log(posts.length)

  useEffect(() => {
    getUserInfo();
    dispatch(getUserPosts(userName))
  }, []);

  return (
    <div className="my-page">
      <AppBar />
      <UserPageInfo 
      isMyPage={isMyPage}
      user={userInfo||user} />
      {posts.length >= 1 ?
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
        
        : <div className="content-loading">No posts to see! <br/>
        share the posts to people</div>
      }
    </div>
  );
}

export default UserPage;
