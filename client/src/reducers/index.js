import { FETCHING_POSTS, POSTS_FETCHED, FETCH_ERROR, ADDING_POST, POST_ADDED, ADD_ERROR, DELETING_POST, POST_DELETED, DELETE_ERROR } from '../actions';

const initialState = {
    fetchingPosts: false,
    postsFetched: false,
    addingPost: false,
    deletingPost: false,
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
        case ADDING_POST:
            return {...state, addingPost: true};
        case POST_ADDED:
            return {...state, addingPost: false};
        case ADD_ERROR:
            return {...state, addingPost: false, error: action.payload};
        case DELETING_POST:
            return {...state, deletingPost: true};
        case POST_DELETED:
            return {...state, deletingPost: false};
        case DELETE_ERROR:
            return {...state, deletingPost: false, error: action.payload};
        default:
            return state;
    }
}