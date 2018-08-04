import React, { Component } from 'react';

class Post extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div key={this.props.post.id}>
        <div>{this.props.post.title}</div>
        <div>{this.props.post.contents}</div>
      </div>
    );
  }
}

export default Post;
