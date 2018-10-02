import axios from 'axios';

export const FETCHING = 'FETCHING';
export const FETCHED = 'FETCHED';
export const POSTING = 'POSTING';
export const POSTED = 'POSTED';
export const DELETING = 'DELETING';
export const DELETED = 'DELETED';
export const EDITING = 'EDITING';
export const EDITED = 'EDITED';
export const FETCHING_SINGLE = 'FETCHING_SINGLE';
export const FETCHED_SINGLE = 'FETCHED_SINGLE';
export const ERROR = 'ERROR';

export const fetchPosts = () => {
    const fetchAll = axios.get(`http://localhost:8000/api/posts`);

    return dispatch => {
        dispatch({type: FETCHING})

        fetchAll.then(res => {
            dispatch({type: FETCHED, payload: res.data})
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}

export const addPost = (post) => {
    const postRequest = axios.post(`http://localhost:8000/api/posts`, post);

    return dispatch => {
        dispatch({type: POSTING})

        postRequest.then(res => {
            console.log(res);
            dispatch({type: POSTED})
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}

export const fetchSinglePost = (id) => {
    const fetchSingleRequest = axios.get(`http://localhost:8000/api/posts/${id}`);

    return dispatch => {
        dispatch({type: FETCHING_SINGLE})

        fetchSingleRequest.then(res => {
            dispatch({type: FETCHED_SINGLE, payload: res.data})
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}

export const deletePost = (id) => {
    const deleteRequest = axios.delete(`http://localhost:8000/api/posts/${id}`);

    return dispatch => {
        dispatch({type: DELETING})

        deleteRequest.then(res => {
            console.log(res);
            dispatch({type: DELETED})
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}