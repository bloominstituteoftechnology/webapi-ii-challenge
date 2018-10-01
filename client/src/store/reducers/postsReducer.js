import {
    POSTS_FETCH_START,
    POSTS_FETCH_COMPLETE,
    POSTS_FETCH_FAILURE,
} from '../actions';

const initialState = {
    posts: null,
    error: '',
    isLoading: false,
};

export const postsReducer = (state = initialState, action) => {
    switch(action.type) {
        case POSTS_FETCH_START:
            return { ...state, isLoading: true };
        case POSTS_FETCH_COMPLETE:
            return { ...state, isLoading: false, posts: action.payload };
        case POSTS_FETCH_FAILURE:
            console.log('FAILURE TO FETCH POSTS', action.payload);
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
};