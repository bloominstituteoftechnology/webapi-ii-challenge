import axios from "axios";
import * as Action from "./ActionTypes";

const fetctPost = () => {
  const posts = axios.get(`http://localhost:3000/api/notes`);
  return dispatch => {
    dispatch({ type: Action.FETCHING_POSTS });
    posts
      .then(response => {
        dispatch({
          type: Action.SUCCESS_POSTS,
          payload: response.data
        });
      })

      .catch(err => {
        dispatch({
          type: Action.ERROR_POSTS,
          payload: "ERROR: fetching posts"
        });
      });
  };
}
