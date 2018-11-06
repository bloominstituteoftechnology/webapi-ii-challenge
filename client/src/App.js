import React, { Component } from 'react';
import axios from 'axios';
import PostCard from './components/PostCard/PostCard.js';
import NewPostButton from './components/NewPost/NewPostButton.js';
import NewPost from './components/NewPost/NewPost.js';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      displayModal: false
    }
  }

  componentDidMount() {
    axios.get('http://localhost:9000/api/posts')
      .then(response => {
        this.setState({
          posts: response.data
        })
      })
      .catch(err => console.log(err));
  }

  addNewPostToState = (newPost) => {
    this.setState(prevState => ({
      posts: [...prevState.posts, newPost]
    }))
  }

  resetState = () => {
    axios.get('http://localhost:9000/api/posts')
      .then(response => {
        this.setState({
          posts: response.data
        })
      })
      .catch(err => console.log(err));
  }

  deletePost = (id) => {
    axios.delete(`http://localhost:9000/api/posts/${id}`)
      .then(() => this.resetState())
      .catch(err => alert('Post not deleted'));
  }

  toggleModal = () => {
    this.setState(prevState => ({ displayModal: !prevState.displayModal }));
  }

  render() {
    return (
      <div className="App">
        <NewPostButton toggleModal={this.toggleModal} displayModal={this.state.displayModal} />
        {this.state.displayModal ? <NewPost toggleModal={this.toggleModal} addNewPostToState={this.addNewPostToState} /> : null}
        {this.state.posts.map(post => <PostCard post={post} deletePost={this.deletePost} key={post.id} />)}
      </div>
    );
  }
}

export default App;
