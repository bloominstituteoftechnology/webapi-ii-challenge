import axios from 'axios';

export const GETTING = 'GETTING';
export const GOTMINE = 'GOTMINE';
export const ERROR = 'ERROR';

export default function action(){
    return dispatch =>{
        dispatch({type: GETTING})
            axios
                .get('http://localhost:8000/api/posts')
                .then(response =>{
                    dispatch({type: GOTMINE, payload: response.data});
                })
                .catch(err =>{
                    dispatch({type: ERROR, payload: err});
                    console.log(err);
                });
    }
}