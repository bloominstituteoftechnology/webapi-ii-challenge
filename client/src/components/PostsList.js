import React, { Component } from "react";
import axios from "axios";
import Post from "./Post";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export default class PostsList extends Component {
  state = { posts: [] };

  componentDidMount = () => {
    axios
      .get("http://localhost:5000/api/posts")
      .then(({ data }) => this.setState({ posts: data }))
      .catch(err => console.log(err));
  };

  render() {
    if (!this.state.posts.length) {
      return <h1>Loading...</h1>;
    } else {
      const { posts } = this.state;
      return (
        <Div>
          {posts.map(post => (
            <Post
              id={post.id}
              key={post.id}
              title={post.title}
              contents={post.contents}
              created_at={post.created_at}
            />
          ))}
        </Div>
      );
    }
  }
}
