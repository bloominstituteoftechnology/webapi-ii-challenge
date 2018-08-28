import axios from "axios";

export const FETCHING_POSTS = "FETCHING_POSTS";
export const POSTS_FETCH_SUCCESS = "POSTS_FETCH_SUCCESS";
export const POSTS_FETCH_ERROR = "POSTS_FETCH_ERROR";

const URL = "http://localhost:9000/posts";

export const fetchPosts = () => dispatch => {
  dispatch({ type: FETCHING_POSTS });
  axios.get(URL).then(response => {
    dispatch({
      type: POSTS_FETCH_SUCCESS,
      payload: response.data,
    });
  });
};
