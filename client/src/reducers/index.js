import {FETCHING, FETCHED, POSTING, POSTED, FETCHING_SINGLE, FETCHED_SINGLE, EDITING, EDITED, DELETING, DELETED, ERROR} from '../actions/index';

const initialState = {
    fetching: false,
    fetched: false,
    fetching_single: false,
    fetched_single: false,
    posting: false,
    posted: false,
    editing: false,
    edited: false,
    deleting: false,
    deleted: false,
    error: false,
    posts: [],
    currentNote: {}
}

export const rootReducer = (state = initialState, action) => {
    switch(action.type){
        // action reducers go here
        case FETCHING:
            return Object.assign({}, state, {
                fetching: true
            })
        
        case FETCHED:
            return Object.assign({}, state, {
                fetching: false, 
                fetched: true, 
                posts: action.payload,
                currentNote: {}
            })

        case POSTING:
            return Object.assign({}, state, {
                posting: true
            })

        case POSTED:
            return Object.assign({}, state, {
                posting: false, 
                posted: true
            })
        
        case FETCHING_SINGLE:
            return Object.assign({}, state, {
                fetching_single: true
            })

        case FETCHED_SINGLE:
            return Object.assign({}, state, {
                fetching_single: false,
                fetched_single: true,
                currentNote: action.payload
            })

        case DELETING:
            return Object.assign({}, state, {
                deleting: true
            })

        case DELETED:
            return Object.assign({}, state, {
                deleting: false,
                deleted: true
            })

        default:
            return state;
    }
}