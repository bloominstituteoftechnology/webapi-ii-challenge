import React, {Component} from 'react';

import axios from 'axios';
import onePost from './onePost.js';
import Post from './onePost.js';

import {
    Link,
} from "react-router-dom";

class Posts extends Component {
    render() {
	return(
            <div>
	      {this.props.posts.map(post => {
		  return (
		      <Link key={post.id} to={{pathname:`/${post.id}`, state:{post}}} >
			<Post
			  key={post.id}
			  title={post.title}
			  contents={post.content}
			  />
		      </Link>
		  );
	      })}
	    </div>
	);
    }
}

Post.defaultProps = {
    posts: []
};

export default Posts;
