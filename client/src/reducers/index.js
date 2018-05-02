import { FETCH_POSTS, FETCHED_POSTS, ERROR_FETCHING, FETCH_POST } from '../actions';

const initialState = {
   posts: [],
   post: {},
   fetchingPosts: false,
   fetchPost: false,
   error: null
}

export const rootReducer = (state = initialState, action) => {
  switch(action.type) {

    case FETCH_POSTS:
      return Object.assign({}, state, { 
        fetchingPosts: true 
      });

    case FETCHED_POSTS:
      return Object.assign({}, state, {
        posts: [ ...action.payload ],
        fetchingPosts: false,
        error: null
      });

    case ERROR_FETCHING:
      return Object.assign({}, state, {
        error: action.payload
      });

    case FETCH_POST:
      return Object.assign({}, state, {
        post: action.payload,
        fetchPost: true
      });

    default:
      return state;
    }
};

export default rootReducer;