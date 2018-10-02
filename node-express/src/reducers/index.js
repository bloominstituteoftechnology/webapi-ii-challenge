import { FETCHING, FETCHED, ADDING, ADDED, UPDATING, UPDATED, DELETING, DELETED, FETCH_ERROR, ADD_ERROR, UPDATE_ERROR, DELETE_ERROR } from '../actions';

const initialState = {
    posts: [],
    fetchingNotes: false,
    addingNote: false,
    updatingNote: false,
    deletingNote: false,
    error: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        default:
        return state;
    }
};