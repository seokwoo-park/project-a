// import axios from "axios";
// import { Cookies } from "react-cookie";

// const cookies = new Cookies();

// export const getPosts = () => async (dispatch) => {
//   //요청중임을 알림
//   dispatch({ type: "GET_POSTS" });
//   //요청 시작
//   try {
//     const posts = await axios.get("http://localhost:8081/board/list");
//     dispatch({ type: "GET_POSTS_SUCCESS", posts: posts.data });
//   } catch (error) {
//     dispatch({ type: "GET_POSTS_ERROR", error });
//   }
// };

// export const createPost = (data) => async (dispatch) => {
//   console.log("createPost");
//   try {
//     await axios.post("http://localhost:8081/board/create", data, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         x_auth: cookies.get("x_auth"),
//       },
//     });
//     dispatch({ type: "CREATE_POST" });
//     dispatch(getPosts());
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// export const deletePost = (idx) => async (dispatch) => {
//   try {
//     await axios.post(
//       `http://localhost:8081/board/delete`,
//       { idx },
//       {
//         headers: {
//           x_auth: cookies.get("x_auth"),
//         },
//       }
//     );
//     dispatch({ type: "DELETE_POST" });
//     dispatch(getPosts());
//   } catch (error) {}
// };

// const initialState = {
//   posts: {
//     data: null,
//     error: null,
//     loading: false,
//   },
// };

// export default function posts(state = initialState, action) {
//   switch (action.type) {
//     case "GET_POSTS":
//       return {
//         posts: { data: null, error: null, loading: true },
//       };
//     case "GET_POSTS_SUCCESS":
//       return {
//         posts: { data: action.posts, error: null, loading: false },
//       };
//     case "GET_POSTS_ERROR":
//       return {
//         posts: { data: null, error: action.error, loading: false },
//       };
//     case "CREATE_POST":
//     case "DELETE_POST":
//     default:
//       return state;
//   }
// }
