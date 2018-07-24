import { GETTING_POSTS, 
    RECEIVED_POSTS, 
    GET_FAILED,
    GETTING_SINGLE_POST,
    RECEIVED_SINGLE_POST,
    GET_SINGLE_FAILED } from './../actions';

    const initialState = {
        posts: [],
        post: {},
        gettingPosts: false,
        receivedPosts: false,
        gettingPost: false,
        receivedPost: false,
        creatingPost: false,
        postCreated: false,
        updatingPost: false,
        postUpdated: false,
        deletingPost: false,
        postDeleted: false,
        searchingPosts: false,
        searchReturned: false,
        error: null
    }

    export const postReducers = (state = initialState, {type, payload}) => {
        switch(type){
            case GETTING_POSTS:
                return {...state, gettingPosts: true}
            case RECEIVED_POSTS:
                return {...state, gettingPosts: false, receivedPosts: true, posts: payload}
            case GET_FAILED:
                return {...state, gettingPosts: false, error: payload}

            case GETTING_SINGLE_POST:
                return {...state, gettingNote: true}
            case RECEIVED_SINGLE_POST:
                return {...state, gettingPost: false, receivedPost: true, post: payload}
            case GET_SINGLE_FAILED:
                return {...state, gettingPost: false, error: payload}

                default: 
                return state;
        }
    }