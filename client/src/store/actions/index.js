import axios from 'axios';
import { urlLinks } from '../../App';

/***************************************************************************************************
 ********************************************* Variables *******************************************
 **************************************************************************************************/
export const GET_POSTS_LOADING = 'GET_POSTS_LOADING';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE';

export const GET_POST_LOADING = 'GET_POST_LOADING';
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
export const GET_POST_FAILURE = 'GET_POST_FAILURE';

/***************************************************************************************************
 ********************************************** Actions ********************************************
 **************************************************************************************************/
export const getPosts = () => dispatch => {
  dispatch({ type: GET_POSTS_LOADING });
  axios
    .get(`${urlLinks.server}${urlLinks.home}${urlLinks.getPosts}`)
    .then(res => {
      console.log(res);
      dispatch({ type: GET_POSTS_SUCCESS, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_POSTS_FAILURE, payload: err }));
};

export const getPost = id => dispatch => {
  dispatch({ type: GET_POST_LOADING });
  axios
    .get(`${urlLinks.server}${urlLinks.home}${urlLinks.getPosts}/${id}`)
    .then(res => {
      dispatch({ type: GET_POST_SUCCESS, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_POST_FAILURE, payload: err }));
};
