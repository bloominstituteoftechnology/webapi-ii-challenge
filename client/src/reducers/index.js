import React from "react";
import * as ActionType from "../actions/actionTypes";

const initialState = {
  posts: [],
  fetchingPosts: false,
  addingPost: false,
  updatingPost: false,
  deletingPost: false,
  error: null
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCHING_POSTS: {
      return Object.assign({}, state, { fetchingPost: true });
    }
    case ActionType.ADDING_POST: {
      return Object.assign({}, state, { addingPost: true });
    }
    case ActionType.EDITING_POST: {
      return Object.assign({}, state, { deletingPost: true });
    }
    case ActionType.DELETING_POST: {
      return Object.assign({}, state, { deletingPost: true });
    }
    case ActionType.SUCCESS_POSTS: {
      return Object.assign({}, state, {
        fetchingPosts: false,
        addingPost: false,
        updatingPost: false,
        deletingPost: false,
        error: null,
        posts: [...action.payload]
      });
    }
    case ActionType.ERROR_POSTS: {
      return Object.assign({}, state, {
        fetchingPosts: false,
        addingPost: false,
        updatingPost: false,
        deletingPost: false,
        error: action.payload
      });
    }
    default:
      return state;
  }
};

export default postReducer;
