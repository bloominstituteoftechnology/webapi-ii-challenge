import { LOADING, FETCH_POSTS, ERROR } from '../actions'


const initialState = {
    posts: [],
    loading: false,
    error: null
}


export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
        return state

    }
}