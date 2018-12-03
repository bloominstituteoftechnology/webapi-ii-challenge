import React from 'react';
import '../App.css';

const Post = props => {
  return (
    <div className="posts"><div className="post-data">
      <h4>{props.title}</h4>
      <strong>{props.contents} </strong>
      <p className="created">Created at: {props.created}<br />
     Updated at: {props.updated}</p>
    <p></p></div><div className="post-controls"><div className="close-button">X</div><button className="edit-button">Edit</button>
    <button className="delete-button">Delete</button></div>
    
    </div>
  );
};



export default Post;


