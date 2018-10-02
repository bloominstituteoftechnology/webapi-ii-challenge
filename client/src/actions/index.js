import axios from 'axios';

//fetch
export const FETCHING_POSTS = 'FETCHING_POSTS';
export const POSTS_FETCHED = 'POSTS_FETCHED';
export const FETCH_ERROR = 'FETCH_ERROR';
//add
export const ADDING_POST = 'ADDING_POST';
export const POST_ADDED = 'POST_ADDED';
export const ADD_ERROR = 'ADD_ERROR';
//delete
export const DELETING_POST = 'DELETING_POST';
export const POST_DELETED = 'POST_DELETED';
export const DELETE_ERROR = 'DELETE_ERROR';

export const fetchPosts = () => {
    return dispatch => {
        dispatch({ type: FETCHING_POSTS });
        axios
            .get('http://localhost:8100/api/posts')
            .then(res => {
                dispatch({ type: POSTS_FETCHED, payload: res.data })
            })
            .catch(err => {
                dispatch({ type: FETCH_ERROR })
            })
    }
}

export const addPost = (post) => {
    return dispatch => {
        dispatch({ type: ADDING_POST });
        axios
            .post('http://localhost:8100/api/posts', post)
            .then(res => {
                dispatch({ type: POST_ADDED })
            })
            .catch(err => {
                dispatch({ type: ADD_ERROR, payload: "error adding post" })
            })
    }
}

export const deletePost = (id) => {
    return dispatch => {
        dispatch({ type: DELETING_POST })
        axios
            .delete(`http://localhost:8100/api/posts/${id}`)
            .then(res => {
                dispatch({ type: POST_DELETED })
            })
            .catch(err => {
                dispatch({ type: DELETE_ERROR, payload: "error deleting post" })
            })
    }
}