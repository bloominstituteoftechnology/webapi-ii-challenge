import { GETTING_POSTS, GOT_POSTS, GET_POSTS_ERROR } from '../actions';

const initialState = { posts: [], gettingPosts: false, error: null };

const noteReducer = (state = initialState, action) => {
	switch (action.type) {
		// getPosts
		case GETTING_POSTS:
			return { ...state, gettingPosts: true };

		case GOT_POSTS:
			return {
				...state,
				posts: action.payload,
				gettingPosts: false
			};

		case GET_POSTS_ERROR:
			return {
				...state,
				gettingPosts: false,
				error: `${action.payload}`
			};

		default:
			return state;
	}
};

export default noteReducer;
