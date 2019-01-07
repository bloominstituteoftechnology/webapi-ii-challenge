import {
  GET_POSTS_LOADING,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  GET_POST_LOADING,
  GET_POST_SUCCESS,
  GET_POST_FAILURE
} from '../actions';

const initialState = {
  posts: [],
  post: [],
  fetchingPosts: false,
  fetchingPost: false,
  error: null
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // List of Posts
    case GET_POSTS_LOADING:
      return {
        ...state,
        fetchingPosts: true
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        fetchingPosts: false,
        posts: action.payload
      };
    case GET_POSTS_FAILURE:
      return {
        ...state,
        fetchingPosts: false,
        error: action.payload
      };
    // Single Post
    case GET_POST_LOADING:
      return {
        ...state,
        fetchingPost: true
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        fetchingPost: false,
        post: action.payload
      };
    case GET_POST_FAILURE:
      return {
        ...state,
        fetchingPost: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;
