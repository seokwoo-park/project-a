import React ,{useState} from 'react'
import '../css/PostUpload.css';

function PostUpload() {

    const [postInput,setPostInput] = useState('');

    const [imageView, setImageView] = useState('');
    const [imgStyle, setImgStyle] = useState({});

    

    function onSubmitHandler(e) {
        e.preventDefault();
        console.log('submit')
        //아직 기능구현 못하였음
    }

    function onFileChange (e) {
      if(e.target.files[0]) {
        setImageView(URL.createObjectURL(e.target.files[0]))
        setImgStyle({height:"102px" ,objectFit: "contain" });
        
      } else {
          return false
      }
    }


    return (
        <div className="postUpload">
            <form className="postUpload_form" onSubmit={onSubmitHandler}>
                <img className="img_preview" src={imageView} style={imgStyle}/>

                <textarea required
                 className="postUpload_text" 
                 maxLength={200}
                 onChange={(e)=>{setPostInput(e.target.value)}}
                 type="text"
                 rows={5} 
                 cols={50}
                 value={postInput} 
                 placeholder="What's on your mind ?"/>


                <button onSubmit={onSubmitHandler} type="submit">Post</button>
            </form>
            <div className="postUpload_form_files">
                <label for="files">➕Photo </label>
                <input id="files"
                onChange={onFileChange} 
                type="file" 
                accept="image/*" 
                style={{display:"none"}}/>
            </div>
        </div>
    )
}

export default PostUpload
