import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ViewPost extends Component {
  constructor(props) {
    super(props);
  }

  // this.props.posts.filter(post => post.id === id)

  render() {
    return (
      <div>
        <div>{this.props.location.state.title}</div>
        <div>{this.props.location.state.contents}</div>
        <Link to="/posts" onClick={() => this.props.deletePost(this.props.location.state.id)}>
          Delete
        </Link>
      </div>
    );
  }
}

export default ViewPost;
