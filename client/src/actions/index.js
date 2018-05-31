// we'll need axios
import axios from 'axios';

import { 
  FETCHING_POSTS,
  POSTS_FETCHED, 

  FETCHING_POST, 
  POST_FETCHED,

  SAVING_POST, 
  POST_SAVED,

  DELETING_POST,
  POST_DELETED,
  
  ERROR
} from "./types";

export const fetchPosts = () => {
  const getData = axios.get('http://localhost:5000/api/posts/');
  return function(dispatch) {
    dispatch({ type: FETCHING_POSTS });
    getData
      .then(someData => {
          dispatch({ type: POSTS_FETCHED, payload: someData.data });
      })
      .catch(err => {
        dispatch({type: ERROR, payload: err});
      });
  };
};

export const fetchPost = (id) => {
  const getData = axios.get(`http://localhost:5000/api/posts/${id}`)

  return function(dispatch) {
    dispatch({ type: FETCHING_POST });
    getData
      .then(someData => {
          dispatch({ type: POST_FETCHED, payload: someData.data });
      })
      .catch(err => {
        dispatch({type: ERROR, payload: err});
      });
  };
};

export const savePost = (post) => {
  const getData = axios.post('http://localhost:5000/api/posts', post)

  return function(dispatch) {
    dispatch({ type: SAVING_POST });
    getData
      .then(someData => {
        console.log("SAVED" , someData)
          dispatch({ type: POST_SAVED, payload: someData.data });
      })
      .catch(err => {
        dispatch({type: ERROR, payload: err});
      });
  };
};

export const deletePost = (post) => {
  const getData = axios.delete(`http://localhost:5000/api/posts/${post.id}`)

  return function(dispatch) {
    dispatch({ type: DELETING_POST });
    getData
      .then(someData => {
          dispatch({ type: POST_DELETED, payload: someData.data });
      })
      .catch(err => {
        dispatch({type: ERROR, payload: err});
      });
  };
};