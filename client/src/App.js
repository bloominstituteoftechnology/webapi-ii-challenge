import React, { Component } from 'react';
import axios from 'axios';

// import Posts from './components/Posts';

import './App.css';

class App extends Component {
  state = {posts:[], ...this.state};

  getPosts = (posts) => {
    axios
      .get("http://localhost:3000/api/posts/")
      .then(response => this.setState({ posts: response.data }))
      .catch(error => console.log(error));
  };

  componentDidMount = () => {
    this.getPosts();
  };

  getPost = (post) => {
    const id = this.state.posts.match.params.id;
    const endpoint = `http://localhost:3000/api/posts/${id}`
    axios
      .get(endpoint)
      .then(response => this.setState(() => ({ post: response.data })))
      .catch(error => console.log(error));
  };

  // addPost = event => {
  //   event.preventDefault();
  //   const endpoint = `http://localhost:3000/api/posts/`
  //   const { title, body } = this.state.posts;
  //   const post = { title, body };
  //   axios
  //     .post(endpoint, post)
  //     .then(response => this.getPosts())
  //     .catch(error => console.log(error));
  // };

  // deletePost = (id) => {
  //   const endpoint = `http://localhost:3000/api/posts/${id}`
  //   axios
  //     .delete(endpoint)
  //     .then(response => this.setState({ posts: response.data }))
  //     .catch(error => console.log(error));
  // };

  // updatePost = event => {
  //   const id = this.state.posts.match.params.id;
  //   const endpoint = `http://localhost:5000/api/posts/${id}`
  //   const { title, value } = event.target;
  //   axios
  //     .delete(endpoint)
  //     .then(response => this.setState({ posts: response.data }))
  //     .catch(error => console.log(error));
  // }

  render() {
    return (
      <div className="App">
        <div className="Posts">
          <h1>Posts</h1>
            <ul>
            {this.state.posts.map(post => {
              return (
               <div className="Post" key={post.id}>
                 <h3>{post.title}</h3>
                 <p>{post.contents}</p>
               </div>
              );
              })
            }
            </ul>
        </div>
      </div>
    );
  }
}

export default App;
