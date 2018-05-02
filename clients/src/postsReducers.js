import { ADD_POSTE } from "./allActions";
import { EDIT_POSTE } from "./allActions";
import { DELETED_POSTE} from "./allActions";
import { POSTS_FETCH_ERROR, POSTS_FETCH_SUCCESS, FETCHING_POSTS } from "./allActions";
 
const posts = [];

 const PostsReducer = (state = posts ,action)=>{
     console.log('hilal',action.payload);
  switch(action.type){
      case FETCHING_POSTS:
      return state  

      case POSTS_FETCH_SUCCESS:
          return state = [...state,...action.payload] 
      case POSTS_FETCH_ERROR:
          return state = [ ...state,...action.payload]

          
      case ADD_POSTE:
         return state;
      case EDIT_POSTE:
          return state;
      case DELETED_POSTE:
          return state ;
      default:
           return state;
  }



 }
export { PostsReducer};