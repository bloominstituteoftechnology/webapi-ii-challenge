import axios from "axios";
export const DELETED_POSTE ="DELETED_POSTE";
export const EDIT_POSTE ="EDIT_POSTE";
export const ADD_POSTE = "ADD_POSTE"
export const FETCHING_POSTS = 'FETCHING_POSTS';
export const POSTS_FETCH_SUCCESS = ' POSTS_FETCH_SUCCESS';
export const POSTS_FETCH_ERROR = "POSTS_FETCH_ERROR";





const fetchPostActionCreator = () => {
    
    const promise = axios.get('http://localhost:5001/posts')
 
    return (dispatch) => {
      
    promise
            .then(dispatch({ type: FETCHING_POSTS }))

            .then(response => {
                
                dispatch({ type: POSTS_FETCH_SUCCESS, 
                          payload: response.data })
            })
            .catch(error => {
                console.log(error)
                dispatch({ type:POSTS_FETCH_ERROR })
            })
    }
}



 const AddActionCreator =(x)=>{
  return {
      type: ADD_POSTE,
      payload:x
  }
 }
const  EditActionCreator = (edited) => {
    return {
        type: EDIT_POSTE,
        payload: edited
    }
}


const DeleteActionCreator = (deleted) => {
    return {
        type: EDIT_POSTE,
        payload: deleted
    }
}

export { AddActionCreator, EditActionCreator, DeleteActionCreator, fetchPostActionCreator }