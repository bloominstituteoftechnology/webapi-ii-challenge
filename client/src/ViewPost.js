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
      <div className="post-container">
        <div className="post">
          <div className="title">{this.props.location.state.title}</div>
          <br />
          <div className="text">{this.props.location.state.contents}</div>
          <br />
          <div className="links">
            <Link
              className="link"
              to="/posts"
              onClick={() => this.props.deletePost(this.props.location.state.id)}
            >
              Delete
            </Link>
            <Link className="link" to="/posts">
              Back
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewPost;
