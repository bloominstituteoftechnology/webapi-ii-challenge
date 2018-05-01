import React, { Component } from "react";
import axios from "axios";
import styles from "./PostList.css";

export default class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/posts")
      .then(response => {
        this.setState(() => ({ posts: response.data }));
      })
      .catch(error => {
        console.error("Server Error", error);
      });
  }

  render() {
    return (
      <div className="post-list">
        <h1>PostList</h1>
        {this.state.posts.map(post => (
          <div className="post" key={post.id}>
            id: {post.id}
            <br />
            title: {post.title}
            <br />
            contents: {post.contents}
          </div>
        ))}
      </div>
    );
  }
}
