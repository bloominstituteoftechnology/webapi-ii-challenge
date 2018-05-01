import * as ActionType from "../actions/ActionTypes";

const initialState = {
  posts: [],
  fetchingPosts: false,
  addingPost: false,
  editingPost: false,
  deletingPost: false,
  error: null
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCHING_POSTS: {
      return Object.assign({}, state, { fetchingPosts: true });
    }
    case ActionType.ADDING_POST: {
      return Object.assign({}, state, { addingPost: true });
    }
    case ActionType.EDITING_POST: {
      return Object.assign({}, state, { editingPost: true });
    }
    case ActionType.DELETING_POST: {
      return Object.assign({}, state, { deletingPost: true });
    }
    case ActionType.SUCCESS_POSTS: {
      return Object.assign({}, state, {
        fetchingPosts: false,
        addingPost: false,
        editingPost: false,
        deletingPost: false,
        error: null,
        posts: [...action.payload]
      });
    }
    case ActionType.ERROR_POSTS: {
      return Object.assign({}, state, {
        fetchingPosts: false,
        addingPost: false,
        editingPost: false,
        deletingPost: false,
        error: action.payload
      });
    }
    default:
      return state;
  }
};

export default postReducer;
