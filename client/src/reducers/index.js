import {
    FETCH_POSTS,
    CREATE_POST,
    EDIT_POST,
    DELETE_POST,
    ERROR,
} from '../actions';


const initialState = {
    posts: [],
}

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_POSTS:
        console.log(action.posts);
            return Object.assign({}, state, {
                posts: action.posts,
            });
        default:
            return state
    }
}