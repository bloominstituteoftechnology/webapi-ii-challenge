import React from 'react';
import axios from 'axios';

export const FETCHING = 'FETCHING';
export const FETCHED = 'FETCHED';
export const ADDING = 'ADDING';
export const ADDED = 'ADDED';
export const UPDATING = 'UPDATING';
export const UPDATED = 'UPDATED';
export const FETCH_ERROR = 'FETCH_ERROR';
export const ADD_ERROR = 'ADD_ERROR';
export const UPDATE_ERROR = 'UPDATE_ERROR';
export const DELETE_ERROR = 'DELETE_ERROR';

export const fetchNotes = () => {
    return dispatch => {
        dispatch({ type: FETCHING });
        axios
        .get('http://localhost:8000/api/posts')
        .then(res => {
            dispatch({
                type: FETCHED,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({ type: FETCH_ERROR, payload: err })
        })
    }
}