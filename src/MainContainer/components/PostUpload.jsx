import React, { useRef, useState } from "react";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import axios from "axios";
import { useCookies } from "react-cookie";
import "../css/PostUpload.css";

function PostUpload({ getList }) {
  const [postInput, setPostInput] = useState("");

  const [imageFile, setImageFile] = useState("");
  const [imageView, setImageView] = useState("");
  const [imgStyle, setImgStyle] = useState({ visibility: "hidden" });

  const [cookies] = useCookies();

  const nextNumber = useRef(1);

  function onSubmitHandler(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", postInput);
    formData.append("image", imageFile);
    formData.append("user_id", cookies.nickname);

    axios
      .post("http://localhost:8081/board/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: cookies.x_auth,
        },
      })
      .catch((res) => {
        console.log("에러");
        console.log(res);
        //예외 처리
      });
    setPostInput("");
    setTimeout(() => {
      getList();
    }, 300);
    // window.location.reload();
  }

  const createPost = async () => {
    const res = await axios.post("http://localhost:8081/board/create", {
      user_id: cookies.nickname,
      content: `test${nextNumber.current}`,
      image: null,
    });
    if (res.status === 204) {
      console.log("status 204!");
      nextNumber.current += 1;

      getList();
    }
  };

  function onFileChange(e) {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImageView(URL.createObjectURL(e.target.files[0]));
      setImgStyle({ objectFit: "contain", width: "100px" });
    } else {
      return;
    }
  }

  return (
    <div className="postUpload">
      <form className="postUpload_form" onSubmit={onSubmitHandler}>
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
          <button className="postUpload_btn" onClick={getList}>
            RELOAD
          </button>
          <button className="postUpload_btn" onClick={createPost}>
            CREATEPOST
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostUpload;
