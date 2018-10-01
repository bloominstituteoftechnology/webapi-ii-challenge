import { FETCHING_POSTS, FETCHED_POSTS, FETCH_POSTS_ERRORS } from '../actions';

const initialState = {
  title: '',
  contents: '',
  created_at: '',
  updated_at: '',
  fetching: false,
  error: ''
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_POSTS:
      return { ...state, fetching: true };

    case FETCHED_POSTS:
      return {
        ...state,
        friends: action.payload,
        fetching: false
      };

    case FETCH_POSTS_ERRORS:
      return {
        ...state,
        fetching: false,
        error: `${action.payload}`
      };

    default:
      return state;
  }
};

export default rootReducer;
