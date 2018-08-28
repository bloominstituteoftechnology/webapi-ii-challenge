import {
  FETCHING_POSTS,
  POSTS_FETCHED,
  TOGGLE_SHOW,
  CREATED_POST,
  DELETED_POST,
  ERROR
} from '../actions'

const initialState = {
  posts: [],
  isFetchingPosts: false,
  error: null
}

export const postsReducer = (state=initialState, action) => {
  switch(action.type){
    case FETCHING_POSTS:
      return {
        ...state,
        isFetchingPosts: true,
      }
    case POSTS_FETCHED:
      return{
        ...state,
        isFetchingPosts: false,
        posts: action.payload
      }
    case CREATED_POST:
      return{
        ...state,
        posts: [...state.posts, action.payload]
      }
    case TOGGLE_SHOW:
      return{
        ...state,
        posts: state.posts.map(post => {
            if(post.id === action.id){
              return {
                ...post,
                showing: !post.showing
              }
            }
            return post
            }
        )
      }
    case DELETED_POST:
      return{
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload.id)
      }
    case ERROR:
      return{
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}
