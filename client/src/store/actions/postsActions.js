import axios from 'axios';

export const POSTS_FETCH_START = 'POSTS_FETCH_START';
export const POSTS_FETCH_COMPLETE = 'POSTS_FETCH_COMPLETE';
export const POSTS_FETCH_FAILURE = 'POSTS_FETCH_FAILURE';

export const POST_GET_START = 'POST_GET_START';
export const POST_GET_COMPLETE = 'POST_GET_COMPLETE';
export const POST_GET_FAILURE = 'POST_GET_FAILURE';

export const ADD_POST_START = 'ADD_POST_START';
export const ADD_POST_COMPLETE = 'ADD_POST_COMPLETE';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const POST_EDIT_START = 'POST_EDIT_START';
export const POST_EDIT_COMPLETE = 'POST_EDIT_COMPLETE';
export const POST_EDIT_FAILURE = 'POST_EDIT_FAILURE';

export const DELETE_POST_START = 'DELETE_POST_START';
export const DELETE_POST_COMPLETE = 'DELETE_POST_COMPLETE';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

export const getPosts = () => dispatch => {
    dispatch({ type: POSTS_FETCH_START });
    const promise = axios.get('http://localhost:8000/api/posts/');
    promise
        .then(response => {
            dispatch({ type: POSTS_FETCH_COMPLETE, payload: response.data });
        })
        .catch(err => {
            dispatch({ type: POSTS_FETCH_FAILURE, payload: err });
        });
};

export const getPost = (id) => dispatch => {
    dispatch({ type: POST_GET_START });
    const promise = axios.get(`http://localhost:8000/api/posts/${id}`);
    promise
        .then(response => {
            dispatch({ type: POST_GET_COMPLETE, payload: response.data });
            // console.log(response.data);
        })
        .catch(err => {
            dispatch({ type: POST_GET_FAILURE, payload: err });
        });
};

export const addNewPost = (post) => dispatch => {
    dispatch({ type: ADD_POST_START });

    axios.post("http://localhost:8000/api/posts/", post)
        .then(response => {
            dispatch({ type: ADD_POST_COMPLETE, payload: response.data });
        }).catch(err => {
            dispatch({ type: ADD_POST_FAILURE, payload: err });
        });
}

export const editPost = (post) => dispatch => {
    dispatch({ type: POST_EDIT_START });
    const promise = axios.put(`http://localhost:8000/api/posts/${post['id']}`, post);
    promise
        .then(response => {
            // console.log(id);
            dispatch({ type: POST_EDIT_COMPLETE, payload: response.data });
            // console.log("got it!");
        })
        .catch(err => {
            dispatch({ type: POST_EDIT_FAILURE, payload: err });
        });
};

export const deletePost = (id) => dispatch => {
    dispatch({ type: DELETE_POST_START });
    const promise = axios.delete(`http://localhost:8000/api/posts/${id}`);
    promise
        .then(response => {
            // console.log(id);
            dispatch({ type: DELETE_POST_COMPLETE  });
            // console.log("got it!");
        })
        .catch(err => {
            dispatch({ type: DELETE_POST_FAILURE, payload: err });
        });
};