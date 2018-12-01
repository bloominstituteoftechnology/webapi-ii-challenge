import React from 'react';
//import { NavLink } from 'react-router-dom';
import '../App.css';

const Post = props => {
  return (
    <div className="posts">
      <h4>{props.title}</h4>
      <strong>{props.contents} </strong>
    <p></p>
    
    </div>
  );
};



export default Post;


