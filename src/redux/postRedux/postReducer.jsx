import {
  GET_POSTS_SUCCESS,
  MORE_POSTS,
  NO_MORE_POSTS,
  GET_USER_POSTS,
} from "./postAction";

const initialState = {
  hasMore: false,
  postList: [],
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      console.log(action.payload);
      const postList = {
        ...state,
        hasMore: true,
        postList: [...action.payload],
      };
      return postList;

    case MORE_POSTS:
      const morePosts = {
        ...state,
        hasMore: true,
        postList: [...action.payload],
      };
      return morePosts;

    case NO_MORE_POSTS:
      const noMorePosts = {
        ...state,
        hasMore: false,
        postList: [...action.payload],
      };
      return noMorePosts;

    case GET_USER_POSTS:
      const getUserPosts = {
        ...state,
        hasMore: false,
        postList: [...action.payload],
      };
      return getUserPosts;

    default:
      return state;
  }
};

export default postsReducer;
