import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Post extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link to={`/posts/${this.props.post.id}`}>
        <div key={this.props.post.id}>
          <div>{this.props.post.title}</div>
          <div>{this.props.post.contents}</div>
        </div>
      </Link>
    );
  }
}

export default Post;
