import { 
    FETCHING_POSTS,
    POSTS_FETCHED, 
  
    FETCHING_POST, 
    POST_FETCHED,
  
    SAVING_POST, 
    POST_SAVED,
  
    DELETING_POST,
    POST_DELETED,
  
    ERROR
  } from '../actions/types';
  
  const initialStatePosts = {
    posts: [],
    
    fetchingPosts: false,
    postsFetched: false,
  
    error: null
  }

  
  const initialStatePost = {
    post: {},
  
    fetchingPost: false,
    postFetched: false,
  
    savingPost: false,
    postSaved: false,
  
    updatingPost: false,
    postUpdated: false,
  
    deletingPost: false,
    postDeleted: false,
  
    error: null
  }
  
  export const postsReducer = (state = initialStatePosts, action) => {
    switch (action.type) {
      // Fill me in with the important reducers
      // action types should be FETCHING, FETCHED, and ERROR
      // your switch statement should handle all of these cases.
      case FETCHING_POSTS:
        return Object.assign({}, state, { 
          fetchingPosts: true, 
          postsFetched: false
  
        });
      case POSTS_FETCHED:
        return Object.assign({}, state, {
          posts: action.payload,
          fetchingPosts: false,
          postsFetched: true
        });
  
      case ERROR:
        return Object.assign( {}, state, { 
          fetchingPosts: false, 
          postsFetched: false, 
          error: action.payload 
        });
      default:
        return state;
      }
  };
  
  export const postReducer = (state = initialStatePost, action) => {
    switch (action.type) {
      // Fill me in with the important reducers
      // action types should be FETCHING, FETCHED, and ERROR
      // your switch statement should handle all of these cases.
      case FETCHING_POST:
        return Object.assign({}, state, { 
          fetchingPost: true, 
          postFetched: false
        });
      case POST_FETCHED:
        return Object.assign({}, state, {
          post: action.payload,
          fetchingPost: false,
          postFetched: true
        });
  
      case SAVING_POST:
        return Object.assign({}, state, { 
          fetchingPost: true, 
          postFetched: false
        });
      case POST_SAVED:
        return Object.assign({}, state, {
          post: action.payload,
          savingPost: false,
          postSaved: true
        });
  
      case DELETING_POST:
        return Object.assign({}, state, { 
          deletingPost: true,
          postDeleted: false 
        });
      case POST_DELETED:
        return Object.assign({}, state, {
          posts: action.payload,
          deletingPost: false,
          postDeleted: true
        });
  
      case ERROR:
        return Object.assign( {}, state, { 
          fetchingPost: false, 
          postFetched: false, 
          error: action.payload 
        });
      default:
        return state;
      }
  };
  
  
  