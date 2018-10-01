import axios from 'axios';

export const POSTS_FETCH_START = 'POSTS_FETCH_START';
export const POSTS_FETCH_COMPLETE = 'POSTS_FETCH_COMPLETE';
export const POSTS_FETCH_FAILURE = 'POSTS_FETCH_FAILURE';

// Retreive all the notes from the server
export const getPosts = () => dispatch => {
    dispatch({ type: POSTS_FETCH_START });

    axios.get('http://localhost:8000/api/posts')
        .then(res => {
            dispatch({ type: POSTS_FETCH_COMPLETE, payload: res.data });
        })
        .catch(err => dispatch({ type: POSTS_FETCH_FAILURE, payload: err }));
};