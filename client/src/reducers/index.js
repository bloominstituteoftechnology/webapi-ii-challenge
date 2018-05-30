import { FETCHING_POSTS, FETCH_POSTS, ERROR } from '../actions'

const initialState = {
    loading: false,
    error: null,
    posts: {}
}
const postReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING_POSTS:
        return Object.assign({}, state, {
            loading: true,
        });
        case FETCH_POSTS:
        let newPost = {};
        action.payload.data.posts.forEach(post => {newPost[post.id] = post})
        return Object.assign({}, state, {
            loading: false,
            posts: Object.assign({}, state.posts, newPost)
        });
        case ERROR:
        return Object.assign({}, state, {
            loading: false,
            error: true,
        });
        default:
            return state;
    }
}
export default postReducer