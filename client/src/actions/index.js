import axios from 'axios';

export const FETCH_START = 'FETCH_START';
export const FETCH_NEON_SUCCESS = 'FETCH_NEON_SUCCESS';
export const FETCH_NEON_FAILURE = 'FETCH_NEON_FAILURE';
export const UPDATE = 'UPDATE';
export const DELETE = 'DELETE';

export const getNeon = () => dispatch => {
    dispatch({ type: FETCH_START });
    axios 
        .get(`http://localhost:5000/api/neon`)
};

export const postNeon = () => dispatch => {

};

export const putNeon = () => dispatch => {

};

export const deleteNeon = () => dispatch => {

};