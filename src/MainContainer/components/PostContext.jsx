import React, { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

function postReducer(state, action) {
  switch (action.type) {
    case "GET_LIST":
      return {
        data: action.data,
      };
    case "GET_DELETE":
      return {
        data: deletePost(),
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const initialState = [];

const PostStateContext = createContext();
const PostDispatchContext = createContext();
const TokenContext = createContext();
export default function PostContextProvider({ children }) {
  const [state, dispatch] = useReducer(postReducer, initialState);
  const [cookies] = useCookies();

  useEffect(() => {
    console.log("dispatch만 보자");
    const fetchData = () => {
      getList(dispatch);
    };
    fetchData();
  }, []);
  return (
    <PostStateContext.Provider value={state}>
      <PostDispatchContext.Provider value={dispatch}>
        <TokenContext.Provider value={cookies.x_auth}>
          {children}
        </TokenContext.Provider>
      </PostDispatchContext.Provider>
    </PostStateContext.Provider>
  );
}

// export function useFetchData() {
//   const refetch = useContext(PostFetchContext);
//   if (!refetch) {
//     throw new Error("Cannot find refetch");
//   }
//   return refetch;
// }

export function useToken() {
  const token = useContext(TokenContext);
  if (!token) {
    throw new Error("Cannot find token");
  }
  return token;
}

export function usePostState() {
  const state = useContext(PostStateContext);
  if (!state) {
    throw new Error("Connot find UserProvider");
  }
  return state;
}

export function usePostDispatch() {
  const dispatch = useContext(PostDispatchContext);
  if (!dispatch) {
    throw new Error("Connot find UserProvider");
  }
  return dispatch;
}

export async function getList(dispatch) {
  try {
    const res = await axios.get("http://localhost:8081/board/list");
    dispatch({ type: "GET_LIST", data: res.data });
  } catch (error) {
    console.log(error);
  }
}

export async function deletePost(dispatch, token, idx) {
  try {
    await axios.post(
      `http://localhost:8081/board/delete`,
      { idx },
      {
        headers: {
          x_auth: token,
        },
      }
    );
    getList(dispatch);
  } catch (error) {
    console.log(error);
  }
}

export async function createPost(dispatch, token, formData) {
  try {
    await axios.post("http://localhost:8081/board/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        x_auth: token,
      },
    });
    getList(dispatch);
  } catch (error) {
    console.log(error);
  }
}
