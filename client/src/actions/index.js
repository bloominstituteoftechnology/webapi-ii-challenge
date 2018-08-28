import axios from "axios";

export const FETCHING_POSTS = "FETCHING_POSTS";
export const POSTS_FETCH_SUCCESS = "POSTS_FETCH_SUCCESS";
export const POSTS_FETCH_ERROR = "POSTS_FETCH_ERROR";
export const ADDING_POST = "ADDING_POST";
export const ADDING_POST_SUCCESS = "ADDING_POST_SUCCESS";
export const DELETING_POST = "DELETING_POST";
export const DELETING_POST_SUCCESS = "DELETING_POST_SUCCESS";
export const ADDING_POST_ERROR = "ADDING_POST_ERROR";
export const DELETING_POST_ERROR = "DELETING_POST_ERROR";

const URL = "http://localhost:9000/posts";

export const fetchPosts = () => dispatch => {
  dispatch({ type: FETCHING_POSTS });
  axios
    .get(URL)
    .then(response => {
      dispatch({
        type: POSTS_FETCH_SUCCESS,
        payload: response.data,
      });
    })
    .catch(error => {
      dispatch({
        type: POSTS_FETCH_ERROR,
        payload: error.data,
      });
    });
};

export const addPost = post => dispatch => {
  dispatch({ type: ADDING_POST });
  axios
    .post(URL, post)
    .then(response => {
      dispatch({
        type: ADDING_POST_SUCCESS,
        payload: response.data,
      });
    })
    .catch(error => {
      dispatch({
        type: ADDING_POST_ERROR,
        payload: error.data,
      });
    });
};

export const deletePost = id => dispatch => {
  dispatch({ type: DELETING_POST });
  axios
    .delete(`${URL}/${id}`)
    .then(response => {
      dispatch({
        type: DELETING_POST_SUCCESS,
        payload: response.data,
      });
    })
    .catch(error => {
      dispatch({
        type: DELETING_POST_ERROR,
        payload: error.data,
      });
    });
};
