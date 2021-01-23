import React, { useEffect } from "react";
import BorderColorOutlinedIcon from "@material-ui/icons/BorderColorOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

function PostMenu({ postEditToggle,menuToggle, style, onDelete, idx }) {
  return (
    <div className="post-menu-container" style={style}>
      <div className="modify-box" onClick={()=>{postEditToggle()}}>
        <BorderColorOutlinedIcon />
      </div>
      <div className="bookmark-box">
        <BookmarkBorderOutlinedIcon />
      </div>
      <div className="delete-box" onClick={() => onDelete(idx)}>
        <DeleteOutlinedIcon />
      </div>
      <div className="close-box" onClick={menuToggle}>
        <CloseOutlinedIcon />
      </div>
    </div>
  );
}

export default PostMenu;
