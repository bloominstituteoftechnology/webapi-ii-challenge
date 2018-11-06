import React from 'react';
import axios from 'axios';


const Post = props => {
const  deletePost = id => {
    axios
      .delete(`http://localhost:9000/api/posts/${id}`, id)
      .then(response => {
        console.log(response)
      })
      .catch(error => console.log(error));
      props.history.push('/');
      window.location.reload(); 
  }
  return (
    <div className='post-container'>
      <div className='buttons'>
        <div className='button delete-button' onClick={() => (deletePost(props.post.id))}>
          <i className="fas fa-trash"/>
        </div>
        <div className='button edit-button'>
          <i className="fas fa-pen-nib"/>
        </div>
      </div>
      <h3>"{props.post.title}"</h3>
      <p>{props.post.contents}</p>
    </div>
  )
}
export default Post;
