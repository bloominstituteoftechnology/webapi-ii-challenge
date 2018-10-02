import axios from "axios";

export const FETCHING = "FETCHING";
export const FETCHED = "FETCHED";
export const ERROR = "ERROR";

export const fetchPosts = () => {
  return dispatch => {
    dispatch({ type: FETCHING });
    axios
      .get("http://localhost:8000/api/posts")
      .then(response => {
        console.log(response);
        dispatch({ type: FETCHED, payload: response.data });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: ERROR, payload: err });
      });
  };
};
