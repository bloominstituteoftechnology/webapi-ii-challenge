import axios from 'axios';

export const POSTS_FETCH_START = 'POSTS_FETCH_START';
export const POSTS_FETCH_COMPLETE = 'POSTS_FETCH_COMPLETE';
export const POSTS_FETCH_FAILURE = 'POSTS_FETCH_FAILURE';

export const ADD_POST_START = 'ADD_POST_START';
export const ADD_POST_COMPLETE = 'ADD_POST_COMPLETE';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const UPDATE_POST_START = 'UPDATE_POST_START';
export const UPDATE_POST_COMPLETE = 'UPDATE_POST_COMPLETE';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';

export const DELETE_POST_START = 'DELETE_POST_START';
export const DELETE_POST_COMPLETE = 'DELETE_POST_COMPLETE';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

export const SET_UPDATE_POST = 'SET_UPDATE_POST';
export const TOGGLE_UPDATE_POST = 'TOGGLE_UPDATE_POST';

// Retreive all the notes from the server
export const getPosts = () => dispatch => {
    dispatch({ type: POSTS_FETCH_START });

    axios.get('http://localhost:8000/api/posts')
        .then(res => {
            dispatch({ type: POSTS_FETCH_COMPLETE, payload: res.data });
        })
        .catch(err => dispatch({ type: POSTS_FETCH_FAILURE, payload: err }));
};

export const addPost = post => dispatch => {
    dispatch({ type: ADD_POST_START });
    console.log('ADD_POST_ACTION', post);

    axios.post('http://localhost:8000/api/posts', post)
    .then(() => getPosts()(dispatch))
        .then(res => {
            console.log('ADD_POST_ACTION', res);
            dispatch({ type: ADD_POST_COMPLETE });
        })
        .catch(err => dispatch({ type: ADD_POST_FAILURE, payload: err }));
};

export const deletePost = id => dispatch => {
    dispatch({ type: DELETE_POST_START });

    axios.get(`http://localhost:8000/api/posts/${id}`)
        .then(() => getPosts()(dispatch))
        .then(res => {
            dispatch({ type: DELETE_POST_COMPLETE });
        })
        .catch(err => dispatch({ type: DELETE_POST_FAILURE, payload: err }));
};

export const setUpdatePost = id => dispatch => {
    console.log('setUpdatePost', id);
    dispatch({ type: SET_UPDATE_POST, payload: id });
};

export const updatePost = post => dispatch => {
    dispatch({ type: UPDATE_POST_START});
    const newPost = {
        id: post.id,
        title: post.title,
        contents: post.contents
    };

    axios.put(`http://localhost:8000/api/posts/${post.id}`, newPost)
        .then(() => getPosts()(dispatch))
        .then(res => {
            dispatch({ type: UPDATE_POST_COMPLETE });
        })
        .catch(err => dispatch({ type: UPDATE_POST_FAILURE, payload: err }));
}

export const toggleUpdatePost = () => dispatch => {
    dispatch({ type: TOGGLE_UPDATE_POST });
};