import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { EventEmitter } from './events';
import AddPost from './components/AddPost';
import PostList from './components/PostList';

class App extends Component {
  constructor(props) {
    super(props);
    this.url = 'http://localhost:9000/api/posts'
    this.state = {
      posts: [],
    };
    EventEmitter.subscribe('addPost', (newPost) => this.addPost(newPost));
    EventEmitter.subscribe('deletePost', (id) => this.deletePost(id));
    EventEmitter.subscribe('updatePost', (editedPost) => this.updatePost(editedPost));
  }

  componentDidMount() {
    axios
      .get(this.url)
      .then(res => {
        this.setState({posts: res.data});
      })
      .catch(err => {
        console.error('Error retrieving posts', err);
      })
  }

  addPost = newPost => {
    axios
      .post(this.url, newPost)
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.error('Error adding post', err);
      })
    }

  deletePost = id => {
    axios
      .delete(`${this.url}/${id}`)
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.error('Error deleting post', err);
      })
  }

  updatePost = editedPost => {
    axios
      .put(`${this.url}/${editedPost.id}`, editedPost)
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => {
        console.error('Error updating Post', err);
      })
  }

  render() {
    return (
      <div className="App">
        <AddPost />
        <PostList posts={this.state.posts} />
      </div>
    );
  }
}

export default App;
