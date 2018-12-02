import React, { Component } from 'react';
import Post from './Post';

class Posts extends Component {
  render() {
    console.log(this.props.posts) 
    return ( 
      <>
      {this.props.posts.map(post =>{
        return <Post key={post.id} post={post}/>
      })}
      </>
    );
  }
}
 
export default Posts;