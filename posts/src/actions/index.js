import axios from "axios";

export const FETCH_POSTS_SUCCESSFUL = "FETCH_POSTS_SUCCESSFUL";
export const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE";

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