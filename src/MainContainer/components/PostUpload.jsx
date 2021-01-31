import React, { useState } from "react";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import "../css/PostUpload.css";
import { createPost, getPosts } from '../../redux/postRedux/postAction'
import { useDispatch, useSelector } from "react-redux";


function PostUpload() {
  const [postInput, setPostInput] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [imageView, setImageView] = useState("");
  const [imgStyle, setImgStyle] = useState({ visibility: "hidden" });

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const createPostHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", postInput);
    formData.append("image", imageFile);
    formData.append("user_id", user.user_id);

    dispatch(createPost(formData));
    setPostInput("");
    setImgStyle({ visibility: "hidden" });
  };

  const onFileChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImageView(URL.createObjectURL(e.target.files[0]));
      setImgStyle({ objectFit: "contain", width: "100px" });
    } else {
      return;
    }
  };

  return (
    <div className="postUpload">
      <form className="postUpload_form" onSubmit={createPostHandler}>
        <textarea
          className="postUpload_text"
          required
          maxLength={200}
          onChange={(e) => {
            setPostInput(e.target.value);
          }}
          type="text"
          rows={5}
          cols={50}
          value={postInput}
          placeholder="What's on your mind ?"
        />

        <div className="postUpload_form_files">
          <label htmlFor="files">
            <AddAPhotoIcon />
            Photo
          </label>
          <input
            id="files"
            onChange={onFileChange}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
          />

          <img
            className="img_preview"
            src={imageView}
            style={imgStyle}
            alt="img preview area"
          />
          <button className="postUpload_btn" type="submit">
            POST
          </button>
        </div>
      </form>
    </div>
  );
}

export default React.memo(PostUpload);
