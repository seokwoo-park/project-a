import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

///타입과 액션 명시
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const MORE_POSTS = "MORE_POSTS";
export const NO_MORE_POSTS = "NO_MORE_POSTS";
export const GET_USER_POSTS = "GET_USER_POSTS";

export const getPostsSuccess = (postList) => {
  return {
    type: GET_POSTS_SUCCESS,
    payload: postList,
  };
};

export const morePosts = (posts) => {
  return {
    type: MORE_POSTS,
    payload: posts,
  };
};

export const noMorePosts = (posts) => {
  return {
    type: NO_MORE_POSTS,
    payload: posts,
  };
};

export const getUserPostsSuccess = (posts) => {
  return {
    type: GET_USER_POSTS,
    payload: posts,
  };
};

//메인
export const getPosts = () => async (dispatch) => {
  console.log("GET POST STARTED!");
  await axios
    .get("http://localhost:8081/board/list")
    .then((res) => {
      const result = res.data.reverse();
      console.log(result.slice(0, 9));
      if (res.data.length === 0) {
        dispatch(noMorePosts(result));
      } else {
        dispatch(getPostsSuccess(result.slice(0, 9)));
      }
    })
    .catch((error) => {
      alert(`Can't load the posts. Error : ${error}`);
    })
    .catch((error) => {
      alert(`Can't load the posts. Error : ${error}`);
    });
};

export const fetchMorePosts = (number) => async (dispatch) => {
  console.log("More Posts fetch!");
  await axios
    .get("http://localhost:8081/board/list")
    .then((res) => {
      let result = res.data.reverse();
      console.log(result);
      let data = res.data.slice(0, number);
      console.log(data);
      if (result.length !== data.length) {
        dispatch(morePosts(data));
      } else {
        dispatch(noMorePosts(result));
      }
    })
    .catch((error) => {
      alert(`Can't load the posts. Error : ${error}`);
    });
};

export const getUserPosts = (userId) => async (dispatch) => {
  console.log(userId + '의 페이지')
  await axios
    .post(
      "http://localhost:8081/board/mylist",
      { user_id: userId },
      {
        headers: {
          x_auth: cookies.get("x_auth"),
        },
      }
    )
    .then((res) => {
      console.log(res.data);
      dispatch(getUserPostsSuccess(res.data.reverse()));
    })
    .catch((res) => console.log(res, "실패"));
};

// 생성,수정,삭제는 응답에 데이터가 없어 함수로 만든후 마지막에 getPost를 불러오는방식

export const createPost = (formData) => async (dispatch) => {
  console.log("Create Posts!");
  await axios.post("http://localhost:8081/board/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      x_auth: cookies.get("x_auth"),
    },
  });
  dispatch(getPosts()).catch((error) => {
    console.log(error);
  });
};

export const deletePost = (idx) => async (dispatch) => {
  try {
    await axios.post(
      `http://localhost:8081/board/delete`,
      { idx },
      {
        headers: {
          x_auth: cookies.get("x_auth"),
        },
      }
    );
    dispatch(fetchMorePosts());
  } catch (error) {
    alert(`Can't delete post. Error : ${error}`);
  }
};

export const editPost = (formData) => async (dispatch) => {
  try {
    await axios.post(`http://localhost:8081/board/update`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        x_auth: cookies.get("x_auth"),
      },
    });
    dispatch(fetchMorePosts());
  } catch (error) {
    alert(`Can't edit post. Error : ${error}`);
  }
};
