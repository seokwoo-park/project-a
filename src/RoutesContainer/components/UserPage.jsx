import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserPageInfo from "../../MainContainer/components/UserPageInfo";
import { getUserPosts } from "../../redux/postRedux/postAction";
import Post from "../../MainContainer/components/Post";
import AppBar from "../../MainContainer/components/AppBar";
import {Cookies} from 'react-cookie';
import axios from "axios";

const cookies = new Cookies();

function UserPage() {
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts.postList);
  const dispatch = useDispatch();
  const whosPage = cookies.get('userPage')
  const [userInfo,setUserInfo] = useState();
  const [isMyPage,setIsMyPage] = useState();
  
  const getUserInfo = async() => {
   if(whosPage !== user.user_id){
     console.log('본인의 페이지가 아닙니다.');
     setIsMyPage(false);
     await axios.post(
      "http://localhost:8081/user/myprofile",
          { nickName: whosPage },
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
  

  useEffect(() => {
    getUserInfo();
    dispatch(getUserPosts(whosPage))
    
    return () => {
      cookies.remove('userPage')
    }
  }, []);

  return (
    <div className="my-page">
      <AppBar />
      <UserPageInfo 
      isMyPage={isMyPage}
      user={userInfo||user} />
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

export default UserPage;
