import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const PostsContainer = styled.div`
  margin: auto;
  width: 850px;
  align-items: center;
`;

const Post = styled.div`
  background-color: lightblue;
  border: 1px solid black;
  width: 850px;
  margin-top: 2%;

  h2 {
    color: black;
    align-items: center;
    padding: 2%;
  }
`;

const PostContent = styled.p`
  font-size: 1.2rem;
  color: black;
`;

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      done: false
    };
  }

  componentDidMount() {
    let url = 'http://localhost:8000/api/posts';
    axios
      .get(url)
      .then(res => {
        this.setState({ posts: res.data, done: true });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (!this.state.done) {
      return <div />;
    }
    return (
      <PostsContainer>
        {this.state.posts.map(post => {
          return (
            <Post key={post.id}>
              <h2>{post.title}</h2>
              <PostContent>{post.contents}</PostContent>
              <p>{post.create_at}</p>
            </Post>
          );
        })}
      </PostsContainer>
    );
  }
}

export default Posts;
