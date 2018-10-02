import axios from "axios";

export const FETCH_POSTS_SUCCESSFUL = "FETCH_POSTS_SUCCESSFUL";
export const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE";
export const POST_SUCCESSFUL = "POST_SUCCESSFUL";
export const POST_FAILURE = "POST_FAILURE";

export const getPosts = () => {
  return dispatch => {
    axios
      .get("http://localhost:9000/api/posts")
      .then(resp =>
        {
        dispatch({ type: FETCH_POSTS_SUCCESSFUL, payload: resp.data })
        }
      )
      .catch(err => dispatch({ type: FETCH_POSTS_FAILURE, payload: err.response.data }));
  };
};

export const newPost = (post) => {
  return dispatch => {
    axios
      .post('http://localhost:9000/api/posts', post)
      .then(resp => dispatch({type: POST_SUCCESSFUL, payload: resp.data}))
      .catch(err => dispatch({type: POST_FAILURE, payload: err}));
  }
}