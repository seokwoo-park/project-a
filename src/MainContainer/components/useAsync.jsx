import { useReducer, useEffect } from "react";

function postReducer(state, action) {
  switch (action.type) {
    case "GET_LIST":
      return {
        data: action.data,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function useAsync(callback, deps = []) {
  const [state, dispatch] = useReducer(postReducer, { data: null });
  const fetchData = async () => {
    try {
      const data = await callback();
      dispatch({
        type: "GET_LIST",
        data,
      });
    } catch (error) {
      throw new Error("cannot response", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, deps);
  return [state, fetchData];
}

export default useAsync;
