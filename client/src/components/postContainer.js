import React, { Component } from 'react'
import Post from './post';

export default class PostContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    }
  }
  
  render() {
    return (
      <div className='posts'>
        {this.props.posts.map((post) => 
          <Post className='posts' key={post.id}  post = {post} />
        )}
      </div>
    );
  }
}
