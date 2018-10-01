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
            console.log(res, res.data);
            dispatch({type: FETCHED, payload: res.data})
        }).catch(err => {
            console.log(err);
            dispatch({type: ERROR})
        })
    }
}