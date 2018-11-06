import React, { Component } from 'react';
import axios from 'axios';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Posts from './components/Posts';
import './styles/App.css';
import Target from './components/Target';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = () => {
    axios
      .get('http://localhost:4000/api/posts')
      .then(res => this.setState({ posts: res.data }))
      .catch(err => console.log(err));
  };

  handleDrop = id => {
    console.log('drop handled', id);
    axios
      .delete(`http://localhost:4000/api/posts/${id}`)
      .then(res => this.loadPosts())
      .catch(err => console.log(err));
  };

  render() {
    const { posts } = this.state;
    return (
      <div className="App">
        <nav className="Nav">
          <h1>Lord of the Rings</h1>
          <Target />
        </nav>

        {posts.length === 0 ? (
          <h2>Loading...</h2>
        ) : (
          <Posts posts={posts} handleDrop={this.handleDrop} />
        )}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
