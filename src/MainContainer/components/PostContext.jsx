import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

//postData 와 userData 데이터는 한곳에 합칠수도있고 분리할수도 있음.
const initialState = {
  data: {
    postData: [],
    userData: [],
  },
  hasMore: true,
};
const PostStateContext = createContext();
const PostFetchContext = createContext();

export default function PostContextProvider({ children }) {
  const [state, setState] = useState(initialState);
  const postItemLength = useRef(9);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8081/board/list");
      const result = res.data.reverse().slice(0, postItemLength.current);
      console.log(result);
      setState({
        ...state,
        data: {
          userData: state.data.userData,
          postData: result,
        },
      });
      if (state.data.postData.length === res.data.length) {
        setState({ ...state, hasMore: false });
      }
      postItemLength.current += 9;
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    console.log("getUser()");
    try {
      checkToken();
      const res = await axios.post(
        "http://localhost:8081/user/myprofile",
        { nickName: cookies.get("nickname") },
        {
          headers: {
            x_auth: getToken(),
          },
        }
      );
      setState((prevState) => {
        return {
          ...state,
          data: {
            postData: prevState.data.postData.concat(state.data.postData),
            userData: res.data,
          },
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    getUser();
  }, []);

  return (
    <PostStateContext.Provider value={state}>
      <PostFetchContext.Provider value={fetchData}>
        {children}
      </PostFetchContext.Provider>
    </PostStateContext.Provider>
  );
}

export function useFetchData() {
  const fetchData = useContext(PostFetchContext);
  if (!fetchData) {
    throw new Error("Cannot find fetchData");
  }
  return fetchData;
}

export function usePostState() {
  const state = useContext(PostStateContext);
  if (!state) {
    throw new Error("Connot find UserProvider");
  }
  return state;
}

// POST UPDATE
export async function updatePost(formData) {
  try {
    checkToken();
    await axios
      .post("http://localhost:8081/board/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          x_auth: getToken(),
        },
      })
      .catch((res) => {
        console.log("에러");
        console.log(res);
        //예외 처리
      });
  } catch (error) {}
}

// POST DELETE
export async function deletePost(idx) {
  try {
    checkToken();
    await axios.post(
      `http://localhost:8081/board/delete`,
      { idx },
      {
        headers: {
          x_auth: getToken(),
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}

// POST CREATE
export async function createPost(formData) {
  try {
    checkToken();
    await axios.post("http://localhost:8081/board/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        x_auth: getToken(),
      },
    });
  } catch (error) {
    console.log(error);
  }
}

// USER PROFILE UPDATE
export async function updateProfile(formData) {
  try {
    await axios
      .post("http://localhost:8081/user/updateprofile", formData, {
        headers: {
          x_auth: getToken(),
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  } catch (error) {}
}
// 토큰채크 토큰 받아오는건 이곳에서만 쓰기위해 export 안함.
function getToken() {
  try {
    const token = cookies.get("x_auth");
    return token;
  } catch (error) {
    return error;
  }
}

function checkToken() {
  if (!cookies.get("x_auth")) {
    console.log("cannot find token");
    window.location.reload();
  }
}
export function removeCoookies() {
  cookies.remove("x_auth");
  cookies.remove("nickname");
  window.location.reload();
}

export function getCookies(type) {
  return cookies.get(type);
}

// USER
// export async function getUser() {
//   try {
//     checkToken();
//     const res = await axios.post(
//       "http://localhost:8081/user/myprofile",
//       { nickName: cookies.get("nickname") },
//       {
//         headers: {
//           x_auth: cookies.get("x_auth"),
//         },
//       }
//     );
//     return res.data[0];
//   } catch (error) {
//     console.log(error);
//   }
// }
