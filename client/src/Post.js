import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Post extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link to={{ pathname: `/posts/${this.props.post.id}`, state: this.props.post }}>
        <div key={this.props.post.id}>
          <div>{this.props.post.title}</div>
          <div>{this.props.post.contents}</div>
        </div>
      </Link>
    );
  }
}
// sending down each individual post as state on Link tag

export default Post;
