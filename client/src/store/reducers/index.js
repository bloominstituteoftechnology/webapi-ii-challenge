import {
    POSTS_FETCH_START,
    POSTS_FETCH_COMPLETE,
    POSTS_FETCH_FAILURE,
    
    POST_GET_START,
    POST_GET_COMPLETE,
    POST_GET_FAILURE,
    
    ADD_POST_START,
    ADD_POST_COMPLETE,
    ADD_POST_FAILURE,

    POST_EDIT_START,
    POST_EDIT_COMPLETE,
    POST_EDIT_FAILURE,

    DELETE_POST_START,
    DELETE_POST_COMPLETE,
    DELETE_POST_FAILURE,
  } from "../actions";
  
  const initialState = {
    posts: [],
    isGettingPosts: false,
    isAdding: false,
    isGettingPost:false,
    isDeleting: false,
    isEditing: false,
    post:{},
    id: null,
    error: "",
    actionTookPlace: false
  };
  
  export const postReducer = (state = initialState, action) => {
    switch (action.type) {
      case POSTS_FETCH_START:
        return { ...state, isGettingPosts: true };
      case POSTS_FETCH_COMPLETE:
        return { ...state, isGettingPosts: false, posts: action.payload, actionTookPlace: false};
      case POSTS_FETCH_FAILURE:
        console.log(action.payload);
        return { ...state, isGettingPosts: false, error: action.payload };

      case ADD_POST_START:
        return { ...state, isAdding: true };
      case ADD_POST_COMPLETE:
        return { ...state, isAdding: false, actionTookPlace: true};
      case ADD_POST_FAILURE:
        console.log(action.payload);
        return { ...state, isAdding: false, error: action.payload };

      case POST_GET_START:
        return { ...state, isGettingPost: true };
      case POST_GET_COMPLETE:
        // console.log(action.payload);
        return { ...state, isGettingPost: false, post: action.payload};
      case POST_GET_FAILURE:
        console.log(action.payload);
        return { ...state, isGettingPost: false, error: action.payload };

      case POST_EDIT_START:
        return { ...state, isEditting: true };
      case POST_EDIT_COMPLETE:
        return { ...state, isEditting: false, post: action.payload, actionTookPlace: true };
      case POST_EDIT_FAILURE:
        console.log(action.payload);
        return { ...state, isEditting: false, error: action.payload };

      case DELETE_POST_START:
        return { ...state, isDeleting: true };
      case DELETE_POST_COMPLETE:
        return { ...state, isDeleting: false, actionTookPlace: true};
      case DELETE_POST_FAILURE:
        console.log(action.payload);
        return { ...state, isDeleting: false, error: action.payload };
        
      default:
        return state;
    }
  };
  