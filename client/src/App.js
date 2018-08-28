import React, { Component } from 'react';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import { connect } from 'react-redux';
import { fetchPosts } from './actions';
import './App.css';

class App extends Component {
  componentDidMount(){
    this.props.fetchPosts();
  }
  render() {
    return (
      <div className="App">
        <PostForm />
        <PostList />
      </div>
    );
  }
}

export default connect(null, { fetchPosts })(App);
