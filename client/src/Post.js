import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Post extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link to={{ pathname: `/posts/${this.props.post.id}`, state: this.props.post }}>
        <div className="flip-container">
          <div className="flipper" key={this.props.post.id}>
            <div className="front">{this.props.post.title}</div>
            <div className="back">{this.props.post.contents}</div>
          </div>
        </div>
      </Link>
    );
  }
}
// sending down each individual post as state on Link tag

export default Post;
