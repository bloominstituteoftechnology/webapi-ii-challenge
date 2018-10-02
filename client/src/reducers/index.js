import {
	GETTING_POSTS,
	GOT_POSTS,
	GET_POSTS_ERROR,
	GETTING_POST,
	GOT_POST,
	GET_POST_ERROR
} from '../actions';

const initialState = {
	posts: [],
	gettingPosts: false,
	gettingPost: false,
	error: null
};

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

		case GETTING_POST:
			return { ...state, gettingPost: true };

		case GOT_POST:
			return {
				...state,
				post: action.payload,
				gettingPost: false
			};

		case GET_POST_ERROR:
			return {
				...state,
				gettingPost: false,
				error: `${action.payload}`
			};

		default:
			return state;
	}
};

export default noteReducer;
