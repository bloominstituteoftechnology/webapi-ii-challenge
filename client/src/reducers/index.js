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
                posts: action.payload
            })

        default:
            return state;
    }
}