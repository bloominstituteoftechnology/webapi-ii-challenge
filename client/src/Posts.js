import React from 'react';
import './Posts.css'
import 'bootstrap/dist/css/bootstrap.css';


const BlogPosts = (props) => {
  const post = props.postings;
  return ( 
    <div className="App">
      <div className="postTitle">
      "{post.title}"
      </div>
      <div className="postContent">
      {post.contents}
      </div>
    </div>
  );
};    

export default BlogPosts;