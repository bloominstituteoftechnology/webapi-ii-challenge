import React, { Component } from "react";

import Post from "./Post";

import styled from "styled-components";

const PostsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const PostContainer = styled.div`
  flex: 0 1 20%;
  min-width: 200px;
  height: 225px;
  background-color: #f6f5f7;
  border: 0;
  border-radius: 3px;
  box-shadow: 0 -1px 0 #e0e0e0, 0 0 2px rgba(0, 0, 0, 0.12),
    0 2px 4px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  margin: 10px;
  padding: 5px;
`;

class Posts extends Component {
  render() {
    return (
      <div>
        <h1>Notes</h1>
        <PostsContainer>
          {this.props.posts.map(post => {
            return (
              <PostContainer>
                <Post
                  title={post.title}
                  contents={post.contents}
                  created_at={post.created_at}
                  updated_at={post.update_at}
                />
              </PostContainer>
            );
          })}
        </PostsContainer>
      </div>
    );
  }
}

export default Posts;
