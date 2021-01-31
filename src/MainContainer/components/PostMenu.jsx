import React from "react";
import BorderColorOutlinedIcon from "@material-ui/icons/BorderColorOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { useDispatch } from "react-redux";
import { deletePost } from '../../redux/postRedux/postAction';

function PostMenu({ postEditToggle, menuToggle, style, idx }) {
  const dispatch = useDispatch();
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
      <div className="delete-box" onClick={() => dispatch(deletePost(idx))}>
        <DeleteOutlinedIcon />
      </div>
      <div className="close-box" onClick={menuToggle}>
        <CloseOutlinedIcon />
      </div>
    </div>
  );
}

export default PostMenu;
