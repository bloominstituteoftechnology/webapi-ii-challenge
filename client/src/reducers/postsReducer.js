import { FETCHING_POSTS, POSTS_FETCH_SUCCESS, ADDING_POST, ADDING_POST_SUCCESS } from "../actions";

const initialState = {
  posts: [],
  fetchingPosts: false,
  addingPost: false,
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
    case ADDING_POST:
      return {
        ...state,
        addingPost: true
      };
    case ADDING_POST_SUCCESS:
      return {
        ...state,
        addingPost: false,
        posts: [...state.posts, action.payload]
      }
    default:
      return state;
  }
};
