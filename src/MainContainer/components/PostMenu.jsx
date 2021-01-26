import React, { useEffect } from "react";
import BorderColorOutlinedIcon from "@material-ui/icons/BorderColorOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { useToken, deletePost, usePostDispatch } from "./PostContext";

function PostMenu({ postEditToggle, menuToggle, style, idx }) {
  const token = useToken();
  const dispatch = usePostDispatch();
  return (
    <div className="post-menu-container" style={style}>
      <div
        className="modify-box"
        onClick={() => {
          menuToggle();
          postEditToggle();
        }}
      >
        <BorderColorOutlinedIcon />
      </div>
      <div className="bookmark-box">
        <BookmarkBorderOutlinedIcon />
      </div>
      <div
        className="delete-box"
        onClick={() => deletePost(dispatch, token, idx)}
      >
        <DeleteOutlinedIcon />
      </div>
      <div className="close-box" onClick={menuToggle}>
        <CloseOutlinedIcon />
      </div>
    </div>
  );
}

export default PostMenu;
