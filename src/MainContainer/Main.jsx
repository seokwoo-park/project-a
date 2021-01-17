import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "./components/Post";
import PostUpload from "./components/PostUpload";
import UserInfo from "./components/UserInfo";
import "./css/Main.css";
import InfiniteScroll from 'react-infinite-scroll-component';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


function Main() {
  const [list, setList] = useState(null);
  const [scrollPage,setScrollPage] = useState(9);
  const [isPosted,setIsPosted] = useState(false);

  const getList = async () => {
    try {
      const res = await axios.get("http://localhost:8081/board/list");
      let result = res.data.reverse().slice(0, scrollPage)
      setList([...result]);
      setIsPosted(false)
      
    } catch (error) {
      throw new Error("cannot response", error);
    }
  };

  useEffect(() => {
    getList();
  },[scrollPage,isPosted]);


  if (list === null) return null;
  if(isPosted){
    getList();
    console.log(isPosted)
  }


  return (
    <section className="content-section">
      <PostUpload 
      setIsPosted={setIsPosted}/>
      <UserInfo />

      <InfiniteScroll 
      dataLength={list.length}
      hasMore={true}
      className="content-section"
      >
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
      </InfiniteScroll>
      <button className="content-load-btn" onClick={()=>setScrollPage(scrollPage+6)}>LOAD MORE POSTS <ArrowDownwardIcon/> </button>
    </section>
  );
}

export default Main;
