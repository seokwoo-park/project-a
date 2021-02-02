import { GET_POSTS_SUCCESS, MORE_POSTS, NO_MORE_POSTS } from "./postAction";

const initialState = {
  hasMore: false,
  postList: [],
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      const postList = {
        hasMore: true,
        postList: [...action.payload],
      };
      return postList;

    case MORE_POSTS:
      const morePosts = { ...state, postList: [...action.payload] };
      return morePosts;

    case NO_MORE_POSTS:
      const noMorePosts = {
        ...state,
        postList: [...action.payload],
        hasMore: false,
      };
      return noMorePosts;

    default:
      return state;
  }
};

export default postsReducer;
