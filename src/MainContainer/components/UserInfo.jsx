import React, { useEffect } from "react";
import { Cookies,useCookies} from "react-cookie";
import defaultUserImage from "../images/defaultUserInfo.svg";

// import CreateIcon from "@material-ui/icons/Create";
// import Tooltip from "@material-ui/core/Tooltip";
// import DoneIcon from "@material-ui/icons/Done";
// import CloseIcon from "@material-ui/icons/Close";
import {
  RiLogoutBoxRLine as LogoutIcon,
  RiDraftLine as ListIcon,
  RiFileMarkLine as BookmarkIcon,
  RiHeartLine as HeartIcon,
  RiEdit2Line as EditIcon,
  RiUserSettingsLine as SettingIcon,
} from "react-icons/ri";
import "../css/UserInfo.css";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import {fetchUser,editProfileUser} from '../../redux/userRedux/userAction';
import { useDispatch, useSelector } from "react-redux";

function UserInfo() {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  console.log(user)

  // GETUSER를 불러오는 작업해야함...
  // 1. postContext에서 import 해오는 방법
  // 2. postContext에 state에 userData로 받아오는 방법.
  // 3. UserInfo 에서 직접 axios 호출해서 useState 하는 방법. (비추이지만 가장 가능성 높음)
  // 근데 지금 1, 2 번 해봤는데 뭔가 오류 남..

  // const [mySelf, setMySelf] = useState("");
  // const [showMySelf, setShowMySelf] = useState(true);

  const [cookies, , removeCookie] = useCookies();
  // const myselfEl = useRef();
  const onClickHandler = () => {
    removeCookie("x_auth")
    removeCookie("nickname")

  };

  const onFileChange = (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    formData.append("nickName", user.user_id);
    dispatch(editProfileUser(formData))
  };

  const onErrorImage = (e) => {
    e.target.setAttribute('src',defaultUserImage);
    alert(`Couldn't load the profile picture`);
  }



  useEffect(()=>{
    dispatch(fetchUser());
  },[dispatch])
  
  // const mySelfHandler = async () => {
  //   axios
  //     .post(
  //       "http://localhost:8081/user/updateprofile",
  //       { myself: mySelf, nickName: "userData.user_id" },
  //       {
  //         headers: {
  //           x_auth: cookies.x_auth,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log(res);
  //       showMySelfToggle();
  //     })
  //     .catch((error) => console.log(error));
  // };

  // const showMySelfToggle = () => {
  //   setShowMySelf(!showMySelf);
  // };

  return (
    <div className="user-info">
      <div className="user-info-profile-container">
        <img className="userImage" src={user.profile||defaultUserImage} onError={onErrorImage} alt="profile image" />
        <label
          htmlFor="user-info-profile-files"
          className="user-edit-photo-box"
        >
          <AddAPhotoIcon className="user-info-photoIcon" />
        </label>
        <input
          id="user-info-profile-files"
          onChange={onFileChange}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>
      <div className="user-detail">
        <div className="nickname">{user.user_id}</div>
        <LogoutIcon className="logout-icon" onClick={onClickHandler} />
      </div>
      <div className="icon-box">
        <ListIcon className="list-icon icon" />
        <BookmarkIcon className="bookmark-icon icon" />
        <HeartIcon className="heart-icon icon" />
        <EditIcon className="edit-icon icon" />
        <SettingIcon className="setting-icon icon" />
      </div>
    </div>
  );
}

export default React.memo(UserInfo);
