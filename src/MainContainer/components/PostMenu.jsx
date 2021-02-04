import React from "react";
import BorderColorOutlinedIcon from "@material-ui/icons/BorderColorOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { useDispatch,useSelector } from "react-redux";
import { deletePost } from '../../redux/postRedux/postAction';

function PostMenu({ title,postEditToggle, menuToggle, style, idx }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)

  const isMyPost = () => {
    return user.user_id === title 
  }  
  
  return (
      <div className="post-menu-container" style={style}>
      {
        isMyPost()?
        <>
          <div
            className="modify-box"
            onClick={() => {
              menuToggle();
              postEditToggle();
            }}
          >
            <BorderColorOutlinedIcon />
          </div>
          <div className="delete-box" onClick={() => dispatch(deletePost(idx))}>
            <DeleteOutlinedIcon />
          </div>
        </>
        : null  
      }
      <div className="bookmark-box">
        <BookmarkBorderOutlinedIcon />
      </div>
      <div className="close-box" onClick={menuToggle}>
        <CloseOutlinedIcon />
      </div>
    </div>
  );
}

export default PostMenu;
