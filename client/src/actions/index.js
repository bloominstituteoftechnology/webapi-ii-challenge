import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const ERROR = 'ERROR';

export const fetchPosts = () => {
    return dispatch => {
        axios
            .get('http://localhost:5000/api/posts')
            .then(response => {
                dispatch({type: FETCH_POSTS, posts: response.data});
            })
            .catch(err => {
                dispatch({type: ERROR, errorMessage: err.message})
            })
    }
}

export const createPost = post => {
    return dispatch => {
        axios
            .post('http://localhost:5000/api/posts/')
            .then(result => {
                dispatch({type: CREATE_POST, post: result})
            })
            .catch(err => {
                dispatch({type: ERROR, errorMessage: err.message})
            })
    }
}