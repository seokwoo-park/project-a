import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const initialState = { data: null };

const PostStateContext = createContext();
const PostFetchContext = createContext();
const TokenContext = createContext();
export default function PostContextProvider({ children }) {
  const [state, setState] = useState(initialState);
  const [cookies] = useCookies();

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8081/board/list");
      setState(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <PostStateContext.Provider value={state}>
      <PostFetchContext.Provider value={fetchData}>
        <TokenContext.Provider value={cookies.x_auth}>
          {children}
        </TokenContext.Provider>
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

export async function deletePost(token, idx) {
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
  } catch (error) {
    console.log(error);
  }
}

export async function createPost(token, formData) {
  try {
    await axios.post("http://localhost:8081/board/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        x_auth: token,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
