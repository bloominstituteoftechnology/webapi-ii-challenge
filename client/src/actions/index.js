import axios from 'axios';

// getPosts
export const GETTING_POSTS = 'GETTING_POSTS';
export const GOT_POSTS = 'GOT_POSTS';
export const GET_POSTS_ERROR = 'GET_POSTS_ERROR';
// redirect
export const SET_REDIRECT = 'SET_REDIRECT';
export const RESET_REDIRECT = 'RESET_REDIRECT';

// Loading status testing
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// Actions
export const getPosts = () => {
	return dispatch => {
		dispatch({ type: GETTING_POSTS });

		axios
			.get('http://localhost:5000/api/posts')

			.then(async ({ data }) => {
				await sleep(1000);
				dispatch({ type: GOT_POSTS, payload: data });
			})

			.catch(error => dispatch({ type: GET_POSTS_ERROR, payload: error }));
	};
};

export const setRedirect = url => {
	return dispatch => {
		dispatch({ type: SET_REDIRECT, payload: url });
	};
};

export const resetRedirect = () => {
	return dispatch => {
		dispatch({ type: RESET_REDIRECT });
	};
};
