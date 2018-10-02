import {GETTING, GOTMINE, ERROR} from '../actions';

const initialState = {
    posts: [],
    getting: false,
    error: null
};

const reducer = (state=initialState, action) =>{
    switch(action.type){
        case GETTING:
            return{...state, getting:true}
        case GOTMINE:
            return{
                ...state,
                posts: action.payload,
                getting: false
            }
        case ERROR:
            return{
                ...state,
                getting: false
            }
        default:
            return state;
    }
};

export default reducer;