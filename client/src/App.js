import React, { Component } from 'react';

import axios from 'axios'
import './App.css';

import PostList from './components/PostList'
import CreateNewPost from './components/CreateNewPost'

class App extends Component {
  constructor(){
    super();
    this.state = {
      posts: [],
    }
  }

  componentDidMount(){
    axios 
    .get(`http://localhost:5000/api/posts/`)
    .then(response => {
        this.setState({ posts: response.data })
    })
    .catch(err => {
      console.log("Fail to GET Posts from local server", err)
    })
  }

  handleAddNewPost = post => {
    axios 
    .post(`http://localhost:5000/api/posts/`, post)
    .then(response => {
          axios 
          .get(`http://localhost:5000/api/posts/`)
          .then(response => {
              this.setState({ posts: response.data })
          })
          .catch(err => {
            console.log("Fail to GET Posts from local server", err)
          })
    })
    .catch(err => {
      console.log("Fail to add a post to the server", err)
    })
  }

  render() {
    console.log(this.state.posts)
    return (
      <div className="container">
        <h1>Post List</h1>
        <div className="App">
          
          <CreateNewPost handleAddNewPost={this.handleAddNewPost}/>
          <PostList posts={this.state.posts} />

          {/* {this.state.posts.map(post => {
              return (
                  <div className="card" key={post.id}>
                    <p>{post.title}</p>
                    <h2>{post.contents}</h2>
                  </div>
              )
            })} */}

        </div>
      </div>
    );
  }
}

export default App;
