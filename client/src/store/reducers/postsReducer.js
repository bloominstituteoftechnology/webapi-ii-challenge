import {
    POSTS_FETCH_START,
    POSTS_FETCH_COMPLETE,
    POSTS_FETCH_FAILURE,

    ADD_POST_START,
    ADD_POST_COMPLETE,
    ADD_POST_FAILURE,

    UPDATE_POST_START,
    UPDATE_POST_COMPLETE,
    UPDATE_POST_FAILURE,

    DELETE_POST_START,
    DELETE_POST_COMPLETE,
    DELETE_POST_FAILURE,

    SET_UPDATE_POST,
    TOGGLE_UPDATE_POST,
} from '../actions';

const initialState = {
    posts: null,
    error: '',
    isLoading: false,
    addingPost: false,
    isDeleting: false,
    isUpdating: false,
    postToUpdate: [],
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
        case ADD_POST_START:
            return { ...state, addingPost: true };
        case ADD_POST_COMPLETE:
            return { ...state, addingPost: false };
        case ADD_POST_FAILURE:
            return { ...state, addingPost: false, error: action.payload };
        case DELETE_POST_START:
            return { ...state, isDeleting: true };
        case DELETE_POST_COMPLETE:
            return { ...state, isDeleting: false };
        case DELETE_POST_FAILURE:
            return { ...state, isDeleting: false, error: action.payload };
        case UPDATE_POST_START:
            return { ...state, isUpdating: true };
        case UPDATE_POST_COMPLETE:
            return { ...state, isUpdating: false };
        case UPDATE_POST_FAILURE:
            return { ...state, isUpdating: false, error: action.payload };
        case SET_UPDATE_POST:
            const post = state.posts.map(post => post).filter(post => post.id === action.payload);
            return { ...state, isUpdating: true, postToUpdate: post[0] }
        case TOGGLE_UPDATE_POST:
            return { ...state, isUpdating: false };
        default:
            return state;
    }
};