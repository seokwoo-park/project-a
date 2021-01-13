import React, { useState } from "react";
import PostUpload from "./components/PostUpload";
import { Button } from 'react-bootstrap';
import PostAddIcon from '@material-ui/icons/PostAdd';
import './css/Main.css';







function Main({ history }) {


  const [postModalShow,setPostModalShow] = useState(false);

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
