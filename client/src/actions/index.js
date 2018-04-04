import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const ERROR = 'ERROR';

export const fetchPosts = () => {
    return dispatch => {
        axios
            .get('http://localhost:5000/api/posts')
            .then(response => {
                dispatch({type: FETCH_POSTS, posts: response.data});
            })
            .catch(err => {
                dispatch({type: ERROR, errorMessage: err.message})
            })
    }
}

export const createPost = post => {
    return dispatch => {
        axios
            .post('http://localhost:5000/api/posts/', {...post})
            .then(result => {
                dispatch({
                    type: CREATE_POST,
                    id: result.data.id,
                    title: result.data.title,
                    contents: result.data.contents,
                })
            })
            .catch(err => {
                console.log(err.message);
            })
    }
}

export const deletePost = id => {
    return dispatch => {
        axios
            .delete(`http://localhost:5000/api/posts/${id}`)
            .then(result => {
                dispatch({type: DELETE_POST, id})
            })
            .catch(err => {
                console.log(err.message);
            })
    }
}

export const editPost = post => {
    return dispatch => {
        axios
            .put(`http://localhost:5000/api/posts/${post.id}`, {...post})
            .then(result => {
                dispatch({
                    type: EDIT_POST,
                    id: result.data.id,
                    title: result.data.title,
                    contents: result.data.contents,
                })
            })
            .catch(err => {
                console.log(err.message);
            })
    }
}
