import axios from 'axios'
export const LOADING = 'LOADING'
export const FETCH_POSTS = "FETCH_POST"
export const ERROR = "ERROR"



const URL = "http://localhost:5555/api"




export const fetchPosts = () => dispatch => {
    dispatch({ type: LOADING })
    axios
        .get(`${URL}/posts`)
        .then(resp => {
            console.log(resp.data)
            dispatch({type: FETCH_POSTS, payload:resp.data})
        })
        .catch(err => {
            dispatch({type: ERROR, payload: err.errorMessage})
        })
}
