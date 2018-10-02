import { FETCH_POSTS_SUCCESSFUL, FETCH_POSTS_FAILURE, POST_SUCCESSFUL, POST_FAILURE } from "../actions";
import { Object } from "core-js";

const intitalState = {
  posts: [],
  error: null,
  postError: null,
};

export default (state = intitalState, action) => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESSFUL:
      return Object.assign({}, state, {posts: action.payload, error: null});
    case FETCH_POSTS_FAILURE:
      return Object.assign({}, state, {error: action.payload, posts: null});
    case POST_SUCCESSFUL:
      return Object.assign({}, state, {posts: [...state.posts, action.payload]});
    case POST_FAILURE:
      return Object.assign({}, state, {postError: action.payload});
    default:
      return state;
  }
};
