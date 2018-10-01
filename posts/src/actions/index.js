import axios from 'axios';

export const FETCHING_POSTS = 'FETCHING_POSTS';
export const POSTS_FETCHED = 'POSTS_FETCHED';
export const FETCH_ERROR = 'FETCH_ERROR';

export const fetchPosts = () => {
    return dispatch => {
        dispatch({ type: FETCHING_POSTS });
        axios
            .get('http://localhost:8100/')
            .then(res => {
                console.log('fetchPosts .then', res);
                dispatch({ type: POSTS_FETCHED, payload: 'hi, fix payload'})
            })
            .catch(err => {
                dispatch({ type: FETCH_ERROR })
            })
    }
}