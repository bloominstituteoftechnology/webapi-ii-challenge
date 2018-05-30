import axios from 'axios'

export const FETCH_POSTS = "FETCH_POSTS"
export const FETCHING_POSTS = "FETCHING_POSTS"
export const ERROR = "ERROR"

export const fetchPosts = () => {
    const fetchPost = axios.get(`http://localhost:5555/api/posts`);
    return function(dispatch) {
        dispatch({
            type: FETCHING_POSTS
        });
        fetchPost
            .then(response => {
                dispatch({
                    type: FETCH_POSTS,
                    payload: response
                })
            })
            .catch(error => {
                dispatch({
                    type: ERROR,
                    payload: error
                })
            })
    }
}