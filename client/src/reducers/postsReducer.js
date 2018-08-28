import { FETCHING_POSTS, POSTS_FETCH_SUCCESS } from "../actions";

const initialState = {
  posts: [],
  fetchingPosts: false,
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_POSTS:
      return {
        ...state,
        fetchingPosts: true,
      };
    case POSTS_FETCH_SUCCESS:
      return {
        ...state,
        posts: [...action.payload],
        fetchingPosts: false,
      };
    default:
      return state;
  }
};
