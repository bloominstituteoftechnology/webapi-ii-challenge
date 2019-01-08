import {
  GET_POSTS_LOADING,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  GET_POST_LOADING,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  ADD_POST_LOADING,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  DELETE_POST_LOADING,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE
} from '../actions';

const initialState = {
  posts: [],
  post: [],
  fetchingPosts: false,
  fetchingPost: false,
  addingPost: false,
  deletingPost: false,
  error: null
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get List of Posts
    case GET_POSTS_LOADING:
      return {
        ...state,
        fetchingPosts: true,
        fetchingPost: false,
        addingPost: false,
        deletingPost: false
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        fetchingPosts: false,
        fetchingPost: false,
        addingPost: false,
        deletingPost: false,
        posts: action.payload
      };
    case GET_POSTS_FAILURE:
      return {
        ...state,
        fetchingPosts: false,
        fetchingPost: false,
        addingPost: false,
        deletingPost: false,
        error: action.payload
      };
    // Get Single Post
    case GET_POST_LOADING:
      return {
        ...state,
        fetchingPosts: false,
        fetchingPost: true,
        addingPost: false,
        deletingPost: false
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        fetchingPosts: false,
        fetchingPost: false,
        addingPost: false,
        deletingPost: false,
        post: action.payload
      };
    case GET_POST_FAILURE:
      return {
        ...state,
        fetchingPosts: false,
        fetchingPost: false,
        addingPost: false,
        deletingPost: false,
        error: action.payload
      };
    // Add Post
    case ADD_POST_LOADING:
      return {
        ...state,
        fetchingPosts: false,
        fetchingPost: false,
        addingPost: true,
        deletingPost: false
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        fetchingPosts: false,
        fetchingPost: false,
        addingPost: false,
        deletingPost: false
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        fetchingPosts: false,
        fetchingPost: false,
        addingPost: false,
        deletingPost: false,
        error: action.payload
      };
    // Delete Post
    case DELETE_POST_LOADING:
      return {
        ...state,
        fetchingPosts: false,
        fetchingPost: false,
        addingPost: false,
        deletingPost: true
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        fetchingPosts: false,
        fetchingPost: false,
        addingPost: false,
        deletingPost: false
      };
    case DELETE_POST_FAILURE:
      return {
        ...state,
        fetchingPosts: false,
        fetchingPost: false,
        addingPost: false,
        deletingPost: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;
