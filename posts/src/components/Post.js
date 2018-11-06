import React, { Component } from "react";

import axios from "axios";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.fetchPost(id);
  }

  fetchPost = id => {
    axios
      .get(`http://localhost:9000/api/posts/${id}`)
      .then(res => this.setState({ post: res.data[0] }))
      .catch(err => console.log(err));
  };

  render() {
    if (!this.state.post) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <div>
          <h2>{this.state.post.title}</h2>
          <p> {this.state.post.contents}</p>
        </div>
        <div>
          <span>Edit</span>
          <span>Delete</span>
        </div>
      </>
    );
  }
}
