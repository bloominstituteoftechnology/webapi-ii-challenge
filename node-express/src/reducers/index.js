import { FETCHING, FETCHED, ADDING, ADDED, UPDATING, UPDATED, DELETING, DELETED, FETCH_ERROR, ADD_ERROR, UPDATE_ERROR, DELETE_ERROR, SET_UPDATE_POST } from '../actions';

const initialState = {
    posts: [],
    fetchingPosts: false,
    addingPost: false,
    updatingPost: false,
    deletingPost: false,
    error: null,
    postToUpdate: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCHING:
            return {...state, fetchingPosts: true};
        case FETCHED:
            return {...state, posts: [...action.payload], fetchingPosts: false};
        case ADDING:
            return {...state, addingPost: true};
        case ADDED:
            return {...state, addingPost: false};
        case SET_UPDATE_POST:
        const post = state.posts.find(post => post.id === action.payload );
        return {...state, postToUpdate: post ? post : null }
        case UPDATING:
            return {...state, updatingPost: true };
        case UPDATED:
            return {...state, updatingPost: false, postToUpdate: null};
        case DELETING:
            return {...state, deletingPost: true };
        case DELETED:
            return {...state, deletingPost: false };
        case FETCH_ERROR:
            return {...state, addingPost: false, error: action.payload };
        case ADD_ERROR:
            return {...state, addingPost: false, error: action.payload };
        case UPDATE_ERROR:
            return {...state, updatingPost: false, error: action.payload };
        case DELETE_ERROR:
            return {...state, deletingPost: false, error: action.payload };
        default:
        return state;
    }
};