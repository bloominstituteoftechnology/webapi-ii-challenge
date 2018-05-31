import { combineReducers } from 'redux';
import { postsReducer } from './postsReducer';
import { postReducer } from './postsReducer';


export default combineReducers({
    postsReducer,
    postReducer
});
