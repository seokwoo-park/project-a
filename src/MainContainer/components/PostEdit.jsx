import React, { useState } from "react";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { updatePost, useFetchData } from "./PostContext";

import "../css/PostEdit.css";

function PostEdit({ postEditToggle, getList, idx, content, image }) {
  const fetchData = useFetchData();
  const [textEdit, setTextEdit] = useState(content);

  const [editImageFile, setEditImageFile] = useState("");
  const [editImageView, setEditImageView] = useState("");
  const [editImgStyle, setEditImgStyle] = useState({
    objectFit: "contain",
    width: "100px",
  });

  const onFileChange = (e) => {
    console.log(e.target);
    if (e.target.files[0]) {
      setEditImageFile(e.target.files[0]);
      setEditImageView(URL.createObjectURL(e.target.files[0]));
      //   setImgStyle({ objectFit: "contain", width: "100px" });
    } else {
      return;
    }
  };

  const EditPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", textEdit);
    formData.append("idx", idx);
    if (editImageFile) {
      formData.append("image", editImageFile);
    }

    updatePost(formData);

    postEditToggle();
    fetchData();
  };

  return (
    <div className="postEdit">
      <form className="postEdit-form">
        <textarea
          value={textEdit}
          onChange={(e) => {
            setTextEdit(e.target.value);
          }}
          className="postEdit-text"
          required
          maxLength={200}
          type="text"
          rows={5}
          cols={50}
        />
        <div className="postEdit_form_files">
          <label htmlFor="editFiles" style={{ color: "white" }}>
            <AddAPhotoIcon />
            Photo
          </label>
          <input
            onChange={onFileChange}
            id="editFiles"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
          />
          {editImageFile || image ? (
            <img
              className="postEdit_img_preview"
              src={editImageView || image}
              style={editImgStyle}
              alt="img preview area"
            />
          ) : null}
        </div>
        <div className="postEdit_bnt_container">
          <button className="postEdit_btn btn_close " onClick={postEditToggle}>
            Close
          </button>
          <button
            className="postEdit_btn btn_edit"
            type="submit"
            onClick={EditPost}
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostEdit;
