import axios from 'axios';

const URL = 'http://localhost:3333/api/posts';

export const FETCHING_POSTS = 'FETCHING_POSTS';
export const POSTS_FETCHED = 'POSTS_FETCHED';
export const TOGGLE_SHOW = 'TOGGLE_SHOW';
export const ERROR = 'ERROR';



export const fetchPosts = () => {
  return function(dispatch) {
    dispatch({ type: FETCHING_POSTS });

    axios.get(URL)
          .then(res => dispatch({ type: POSTS_FETCHED, payload: res.data }))
          .catch(err => dispatch({ type: ERROR, payload: err }));
  }
}

export const toggleShow = id => {
  return {
    type: TOGGLE_SHOW,
    id
  }
}
