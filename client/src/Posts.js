import React, { Component } from 'react';
import axios from 'axios';

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
      <div className="posts">
        {this.state.posts.map(post => {
          return (
            <div key={post.id}>
              <h1>{post.title}</h1>
              <p>{post.contents}</p>
              <p>{post.create_at}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Posts;
