import axios from 'axios';

export const FETCHING_POSTS = 'FETCHING';
export const FETCHED_POSTS = 'FETCHED';
export const FETCH_POSTS_ERRORS = 'ERRORS';

export const fetchPosts = () => {
  return dispatch => {
    dispatch({ type: FETCHING_POSTS });
    axios
      .get('http://localhost:8000/api/posts')

      .then(response => {
        // console.log(response.data);
        dispatch({ type: FETCHED_POSTS, payload: response.data });
      })

      .catch(error => dispatch({ type: FETCH_POSTS_ERRORS, error: error }));
  };
};
