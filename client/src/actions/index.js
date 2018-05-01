import axios from 'axios';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCHED_POSTS = 'FETCHED_POSTS';
export const ERROR_FETCHING = 'ERROR_FETCHING';

export const getPosts = () => {
    const posts = axios.get(`http://localhost:5000/api/posts/`);
    return dispatch => {
      dispatch({ type: FETCH_POSTS });
      posts
        .then(response => {
          dispatch({
            type: FETCHED_POSTS,
            payload: response.data
          });
        })
        .catch(err => {
          dispatch({
            type: ERROR_FETCHING,
            payload: 'ERROR Fetching Posts'
          });
        });
    };
  };
