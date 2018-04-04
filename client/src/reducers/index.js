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
            return Object.assign({}, state, {
                posts: action.posts,
            });
        case DELETE_POST:
            return Object.assign({}, state, {
                posts: state.posts.filter(post => {
                    return post.id !== action.id
                })
            });
        case CREATE_POST:
            return Object.assign({}, state, {
                posts: [...state.posts, {
                    id: action.id,
                    title: action.title,
                    contents: action.contents,
                }]
            })
        case EDIT_POST:
            return Object.assign({}, state, {
                posts: state.posts.filter(post => {
                    return post.id !== action.id})
                    .concat({
                        id: action.id,
                        title: action.title,
                        contents: action.contents,
                    })
            })
        case ERROR:
        console.log(action.errorMessage);
            return state;
        default:
            return state
    }
}