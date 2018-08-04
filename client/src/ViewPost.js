import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ViewPost extends Component {
  constructor(props) {
    super(props);
  }

  deletePost = (id) => {
    axios
      .delete(`http://localhost:8000/api/posts/${id}`)
      .then((response) => {
        console.log(response);
        this.props.updateState(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <div>{this.props.title}</div>
        <div>{this.props.contents}</div>
        <Link to="/posts" onClick={(id) => this.deletePost(id)}>
          Delete
        </Link>
      </div>
    );
  }
}

export default ViewPost;
