import { FETCHING_POSTS, POSTS_FETCHED, FETCH_ERROR } from '../actions';

const initialState = {
    fetchingPosts: false,
    postsFetched: false,
    posts: [],
    error: null
}

export const postsReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_POSTS:
            return {...state, fetchingPosts: true};
        case POSTS_FETCHED:
            return {...state, fetchingPosts: false, posts: action.payload};
        case FETCH_ERROR:
            return {...state, fetchingPosts: false, error: action.payload};
        default:
            return state;
    }
}