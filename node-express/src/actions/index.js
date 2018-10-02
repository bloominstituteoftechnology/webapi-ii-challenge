import React from 'react';
import axios from 'axios';

export const FETCHING = 'FETCHING';
export const FETCHED = 'FETCHED';
export const ADDING = 'ADDING';
export const ADDED = 'ADDED';
export const UPDATING = 'UPDATING';
export const UPDATED = 'UPDATED';
export const DELETING = 'DELETING';
export const DELETED = 'DELETED';
export const FETCH_ERROR = 'FETCH_ERROR';
export const ADD_ERROR = 'ADD_ERROR';
export const UPDATE_ERROR = 'UPDATE_ERROR';
export const DELETE_ERROR = 'DELETE_ERROR';

export const SET_UPDATE_POST = 'SET_UPDATE_POST';

export const fetchPosts = () => {
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

export const addPost = (post) => {
    return dispatch => {
        dispatch({ type: ADDING });
        axios
        .post('http://localhost:8000/api/posts', post)
        .then(res => {
            dispatch({
                type: ADDED,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({ type: ADD_ERROR, payload: err })
        })
    }
}

export const deletePost = postId => dispatch => {
    dispatch({ type: DELETING });
    axios
    .delete(`http://localhost:8000/api/posts/${postId}`)
    .then(res => {
        dispatch({ type: DELETED, payload: res.data });
    })
    .catch(err => {
        dispatch({ type: DELETE_ERROR, payload: err });
    });
}

export const setUpdatePost = id => {
    return {
        type: SET_UPDATE_POST,
        payload: id
    }
}

export const updatePost = post => dispatch => {
    dispatch({ type: UPDATING });
    axios
    .put(`http://localhost:8000/api/posts/${post.id}`, post)
    .then(res => {
        dispatch({ type: UPDATED, payload: res.data });
    })
    .catch(err => {
        dispatch({ type: UPDATE_ERROR, payload: err })
    })
}