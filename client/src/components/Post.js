import React, { Component } from 'react';

class Post extends Component {
  render() { 
    const { title, contents, created_at } = this.props.post
    return ( 
      <div className='post'>
      <h1>{title}</h1>
      <p>{contents}</p>
      <h6>{created_at}</h6>
      </div>
    );
  }
}
 
export default Post ;