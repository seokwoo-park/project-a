import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "./components/Post";
import PostUpload from "./components/PostUpload";
import UserInfo from "./components/UserInfo";
import "./css/Main.css";
import InfiniteScroll from "react-infinite-scroll-component";
import SpeakerNotesOffIcon from "@material-ui/icons/SpeakerNotesOff";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import { useCookies } from "react-cookie";


function Main() {

  const [cookies] = useCookies();

  const [list, setList] = useState([]);
  const [scrollPage, setScrollPage] = useState(9);
  const [morePost, setMorePost] = useState(true);
  const [userData, setUserData] = useState({});
  

  const getUser = async () => {
    await axios.post('http://localhost:8081/user/myprofile',{nickName : cookies.nickname},{
      headers : {
        x_auth : cookies.x_auth,
      }
    }).then((res)=>{
      setUserData({
        ...userData,...res.data[0]
      });
    }).catch((error) => {
      console.log(error)
    })
  };

  const getList = async () => {
    try {
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
    getList();
    getUser();
  }, [scrollPage]);

  if (list === null) return null;
  
  return (
    <section className="content-section">
      <PostUpload getList={getList} />
      <UserInfo getUser={getUser} userData={userData} />
      <InfiniteScroll
        dataLength={list.length}
        hasMore={morePost}
        next={() => {
          setTimeout(() => setScrollPage(scrollPage + 6), 1000);
        }}
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
        {list.map((data) => {
          return (
            <Post
              getList={getList}
              idx={data.idx}
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
      </InfiniteScroll>
    </section>
  );
}

export default Main;
