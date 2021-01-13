import React ,{useState} from 'react'
import '../css/PostUpload.css';
import {Button,Modal} from 'react-bootstrap';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

function PostUpload({setPostModalShow,postModalShow}) {

    const [postInput,setPostInput] = useState('');
    
    const [imageView, setImageView] = useState('');
    const [imgStyle, setImgStyle] = useState({});

    const handleClose = () => setPostModalShow(false);    

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
            <Modal
                show={postModalShow}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Share your days</Modal.Title>
                </Modal.Header>

                <Modal.Body>
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
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={onSubmitHandler} type="submit">Submit</Button>
                </Modal.Footer>
            </Modal>
        </div>


        
    )
}

export default PostUpload
