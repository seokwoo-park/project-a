import React ,{useState} from 'react'
import '../css/PostUpload.css';
import {Button,Modal} from 'react-bootstrap';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import axios from "axios";
import { useCookies } from 'react-cookie';


function PostUpload () {
    const [postInput,setPostInput] = useState('');
    
    const [imageFile,setImageFile] = useState('');
    const [imageView, setImageView] = useState('');
    const [imgStyle, setImgStyle] = useState({});

    const[cookies,] = useCookies();

    
    
    async function onSubmitHandler(e) {
        e.preventDefault();

        const formData = new FormData();        
        formData.append('content', postInput);
        formData.append('image',imageView);
        formData.append('user_id',cookies.nickname);
        await axios.post("http://localhost:8081/board/create",formData, {
            headers: {
                'Content-Type' : 'multipart/form-data',
                'Authorization' : cookies.x_auth
            }
        })
        .then((res)=>{
            setPostInput("");
            //응답처리
            console.log('포스팅 완료');
            console.log(res);
        }).catch((res)=>{
            console.log('에러');
            console.log(res);
            //예외 처리
        })
    }

    function onFileChange (e) {
      if(e.target.files[0]) {
        setImageFile(e.target.files[0]);
        // console.log(URL.createObjectURL(e.target.files[0]));
        // console.log(e.target.files[0]);
        setImageView(URL.createObjectURL(e.target.files[0]))
        
        setImgStyle({objectFit: "contain", width: "100px"});
      } else {
          return false
      }
    }


    return (

        <div className="postUpload">
            <form className="postUpload_form" onSubmit={onSubmitHandler}>
                <textarea required
                className="postUpload_text" 
                maxLength={200}
                onChange={(e)=>{setPostInput(e.target.value)}}
                type="text"
                rows={5} 
                cols={50}
                value={postInput} 
                placeholder="What's on your mind ?"/>
            </form>

            <div className="postUpload_form_files">
                <label htmlFor="files"> <AddAPhotoIcon/>Photo </label>
                <input id="files"
                onChange={onFileChange} 
                type="file" 
                accept="image/*" 
                style={{display:"none"}}/>

                <img className="img_preview" src={imageView} style={imgStyle}/>
                <Button className="postUpload_btn" variant="primary" onClick={onSubmitHandler} type="submit">Post</Button>
            </div>
        </div>


        
    )
}

export default PostUpload
