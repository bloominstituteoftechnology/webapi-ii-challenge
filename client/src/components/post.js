import React from 'react';
import '../App.css';

const Post = props => {
  return (
    <div className="posts">
      <h4>{props.title}</h4>
      <strong>{props.contents} </strong>
      <p className="created">Created at: {props.created}<br />
     Updated at: {props.updated}</p>
    <p></p>
    
    </div>
  );
};



export default Post;


