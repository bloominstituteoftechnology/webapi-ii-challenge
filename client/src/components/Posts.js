import React, { Component } from "react";
import Post from "./Post";

class Posts extends Component {
  render() {
    return (
      <div>
        <h1>My Posts</h1>
        {this.props.posts.map(post => {
          return (
            <Post
              id={post.id}
              title={post.title}
              contents={post.contents}
              created_at={post.created_at}
              updated_at={post.updated_at}
            />
          );
        })}
      </div>
    );
  }
}

export default Posts;
