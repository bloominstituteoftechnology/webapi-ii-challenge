import { LOADING, GET_POST, GET_POSTS, ERROR} from '../actions';

const initialState = {
    posts: [],
    loading: false,
    error: '',
    post: '',
}

export default ( state = initialState, action) => {
    switch (action.type ) {
        case LOADING:
            return { ...state, loading: true };

        case GET_POST:
            return { ...state, post: action.post, loading: false, error: '' };

        case GET_POSTS:
            return { ...state, posts: action.posts, loading: false, error: '' };

        case ERROR: 
            return { ...state, error: action.errorMessage, loading: false };

        default:
            return state;
    }
}