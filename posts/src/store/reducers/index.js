import { FETCHING, FETCHED, ERROR } from "../actions";

const initialState = {
  fetchingPosts: false,
  postsFetched: false,
  posts: [],
  error: null
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return Object.assign({}, state, { fetchingPosts: true });
    case FETCHED:
      return Object.assign({}, state, {
        posts: action.payload,
        fetchingPosts: false,
        postsFetched: true
      });
    case ERROR:
      return Object.assign({}, state, {
        fetchingPosts: false,
        error: action.payload
      });
    default:
      return state;
  }
};
