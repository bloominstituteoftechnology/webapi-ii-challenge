import axios from 'axios';

export const LOADING = 'LOADING';
export const GET_POST = 'GET_POST';
export const GET_POSTS = 'GET_POSTS';
export const ERROR = 'ERROR';

export const getPosts = () => {
    return (dispatch) => {
        dispatch({ type: LOADING })
        axios.get('http://localhost:4500/api/posts')
            .then( response => {
                dispatch({ 
                    type: GET_POSTS,
                    posts: response.data,
                })
            })

            .catch( error => {
                dispatch({
                    type: ERROR, 
                    errorMessage: 'Trouble finding Posts',
                })
            })
    }
}

export const getPost = (id) => {
    return (dispatch) => {
        dispatch({ type: LOADING })
        axios.get(`http://localhost:4500/api/posts/${id}`)
            .then( response => {
                dispatch({
                    type: GET_POST,
                    post: response.data,
                })
            })

            .catch( error => {
                dispatch({
                    type: ERROR,
                    errorMessage: 'Trouble finding Post',
                })
            })
    }
}