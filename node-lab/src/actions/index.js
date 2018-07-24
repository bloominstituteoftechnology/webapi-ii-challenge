import axios from 'axios';

export const GETTING_POSTS = 'GETTING_POSTS';
export const RECEIVED_POSTS = 'RECEIVED_POSTS';
export const GET_FAILED = 'GET_FAILED';

export const GETTING_SINGLE_POST = 'GETTING_SINGLE_POST';
export const RECEIVED_SINGLE_POST ='RECEIVED_SINGLE_POST';
export const GET_SINGLE_FAILED = 'GET_SINGLE_FAILED';

export const CREATING_POST = 'CREATING_POST';
export const POST_CREATED = 'POST_CREATED';
export const CREATE_FAILED = 'CREATE_FAILED';

export const UPDATING_POST = 'UPDATING_POST';
export const POST_UPDATED = 'POST_UPDATED';
export const UPDATE_FAILED = 'UPDATE_FAILED';

export const DELETING_POST = 'DELETING_POST';
export const POST_DELETED = 'POST_DELETED';
export const DELETE_FAILED = 'DELETE_FAILED';

export function getPosts() {
    return(dispatch) => {
        dispatch({type: GETTING_POSTS});
        axios
            .get('http://localhost:8000/api/posts')
            .then(({data}) => {
                dispatch({type: RECEIVED_POSTS, payload: data})
                console.log(data);
            })
            .catch(err => {
                console.log(err);
                dispatch({type: GET_FAILED, error: err})
            })
    }
}

export function getSinglePost (id) {
    return(dispatch) =>{
    dispatch({type: GETTING_SINGLE_POST});
    axios.get(`http://localhost:8000/api/posts/${id}`)
      .then(({data}) => {
          console.log(data)
          dispatch({type: RECEIVED_SINGLE_POST, payload: data});
      })
      .catch(err => {
          console.log(err);
          dispatch({type: GET_SINGLE_FAILED, error: err})
      })
    }
}