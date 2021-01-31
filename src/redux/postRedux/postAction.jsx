import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

///타입과 액션 명시
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS"
export const getPostsSuccess = (posts) => {
    return{
        type : GET_POSTS_SUCCESS,
        payload : posts
    }
}


//메인
export const getPosts = () => async (dispatch) => {
    console.log('GET POST STARTED!')
    await axios.get("http://localhost:8081/board/list")
    .then((res)=>{
        console.log(res.data)
        dispatch(getPostsSuccess(res.data.reverse()))
    }).catch((error)=>{
        alert(`Can't load the posts. Error : ${error}`)
    })
    
}


// 생성,수정,삭제는 응답에 데이터가 없어 함수로 만든후 마지막에 getPost를 불러오는방식


export const createPost = (formData) => async (dispatch) => {
    console.log('Create Posts!')
    await axios.post("http://localhost:8081/board/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        x_auth: cookies.get("x_auth"),
      },
    })
    dispatch(getPosts())
    .catch((error)=>{console.log(error)})
}

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
    dispatch(getPosts());
  } catch (error) {
      alert(`Can't delete post. Error : ${error}`)
}
};

export const editPost = (formData) => async (dispatch) => {
    try {
        await axios.post(
            `http://localhost:8081/board/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    x_auth: cookies.get("x_auth"),
                  },
            })
            dispatch(getPosts());
    }
    catch(error){
        alert(`Can't edit post. Error : ${error}`)
    }
};