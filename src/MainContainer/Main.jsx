import React, { useEffect,useState } from "react";
import PostUpload from "./components/PostUpload";
import { Button } from 'react-bootstrap';
import PostAddIcon from '@material-ui/icons/PostAdd';
import axios from 'axios';
import './css/Main.css';







function Main({ history }) {


  const [postModalShow,setPostModalShow] = useState(false);


  useEffect(()=>{
    //포스트 랜더링 테스트용
    axios.get("http://localhost:8081/board/list").then((res)=>console.log(res));
})

  return (
    <div className="main">

      {postModalShow? 
      <PostUpload postModalShow={postModalShow} setPostModalShow={setPostModalShow}/>
       : null}

      <Button className="main_post_btn" onClick={()=>{setPostModalShow(true)}}>
        Post <PostAddIcon/> 
      </Button>



    </div>
  );
}

export default Main
