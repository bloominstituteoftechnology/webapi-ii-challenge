import axios from "axios";

export const FETCH_POSTS_SUCCESSFUL = "FETCH_POSTS_SUCCESSFUL";
export const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE";
export const POST_SUCCESSFUL = "POST_SUCCESSFUL";
export const POST_FAILURE = "POST_FAILURE";
export const DELETE_SUCCESS = "DELETE_SUCCESS";
export const DELETE_FAILURE = "DELETE_FAILURE";
export const UPDATE_SUCCESSFUL = "UPDATE_SUCCESSFUL";
export const UPDATE_FAILURE = "UPDATE_FAILURE";

export const getPosts = () => {
  return dispatch => {
    axios
      .get("http://localhost:9000/api/posts")
      .then(resp => {
        dispatch({ type: FETCH_POSTS_SUCCESSFUL, payload: resp.data });
      })
      .catch(err =>
        dispatch({ type: FETCH_POSTS_FAILURE, payload: err.response.data })
      );
  };
};

export const newPost = post => {
  return dispatch => {
    axios
      .post("http://localhost:9000/api/posts", post)
      .then(resp => dispatch({ type: POST_SUCCESSFUL, payload: resp.data }))
      .catch(err => dispatch({ type: POST_FAILURE, payload: err }));
  };
};

export const deletePost = id => {
  return dispatch => {
    axios
      .delete(`http://localhost:9000/api/posts/${id}`)
      .then(resp => {
        console.log("DEL successful");
        dispatch({ type: DELETE_SUCCESS });
      })
      .catch(err => {
        console.log("DEL error", err);
        dispatch({ type: DELETE_FAILURE });
      });
  };
};

export const updatePost = (id, post) => {
  return dispatch => {
    axios
      .put(`http://localhost:9000/api/posts/${id}`, post)
      .then(resp => dispatch({ type: UPDATE_SUCCESSFUL, payload: resp.data }))
      .catch(err =>
        dispatch({ type: UPDATE_FAILURE, payload: err.response.data })
      );
  };
};
