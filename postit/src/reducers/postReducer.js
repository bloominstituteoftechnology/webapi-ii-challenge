import { LOADING, FETCH_POSTS, ERROR } from '../actions'


const initialState = {
    posts: [],
    loading: false,
    error: null
}


export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true }
        case FETCH_POSTS:
            return { ...state, posts: action.payload, loading: false }
        case ERROR:
            return { ...state, error: action.payload, loading: false }
        default:
        return state

    }
}